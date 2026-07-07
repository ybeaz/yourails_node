import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../consoler'
import { getDeletedFile } from '../getDeletedFile'
import {
  type GetValidatedEntityLinksFilesReadableCaseType,
  getValidatedEntityLinksFilesReadable,
} from './getValidatedEntityLinksFilesReadable'
import { getValidatedEntityLinksFilesReadableCases } from './getValidatedEntityLinksFilesReadable.case'

const getWrittenFileDeep = async (pathFileAbs: string, content: string = ''): Promise<void> => {
  await mkdir(dirname(pathFileAbs), { recursive: true })
  await writeFile(pathFileAbs, content, 'utf-8')
}

/**
 * @Description Test to challenge function getValidatedEntityLinksFilesReadable
 * @test pnpm jest getValidatedEntityLinksFilesReadable.test.ts --coverage --collectCoverageFrom="src/SharedNode/getValidatedEntityLinksFilesReadable/getValidatedEntityLinksFilesReadable.ts"
 */
describe('getValidatedEntityLinksFilesReadable', () => {
  it.each(getValidatedEntityLinksFilesReadableCases)('$description', async ({
    description,
    mockReadablePaths,
    params,
    options,
    paramsWithAssignedDate,
    expected,
  }: GetValidatedEntityLinksFilesReadableCaseType) => {
    let getWithDate = getValidatedEntityLinksFilesReadable
    if (paramsWithAssignedDate?.timestamp)
      getWithDate = withAssignedDate(paramsWithAssignedDate)(getWithDate)

    for await (const mockReadablePath of mockReadablePaths) {
      // await getDeletedFile(mockReadablePath)
      await getWrittenFileDeep(join(__dirname, '__mocks__', mockReadablePath))
    }

    const output: ReturnType<typeof getValidatedEntityLinksFilesReadable> = await (
      getWithDate as typeof getValidatedEntityLinksFilesReadable
    )(params, options)
    consoler('getValidatedEntityLinksFilesReadable.test', {
      description,
      mockReadablePaths,
      // params,
      output,
      expected,
    })

    expect(output).toEqual(expected)
  })
})
