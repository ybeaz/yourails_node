import { consoler } from '../../SharedNode/consoler'

import {
  GetMinifiedBundleOptionsType,
  GetMinifiedBundleParamsType,
  GetMinifiedBundleResType,
  GetMinifiedBundleType,
  getMinifiedBundle,
} from '../getMinifiedBundle'

type GetMinifiedBundleTestType = {
  params: GetMinifiedBundleParamsType
  options: GetMinifiedBundleOptionsType
  expected: GetMinifiedBundleResType
}

const tests: GetMinifiedBundleTestType[] = [
  {
    params: {
      inputFileIn: '/Users/admin/Dev/yourails_common/src/SharedNode/__mocks__/sitemap.xml',
      outputFileIn: '/Users/admin/Dev/yourails_common/src/SharedNode/__mocks__/sitemap.xml.gz',
    },
    options: {
      isUglifying: false,
      isWritingNotMinified: false,
    },
    expected: '/Users/admin/Dev/yourails_common/src/SharedNode/__mocks__/sitemap.xml.gz',
  },
]

/**
 * @Description Test to challenge function getMinifiedBundle
 * @test yarn jest getMinifiedBundle.test.ts
 *    In debugging mode:
 *       node --inspect-brk getMinifiedBundle.test.ts
 *       chrome://inspect/#devices > Open dedicated DevTools for Node
 */
describe('Algoritms', () => {
  it.each(tests)('-- getMinifiedBundle.test', ({ params, options, expected }) => {
    const output: string | undefined = getMinifiedBundle(params, options) as string
    consoler('getMinifiedBundle.test', { output })

    // expect(output).toEqual(expected)
  })
})
