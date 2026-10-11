import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from '@jest/globals'
import { withAssignedDate } from 'yourails_common'
import { consoler } from '../../sharedNode/consoler'
import { type GetUpdatedEnvFileCaseType, getUpdatedEnvFile } from './getUpdatedEnvFile'
import { getUpdatedEnvFileCases } from './getUpdatedEnvFile.case'

/**
 * @Description Test to challenge function getUpdatedEnvFile
 * @test pnpm jest getUpdatedEnvFile.test.ts --coverage --collectCoverageFrom="src/sharedNode/getUpdatedEnvFile/getUpdatedEnvFile.ts"
 */
describe('getUpdatedEnvFile', () => {
  let dir: string
  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'env-'))
  })
  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true })
  })

  it.each(getUpdatedEnvFileCases)(
    '$index: $description',
    async (caseCurrent: GetUpdatedEnvFileCaseType) => {
      const pathFileAbs = path.join(dir, '.env')
      if (caseCurrent.fileContent !== null) await fs.writeFile(pathFileAbs, caseCurrent.fileContent)

      const run = () =>
        getUpdatedEnvFile({ pathFileAbs, ...caseCurrent.params }, caseCurrent.options)

      if (caseCurrent.expectedError) {
        await expect(run()).rejects.toThrow(caseCurrent.expectedError)
        if (caseCurrent.fileContent !== null)
          expect(await fs.readFile(pathFileAbs, 'utf8')).toBe(caseCurrent.fileContent)
        return
      }

      expect(await run()).toEqual(caseCurrent.expected)
      if (caseCurrent.expectedFileContent !== undefined) {
        expect(await fs.readFile(pathFileAbs, 'utf8')).toBe(caseCurrent.expectedFileContent)
      }
      expect(await fs.readdir(dir)).toEqual(['.env']) // no leftover .tmp
    },
  )

  it('removes the temp file and rethrows when rename fails', async () => {
    const pathFileAbs = path.join(dir, '.env')
    await fs.writeFile(pathFileAbs, 'A=1\n')

    const spy = jest.spyOn(fs, 'rename').mockRejectedValueOnce(new Error('EXDEV'))

    await expect(getUpdatedEnvFile({ pathFileAbs, updates: { A: '2' } })).rejects.toThrow('EXDEV')

    spy.mockRestore()
    expect(await fs.readdir(dir)).toEqual(['.env']) // no leftover .tmp
    expect(await fs.readFile(pathFileAbs, 'utf8')).toBe('A=1\n') // original untouched
  })
})
