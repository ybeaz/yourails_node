// @ts-nocheck

import { describe, expect, it } from '@jest/globals'
import { getDateWithTime, withAssignedDate } from 'yourails_common'
import { consoler, consolerError } from 'yourails_node'
import {
  GetAudioDurationTestType,
  getAudioDuration,
  getAudioDurationTests,
} from './getAudioDuration'

/**
 * @Description Test to challenge function getAudioDuration
 * @test pnpm jest getAudioDuration.test.ts --coverage --collectCoverageFrom="src/Shared/getAudioDuration.ts"
 *    In debugging mode:
 *       node --inspect-brk getAudioDuration.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('Algoritms', () => {
  it.each(getAudioDurationTests)(
    '$description',
    async ({
      description,
      params,
      options,
      paramsWithAssignedDate,
      expected,
    }: GetAudioDurationTestType) => {
      let getWithDate = getAudioDuration
      if (paramsWithAssignedDate?.timestamp)
        getWithDate = await (await withAssignedDate(paramsWithAssignedDate))(getWithDate)

      const output: ReturnType<typeof getAudioDuration> = await (
        getWithDate as typeof getAudioDuration
      )(params, options)
      consoler('getAudioDuration.test', { description, params, output })

      expect(output).toEqual(expected)
    },
  )
})
