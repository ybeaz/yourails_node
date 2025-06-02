import { getCreatedSitemapXml, GetCreatedSitemapXmlParamsType } from 'yourails_common'
import {
  getMinifiedBundle,
  GetMinifiedBundleParamsType,
  GetMinifiedBundleOptionsType,
} from './getMinifiedBundle'
import { NodeEnvEnumType } from 'yourails_common'

type GetWrittenSiteMapParamsType = {
  baseUrl: string
  modules: any[]
  NODE_ENV: string
}

/**
 * Asynchronously generates and updates the sitemap.xml file for the given courses on a specific website.
 * @return {Promise<void>} Resolves when the sitemap.xml file is successfully updated.
 * @import import { getWrittenSiteMap } from 'src/shared/utils/getWrittenSiteMap'
 * @run ts-node src/Shared/getWrittenSiteMap.ts
 */
export const getWrittenSiteMap = ({
  baseUrl,
  modules,
  NODE_ENV,
}: GetWrittenSiteMapParamsType): void => {
  if (typeof window !== 'undefined') return

  const fs = require('fs')
  const { join } = require('path')

  const locRootUrl = `${baseUrl}/`
  const lastmodRootUrl = new Date().toISOString()
  const languageRootUrl = 'en'

  const getCreatedSitemapXmlParams: GetCreatedSitemapXmlParamsType = {
    baseUrl,
    entitiesDicts: [{ entities: modules, prefix: 'm', nameID: 'moduleID' }],
    urlMapInit: [
      {
        loc: locRootUrl,
        lastmod: lastmodRootUrl,
        'xhtml:link': {
          _attributes: {
            rel: 'alternate',
            href: locRootUrl,
            hreflang: languageRootUrl,
          },
        },
      },
    ],
  }

  const siteMapXmlString = getCreatedSitemapXml(getCreatedSitemapXmlParams)

  const upStreamLevel = NODE_ENV === NodeEnvEnumType['development'] ? '../../..' : '../../../..'
  const path = join(__dirname, upStreamLevel, 'assets/general')
  const fileName = '/sitemap.xml'
  const filePath = `${path}${fileName}`
  fs.writeFileSync(filePath, siteMapXmlString)

  const getMinifiedBundleParams: GetMinifiedBundleParamsType = {
    inputFileIn: filePath,
    outputFileIn: filePath,
  }
  const getMinifiedBundleOptions: GetMinifiedBundleOptionsType = {
    isUglifying: false,
    isWritingNotMinified: false,
  }

  getMinifiedBundle(getMinifiedBundleParams, getMinifiedBundleOptions)

  return
}

/**
 * @description Here the file is being run directly
 * @run ts-node src/Shared/getWrittenSiteMap.ts
 */
// if (require.main === module) {
//   ;(async () => {
//     const baseUrl = 'http://127.0.0.1:3000' // 'https://yourails.com'

//     const modules = require(
//       join(
//         __dirname,
//         '../../..',
//         'cdKYourailsAcademy/libraryDocuments/2024-02-28-05-53-47-modules-d-l-n147.json'
//       )
//     )

//     await getWrittenSiteMap({ baseUrl, modules })
//   })()
// }
