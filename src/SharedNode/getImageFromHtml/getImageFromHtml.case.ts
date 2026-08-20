import { join } from 'node:path'
import {
  getDateString,
  ImageSizesStandardEnum,
  POSITIONS_IN_RECTANGULAR_CSS_DICT,
  type PositionInRectangleKeysType,
  ScalingModeEnum,
  ServeSourceForReplacementEnum,
} from 'yourails_common'
import * as templatesHtml from '../../templatesHtml'
import base64Obj from './__mocks__/b2.json'
import { type GetImageFromHtmlCaseType } from './getImageFromHtml'

const dateString = getDateString({
  timestamp: new Date(),
  dash: true,
  hours: true,
  minutes: true,
  seconds: true,
  isUtcMethods: false,
})

export const getImageFromHtmlCases: GetImageFromHtmlCaseType[] = [
  {
    description: 'scene regular with image one half',
    params: {
      html: templatesHtml.templateHtml_2026_08_18_sceneRegular_9x16(),
      pathFileAbs: join(__dirname, '__output__', `t-${dateString}-image.png`),
      width: ImageSizesStandardEnum.PORTRAIT_9x16_WIDTH, // Redefined in getImageFromHtml.run.ts
      height: ImageSizesStandardEnum.PORTRAIT_9x16_HEIGHT, // Redefined in getImageFromHtml.run.ts
      scale: 1,
      scalingMode: ScalingModeEnum.deviceScaleFactor,
    },
    options: {
      configsSourceToServe: [
        {
          serveSourceAsFor: ServeSourceForReplacementEnum.serveImagePathAsImage64,
          source: join(__dirname, '__mocks__', 's_0_2026-08-16-21-46-40_image.png'),
          replacementName: '__IMAGE_BASE_64__',
        },
        {
          serveSourceAsFor: ServeSourceForReplacementEnum.serveStringAsString,
          source: `<style>.git{color:#24292f}.git-command{color:#8250df}.git-option{color:#0550ae}.git-argument{color:#0a3069}.git-comment{color:#6e7781;font-style:italic}</style>\n<span class=\"git\">\n<span class=\"git-comment\"># Clone using HTTPS</span><br>\n<span class=\"git-command\">git</span> <span class=\"git-command\">clone</span> <span class=\"git-argument\">https://github.com/user/repo.git</span><br><br>\n<span class=\"git-comment\"># Clone using SSH</span><br>\n<span class=\"git-command\">git</span> <span class=\"git-command\">clone</span> <span class=\"git-argument\">git@github.com:user/repo.git</span><br>\n</span>`,
          replacementName: '__SNIPPET_HTML__',
        },
        {
          serveSourceAsFor: ServeSourceForReplacementEnum.serveStringAsString,
          source: POSITIONS_IN_RECTANGULAR_CSS_DICT.TOP,
          replacementName: '__POSITION_IN_RECTANGLE_CSS__',
        },
      ],
      isProduction: false,
    },
    expected: { imageBase64: '' },
  },
  // {
  //   description: 'scene regular with image one half',
  //   params: {
  //     html: templatesHtml.templateHtml_2026_08_18_sceneRegular_img_txt_9x16,
  //     pathFileAbs: join(__dirname, '__output__', `t-${dateString}-image.png`),
  //     width: ImageSizesStandardEnum.PORTRAIT_9x16_WIDTH, // Redefined in getImageFromHtml.run.ts
  //     height: ImageSizesStandardEnum.PORTRAIT_9x16_HEIGHT, // Redefined in getImageFromHtml.run.ts
  //     scale: 1,
  //     scalingMode: ScalingModeEnum.deviceScaleFactor,
  //   },
  //   options: {
  //     configsSourceToServe: [
  //       {
  //         serveSourceAsFor: ServeSourceForReplacementEnum.serveImagePathAsImage64,
  //         source: join(__dirname, '__mocks__', 's_0_2026-08-16-21-46-40_image.png'),
  //         replacementName: '__IMAGE_BASE_64__',
  //       },
  //       {
  //         serveSourceAsFor: ServeSourceForReplacementEnum.serveStringAsString,
  //         source: `<style>.git{color:#24292f}.git-command{color:#8250df}.git-option{color:#0550ae}.git-argument{color:#0a3069}.git-comment{color:#6e7781;font-style:italic}</style>\n<span class=\"git\">\n<span class=\"git-comment\"># Clone using HTTPS</span><br>\n<span class=\"git-command\">git</span> <span class=\"git-command\">clone</span> <span class=\"git-argument\">https://github.com/user/repo.git</span><br><br>\n<span class=\"git-comment\"># Clone using SSH</span><br>\n<span class=\"git-command\">git</span> <span class=\"git-command\">clone</span> <span class=\"git-argument\">git@github.com:user/repo.git</span><br>\n</span>`,
  //         replacementName: '__SNIPPET_HTML__',
  //       },
  //     ],
  //     isProduction: false,
  //   },
  //   expected: { imageBase64: '' },
  // },
  // {
  //   description: 'scene first image with background and ScalingModeEnum.deviceScaleFactor',
  //   params: {
  //     html: templatesHtml.template_2026_07_01_sceneFirst_16x9,
  //     pathFileAbs: join(__dirname, '__output__', `t-${dateString}-image.png`),
  //     width: ImageSizesStandardEnum.LANDSCAPE_WIDTH,
  //     height: ImageSizesStandardEnum.LANDSCAPE_HEIGHT,
  //     scale: 2,
  //     scalingMode: ScalingModeEnum.deviceScaleFactor,
  //   },
  //   options: {
  //     configsSourceToServe: [
  //       {
  //         serveSourceAsFor: ServeSourceForReplacementEnum.serveImagePathAsImage64,
  //         source: '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
  //         replacementName: '__IMAGE_BASE_64__',
  //       },
  //       // {
  //       //   serveSourceFile: ServeSourceForReplacementEnum.serveImagePathAsImage64,
  //       //   pathFileAbs:
  //       //     '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
  //       //   replacement: '__IMAGE_FILE_NAME__',
  //       // },
  //     ],
  //     isProduction: false,
  //   },
  //   expected: { imageBase64: '' },
  // },
  // {
  //   description: 'scene last image with ScalingModeEnum.deviceScaleFactor',
  //   params: {
  //     html: templatesHtml.template_2026_07_01_sceneLast_16x9,
  //     pathFileAbs: join(__dirname, '__output__', `t-${dateString}-image.png`),
  //     width: ImageSizesStandardEnum.LANDSCAPE_WIDTH,
  //     height: ImageSizesStandardEnum.LANDSCAPE_HEIGHT,
  //     scale: 2,
  //     scalingMode: ScalingModeEnum.deviceScaleFactor,
  //   },
  //   options: {
  //     configsSourceToServe: [
  //       {
  //         serveSourceAsFor: ServeSourceForReplacementEnum.serveImagePathAsImage64,
  //         source: '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
  //         replacementName: '__IMAGE_BASE_64__',
  //       },
  //       // {
  //       //   serveSourceFile: ServeSourceForReplacementEnum.serveImagePathAsImage64,
  //       //   pathFileAbs:
  //       //     '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
  //       //   replacement: '__IMAGE_FILE_NAME__',
  //       // },
  //     ],
  //     isProduction: false,
  //   },
  //   expected: { imageBase64: '' },
  // },
  // {
  //   description: 'scene regular',
  //   params: {
  //     html: templatesHtml.template_2026_07_01_sceneRegular_16x9,
  //     pathFileAbs: join(__dirname, '__output__', `t-${dateString}-image.png`),
  //     width: ImageSizesStandardEnum.LANDSCAPE_WIDTH,
  //     height: ImageSizesStandardEnum.LANDSCAPE_HEIGHT,
  //     scale: 2,
  //     scalingMode: ScalingModeEnum.deviceScaleFactor,
  //   },
  //   options: {
  //     isProduction: false,
  //     configsSourceToServe: [
  //       {
  //         serveSourceAsFor: ServeSourceForReplacementEnum.serveImagePathAsImage64,
  //         source:
  //           '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/s_1_2026-07-13-19-53-18_imageRaw.png',
  //         replacementName: '__IMAGE_BASE_64__',
  //       },
  //       // {
  //       //   serveSourceFile: ServeSourceForReplacementEnum.serveImagePathAsImage64,
  //       //   pathFileAbs:
  //       //     '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
  //       //   replacement: '__IMAGE_FILE_NAME__',
  //       // },
  //     ],
  //   },
  //   expected: { imageBase64: '' },
  // },
]
