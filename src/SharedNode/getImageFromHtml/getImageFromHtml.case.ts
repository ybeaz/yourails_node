import { join } from 'node:path'
import {
  getDateString,
  ImageSizesStandardEnum,
  ScalingModeEnum,
  ServeSourceForReplacementEnum,
} from 'yourails_common'
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
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Slide</title>
          <link rel="stylesheet" href="styles.css" />
          <style>/* Reset for deterministic rendering */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              height: 100%;
              width: 100%;
            }
            html, body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              background: #ffffff;
              color: #0b1220;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              -webkit-font-smoothing: antialiased;
              text-rendering: optimizeLegibility;
            }
            /* Fixed canvas for Playwright screenshot */
            .wrapper {
              position: relative;
              width: 100%;
              height: 50%;
              overflow: hidden;
              display: flex;
            }
            .wrapper::before {
              background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
              /* background-image: url('http://local-assets/__IMAGE_FILE_NAME__'); */
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              background-size: 100% 100%;   /* stretch to fill exactly, no cropping */
              overflow: hidden;
              content: "";
              position: absolute;
              inset: 0;
              z-index: 1;
            }
          </style>
          <style>
 
          </style>
        </head>
        <body>
          <div class='wrapper'></div>
          <div class='overlay'>__SNIPPET_HTML__</div>
        </body>
        <script>
          const el = document.querySelector('div.overlay > *:not(style):not(script)') 
            || document.querySelector('div.overlay span')
            || document.querySelector('div.overlay');
          console.log('getImageFromHtml.case [80]', {el, scrollWidth: el?.scrollWidth, scrollHeight: el?.scrollHeight});
          const maxWidth = 768 - 80; const maxHeight = 512 - 80; let size = 22; el.style.fontSize = size + 'px'; while (size <= 36) {
          const nextSize = size + 0.5; el.style.fontSize = nextSize + 'px'; if (el.scrollWidth > maxWidth || el.scrollHeight > maxHeight) { el.style.fontSize = size + 'px'; break; } size = nextSize;
        }
        </script>
      </html>
      `,
      pathFileAbs: join(__dirname, '__output__', `t-${dateString}-image.png`),
      width: ImageSizesStandardEnum.PORTRAIT_9x16_WIDTH_L, // Redefined in getImageFromHtml.run.ts
      height: ImageSizesStandardEnum.PORTRAIT_9x16_HEIGHT_L, // Redefined in getImageFromHtml.run.ts
      scale: 2,
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
      ],
      isProduction: false,
    },
    expected: { imageBase64: '' },
  },
  // {
  //   description: 'scene first image with background and ScalingModeEnum.deviceScaleFactor',
  //   params: {
  //     html: `<!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <meta charset="UTF-8" />
  //         <title>Slide</title>
  //         <link rel="stylesheet" href="styles.css" />
  //         <style>/* Reset for deterministic rendering */
  //           * {
  //             margin: 0;
  //             padding: 0;
  //             box-sizing: border-box;
  //           }
  //           html, body {
  //             height: 100%;
  //             width: 100%;
  //           }
  //           html, body {
  //             margin: 0;
  //             padding: 0;
  //             overflow: hidden;
  //             background: #ffffff;
  //             color: #0b1220;
  //             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  //             -webkit-font-smoothing: antialiased;
  //             text-rendering: optimizeLegibility;
  //           }
  //           /* Fixed canvas for Playwright screenshot */
  //           .wrapper {
  //             position: relative;
  //             width: 100%;
  //             height: 100%;
  //             overflow: hidden;
  //             display: flex;
  //           }
  //           .wrapper::before {
  //             background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
  //             /* background-image: url('http://local-assets/__IMAGE_FILE_NAME__'); */
  //             background-size: cover;
  //             background-position: center;
  //             background-repeat: no-repeat;
  //             background-size: 100% 100%;   /* stretch to fill exactly, no cropping */
  //             overflow: hidden;
  //             content: "";
  //             position: absolute;
  //             inset: 0;
  //             z-index: 1;
  //           }
  //         </style>
  //         <style>
  //           .logo-group {
  //             position: absolute;
  //             top: 48px;
  //             left: 48px;
  //             z-index: 2;
  //           }
  //           .logo-group img {
  //             width: 120px;
  //             height: auto;
  //             display: block;
  //           }
  //           .wrapper {
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             flex-direction: column;
  //             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Roboto", Arial, sans-serif;
  //           }
  //           .text-group {
  //             display: flex;
  //             flex-direction: column;
  //             align-items: center;
  //             width: 100%;
  //             z-index: 2;
  //           }
  //           .text-group > :only-child {
  //             margin-top: auto;
  //             margin-bottom: auto;
  //           }
  //           .wrapper .h1 {
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             text-align: center;
  //             font-size: 72px;
  //             font-weight: 600;
  //             line-height: 1.25;
  //             letter-spacing: -0.03em;
  //             word-break: break-word;
  //             padding: 2rem;
  //             border-radius: 5rem;
  //             color: #0b1220;
  //             background-color: rgba(255, 255, 255, 0.85);
  //             max-width: calc(100vw * 1 / 2);
  //             overflow: auto;
  //             resize: both;
  //           }
  //           .wrapper .h2 {
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             text-align: center;
  //             font-size: 48px;
  //             font-weight: 500;
  //             opacity: 0.7;
  //             line-height: 1.25;
  //             word-break: break-word;
  //             padding: 2rem;
  //             border-radius: 5rem;
  //             // color: #667085;
  //             color: #0b1220;
  //             background-color: rgba(255, 255, 255, 1);
  //             max-width: calc(100vw * 2 / 3);
  //             overflow: auto;
  //             resize: both;
  //           }
  //           .wrapper .h1:empty,
  //           .wrapper .h2:empty {
  //             display: none;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="logo-group">
  //           <img
  //             src="http://localhost:3000/images/youRailsLogos/2026-05-22_logos/yourails_05_cycle.svg"
  //             alt="YouRails logo"
  //           />
  //         </div>
  //         <div class='wrapper'>
  //           <div class="text-group">
  //             <div class="h1">__TITLE_MAIN_FORMATTED__</div>
  //             __DIV_SUBTITLE_MAIN__
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //     `,
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
  //         source:
  //           '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
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
  //     html: `<!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <meta charset="UTF-8" />
  //         <title>Slide</title>
  //         <link rel="stylesheet" href="styles.css" />
  //         <style>/* Reset for deterministic rendering */
  //           * {
  //             margin: 0;
  //             padding: 0;
  //             box-sizing: border-box;
  //           }
  //           html, body {
  //             height: 100%;
  //             width: 100%;
  //           }
  //           html, body {
  //             margin: 0;
  //             padding: 0;
  //             overflow: hidden;
  //             background: #ffffff;
  //             color: #0b1220;
  //             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  //             -webkit-font-smoothing: antialiased;
  //             text-rendering: optimizeLegibility;
  //           }
  //           /* Fixed canvas for Playwright screenshot */
  //           .wrapper {
  //             position: relative;
  //             width: 100%;
  //             height: 100%;
  //             overflow: hidden;
  //             display: flex;
  //           }
  //           .wrapper::before {
  //             background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
  //             /* background-image: url('http://local-assets/__IMAGE_FILE_NAME__'); */
  //             background-size: cover;
  //             background-position: center;
  //             background-repeat: no-repeat;
  //             background-size: 100% 100%;   /* stretch to fill exactly, no cropping */
  //             overflow: hidden;
  //             content: "";
  //             position: absolute;
  //             inset: 0;
  //             z-index: 1;
  //           }
  //         </style>
  //         <style>
  //           .wrapper::before {
  //             /* filter: blur(30px); */
  //             opacity: 0.75; /* 0 = transparent, 1 = opaque */
  //           }
  //           /* Shared text styles */
  //           .text {
  //             position: absolute;
  //             left: 50%;
  //             transform: translateX(-50%);
  //             text-align: center;
  //             letter-spacing: 0.02em;
  //             color: #0b1220;
  //             z-index: 3;
  //           }
  //           /* Top
  //           .top {
  //             top: 100px;
  //             font-size: 64px;
  //             font-weight: 600;
  //             padding: 2rem 4rem;
  //             border-radius: 5rem;
  //             background-color: rgba(255, 255, 255, 0.75);
  //           } */
  //           /* Center block (stacked lines) */
  //           .center {
  //             top: 46%;
  //             transform: translate(-50%, -50%);
  //             font-size: 64px;
  //             line-height: 1.4;
  //             font-weight: 500;
  //             padding: 2rem 4rem;
  //             border-radius: 5rem;
  //             background-color: rgba(255, 255, 255, 0.75);
  //           }
  //           /* Bottom */
  //           .bottom {
  //             bottom: 60px;
  //             font-size: 28px;
  //             opacity: 0.7;
  //             display: flex;
  //             gap: 1rem;
  //             padding: 1rem 2rem;
  //             background-color: rgba(255, 255, 255, 0.75);
  //             border-radius: 3rem;
  //           }
  //           .bottom img {
  //             width: 32px;
  //             height: auto;
  //             opacity: 1;
  //             display: inline-block;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="wrapper">
  //           <!-- <div class="text top">Thank you</div> -->
  //           <div class="text center">
  //             <div>Thank you</div>
  //           </div>
  //           <div class="text bottom">
  //             <img
  //               src="http://localhost:3000/images/youRailsLogos/2026-05-22_logos/yourails_05_cycle.svg"
  //               alt="YouRails logo"
  //             />
  //             <span>Studio YouRails.com &nbsp;&nbsp; © 2026</span>
  //           </div>
  //         </div>
  //       </body>
  //     </html>`,
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
  //         source:
  //           '/Users/admin/Dev/yourails_node/src/SharedNode/getImageFromHtml/__mocks__/a1.png',
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
  //     html: `<!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <meta charset="UTF-8" />
  //         <title>Slide</title>
  //         <link rel="stylesheet" href="styles.css" />
  //         <style>/* Reset for deterministic rendering */
  //           * {
  //             margin: 0;
  //             padding: 0;
  //             box-sizing: border-box;
  //           }
  //           html, body {
  //             height: 100%;
  //             width: 100%;
  //           }
  //           html, body {
  //             margin: 0;
  //             padding: 0;
  //             overflow: hidden;
  //             background: #ffffff;
  //             color: #0b1220;
  //             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  //             -webkit-font-smoothing: antialiased;
  //             text-rendering: optimizeLegibility;
  //           }
  //           /* Fixed canvas for Playwright screenshot */
  //           .wrapper {
  //             position: relative;
  //             width: 100%;
  //             height: 100%;
  //             overflow: hidden;
  //             display: flex;
  //           }
  //           .wrapper::before {
  //             background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
  //             /* background-image: url('http://local-assets/__IMAGE_FILE_NAME__'); */
  //             background-size: cover;
  //             background-position: center;
  //             background-repeat: no-repeat;
  //             background-size: 100% 100%;   /* stretch to fill exactly, no cropping */
  //             overflow: hidden;
  //             content: "";
  //             position: absolute;
  //             inset: 0;
  //             z-index: 1;
  //           }
  //         </style>
  //         <style>
  //           .overlay {
  //             __POSITION_IN_RECTANGLE_CSS__
  //             position: absolute;
  //             width: calc(768px - 40px);
  //             height: calc(512px - 40px);
  //             border-radius: 10px;
  //             z-index: 10;
  //             -webkit-text-size-adjust: 100%;
  //             font-family: Consolas, Menlo, "courier new", monospace;
  //             color: black;
  //             display: flex;
  //             align-items: center;
  //             justify-content: center;
  //             overflow: auto;
  //             resize: both;
  //             background-color: rgb(240 246 242);
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class='wrapper'>
  //           <div class="overlay">__SNIPPET_HTML__</div>
  //         </div>
  //       </body>
  //       <script> const el = document.querySelector('div.overlay *'); const maxWidth = 768 - 80; const maxHeight = 512 - 80; let size = 22; el.style.fontSize = size + 'px'; while (size <= 36) {
  //         const nextSize = size + 0.5; el.style.fontSize = nextSize + 'px'; if (el.scrollWidth > maxWidth || el.scrollHeight > maxHeight) { el.style.fontSize = size + 'px'; break; } size = nextSize;
  //       }
  //       </script>
  //     </html>
  //     `,
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
