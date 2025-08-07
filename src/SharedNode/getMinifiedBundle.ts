import {
  withTryCatchFinallyWrapper,
  FuncModeEnumType,
  WithTryCatchFinallyWrapperOptionsType,
} from 'yourails_common'
import { consoler } from './consoler'

type GetMinifiedBundleParamsType = {
  inputFileIn: string
  outputFileIn: string
}

type GetMinifiedBundleOptionsType = {
  isUglifying?: boolean
  isWritingNotMinified?: boolean
  funcParent?: string
}

type GetMinifiedBundleResType = string | undefined

interface GetMinifiedBundleType {
  (
    params: GetMinifiedBundleParamsType,
    options?: GetMinifiedBundleOptionsType
  ): GetMinifiedBundleResType
}

const optionsDefault: Required<GetMinifiedBundleOptionsType> = {
  isUglifying: true,
  isWritingNotMinified: true,
  funcParent: 'getMinifiedBundle',
}

const resDefault: GetMinifiedBundleResType = undefined

/**
 * @description Function to minify and write a file
 * @import import { getMinifiedBundle } from './getMinifiedBundle'
 */
const getMinifiedBundleUnsafe: GetMinifiedBundleType = (
  { inputFileIn, outputFileIn }: GetMinifiedBundleParamsType,
  optionsIn?: GetMinifiedBundleOptionsType
) => {
  if (typeof window !== 'undefined') return

  const options = { ...optionsDefault, ...optionsIn }
  const { isUglifying, isWritingNotMinified } = options

  const fs = require('fs')
  const zlib = require('node:zlib')
  const uglify = require('uglify-js')

  let output = fs.readFileSync(inputFileIn, 'utf8')

  if (isUglifying) output = uglify.minify(output)

  if (typeof output !== 'string' && output?.code) output = output.code

  if (isWritingNotMinified) fs.writeFileSync(outputFileIn, output)

  zlib.gzip(output, (error: any, buffer: any) => {
    if (error) {
      console.error(error)
    } else {
      fs.writeFileSync(`${outputFileIn}.gz`, buffer)
    }
  })
  return outputFileIn
}

const getMinifiedBundle = withTryCatchFinallyWrapper(getMinifiedBundleUnsafe, {
  optionsDefault,
  resDefault,
  funcMode: FuncModeEnumType.common,
  isFinally: false,
})

export { getMinifiedBundle }
export type {
  GetMinifiedBundleParamsType,
  GetMinifiedBundleOptionsType,
  GetMinifiedBundleResType,
  GetMinifiedBundleType,
}
