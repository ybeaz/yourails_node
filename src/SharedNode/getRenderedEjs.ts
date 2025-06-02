import { consoler } from './consoler'
import { consolerError } from './consolerError'
import { getWritrenFileAsync } from './getWritrenFileAsync'
import { getArrayItemByProp } from 'yourails_common'
import { OrganizationType } from 'yourails_common'
// import { organizations } from './organizationsMock'

// import {
//   createModulePageMethod,
//   CreateModulePageMethodParamsType,
// } from './createModulePageMethod'
// import { CDN_SRC_URL_BASE } from './constants/cdnSrcUrlBaseConst'

export type GetRenderedEjsParamsType = any

export type GetRenderedEjsOptionsType = {
  fileView?: string
  parentFunction?: string
}

export type GetRenderedEjsResType = any

interface GetRenderedEjsType {
  (params: GetRenderedEjsParamsType, options?: GetRenderedEjsOptionsType): GetRenderedEjsResType
}

const optionsDefault: Required<GetRenderedEjsOptionsType> = {
  fileView: 'rootView.ejs',
  parentFunction: 'not specified',
}

/**
 * @description Function to getRenderedEjs
 * @link Validate https://search.google.com/test/rich-results
 * @link Validate https://validator.schema.org/
 * @link Validate http://linter.structured-data.org/
 * @link JSON-LD 1.1 https://www.w3.org/TR/json-ld/
 * @link Schema:Article https://schema.org/Article
 * @link Schema.org CreativeWork https://schema.org/CreativeWork
 * @link Microdata https://html.spec.whatwg.org/multipage/microdata.html
 * @link Microformats https://microformats.org/wiki/Main_Page
 * @run ts-node tools/getRenderedEjs.ts
 *    In debugging mode:
 *       node --inspect-brk -r ts-node/register tools/getRenderedEjs.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 * @import import { getRenderedEjs, GetRenderedEjsParamsType } from 'yourails_common'
 */
export const getRenderedEjs: GetRenderedEjsType = async (
  params: GetRenderedEjsParamsType,
  optionsIn: GetRenderedEjsOptionsType = optionsDefault
) => {
  if (typeof window !== 'undefined') return

  const { join } = require('path')
  const ejs = await import('ejs')

  const options: Required<GetRenderedEjsOptionsType> = {
    ...optionsDefault,
    ...optionsIn,
  }

  const { fileView, parentFunction } = options

  let output: GetRenderedEjsResType

  try {
    const pathToTemplate = join(__dirname, '..', `src/views/${fileView}`)
    output = await ejs.renderFile(pathToTemplate, params)

    const pathToHtmlOutput = join(__dirname, '..', 'src/views/__output__/', 'index.html')
    await getWritrenFileAsync(pathToHtmlOutput, output)
  } catch (error: any) {
    output = 'Error'
    consolerError('getRenderedEjs', { parentFunction })
    consolerError('getRenderedEjs', error)
  } finally {
    return output
  }
}

type GetRunRenderedEjsAsyncType = {
  organizations: OrganizationType[]
  createModulePageMethod: any
  CDN_SRC_URL_BASE: string
}

/**
 * @description Here the file is being run directly
 * @run ts-node tools/getRenderedEjs.ts
 */

/*
if (require.main === module) {
  ;(async ({
    organizations,
    createModulePageMethod,
    CDN_SRC_URL_BASE,
  }: GetRunRenderedEjsAsyncType) => {
    const profiles = require('../cdKYourailsAcademy/libraryDocuments/2024-02-17-00-00-00-profilesNext.json')
    const objections = require('../src/views/__mock__/objections.json')
    const modules = require('../cdKYourailsAcademy/libraryDocuments/2024-02-28-05-53-47-modules-d-l-n147.json')

    let modulesNext = modules
      .slice()
      .reverse()
      .filter((item: any, index: number) => item.moduleID === 'Up88BYsRRvw') // item.moduleID === 'Up88BYsRRvw'

    const organization = getArrayItemByProp({
      arr: organizations,
      propName: 'organizationID',
      propValue: '1___oooOOOooo000',
    })

    const createModulePageMethodParams: any = {
      module: modulesNext[0],
      creator: profiles[0],
      organization: organization,
      cdnSrcUrlBase: CDN_SRC_URL_BASE,
    }

    const params = await createModulePageMethod(createModulePageMethodParams)

    const output = await getRenderedEjs(params, { fileView: 'moduleView.ejs' })
    // consoler('getRenderedEjs [100]', {  })
  })({} as GetRunRenderedEjsAsyncType)
}


if (require.main === module) {
  ;(async () => {
    const cdnSrcUrlBase = 'https://cdn.jsdelivr.net/npm/yourails-assets-sep-academy-web@0.71.0'

    const profiles = require('../cdKYourailsAcademy/libraryDocuments/2024-02-17-00-00-00-profilesNext.json')
    const objections = require('../src/views/__mock__/objections.json')
    const modules = require('../cdKYourailsAcademy/libraryDocuments/2024-02-03-21-20-26-modules-d-l-n139.json')

    let modulesNext = modules
      .slice()
      .reverse()
      .filter((item: any, index: number) => index < 10)

    const organization = getArrayItemByProp({
      arr: organizations,
      propName: 'organizationID',
      propValue: '1___oooOOOooo000',
    })

    const params = await createRootPageMethod({ modules: modulesNext, organization, cdnSrcUrlBase })

    const output = await getRenderedEjs(params, { fileView: 'rootView.ejs' })
    // consoler('getRenderedEjs [100]', {  })
  })()
}

*/
