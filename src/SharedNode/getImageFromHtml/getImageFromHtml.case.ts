import { ImageSizesStandardEnum, ScalingModeEnum } from 'yourails_common'
import base64Obj from './__mocks__/b2.json'
import { type GetImageFromHtmlCaseType } from './getImageFromHtml'

export const getImageFromHtmlCases: GetImageFromHtmlCaseType[] = [
  {
    description: 'scene first image with background and ScalingModeEnum.deviceScaleFactor',
    params: {
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Slide</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <div class="logo-group">
          <img
            src="http://localhost:3000/images/youRailsLogos/2026-05-22_logos/yourails_05_cycle.svg"
            alt="YouRails logo"
          />
        </div>
        <div class='wrapper'>
          <div class="text-group">
            <div class="h1">__TITLE_MAIN_FORMATTED__</div>
            __DIV_SUBTITLE_MAIN__
          </div>
        </div>
      </body>
      </html>
      `,
      style: `<style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          height: 100%;
          width: 100%;
        }
        .logo-group {
          position: absolute;
          top: 48px;
          left: 48px;
          z-index: 2;
        }
        .logo-group img {
          width: 120px;
          height: auto;
          display: block;
        }
        .wrapper {
          position: relative;
          width: 100%;  // calc(__WRAPPER_WIDTH__px + 4px);
          height: 100%; // calc(__WRAPPER_HEIGHT__px + 4px);
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Roboto", Arial, sans-serif;
          padding-bottom: 4rem;
        }
        .wrapper::before {
          background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
          /* background-image: url('http://local-assets/__IMAGE_FILE_NAME__'); */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
          content: "";
          position: absolute;
          inset: 0;
          /* filter: blur(30px); */
          transform: scale(1.1);
          opacity: 0.85; /* 0 = transparent, 1 = opaque */
          z-index: 1;
        }
        .text-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          z-index: 2;
        }
        .text-group > :only-child {
          margin-top: auto;
          margin-bottom: auto;
        }
        .wrapper .h1 {
          display: flex;
          text-align: center;
          font-size: 72px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -0.03em;
          word-break: break-word;
          padding: 2rem;
          border-radius: 5rem;
          color: #0b1220;
          background-color: rgba(255, 255, 255, 0.85);
          max-width: calc(100vw * 1 / 2);
        }
        .wrapper .h2 {
          text-align: center;
          font-size: 48px;
          font-weight: 500;
          opacity: 0.7;
          line-height: 1.25;
          word-break: break-word;
          padding: 2rem;
          border-radius: 5rem;
          // color: #667085;
          color: #0b1220;
          background-color: rgba(255, 255, 255, 1);
          max-width: calc(100vw * 2 / 3);
        }
        .wrapper .h1:empty,
        .wrapper .h2:empty {
          display: none;
        }
      </style>`,
      pathFileAbs: '',
      width: ImageSizesStandardEnum.LANDSCAPE_WIDTH,
      height: ImageSizesStandardEnum.LANDSCAPE_HEIGHT,
      scale: 2,
      scalingMode: ScalingModeEnum.deviceScaleFactor,
    },
    options: {
      isProduction: false,
    },
    expected: { imageBase64: '' },
  },
  // {
  //   description: 'scene last image with ScalingModeEnum.deviceScaleFactor',
  //   params: {
  //     html: `<!DOCTYPE html>
  //       <html lang="en">
  //       <head>
  //         <meta charset="UTF-8" />
  //         <title>Slide</title>
  //         <link rel="stylesheet" href="styles.css" />
  //       </head>
  //       <body>
  //         <div class="wrapper">
  //           <div class="text top">Thank you</div>

  //           <div class="text center">
  //             <div>+1 415 650 9893</div>
  //             <div>Telegram: @rome_sfba</div>
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
  //     style: `<style>/* Reset for deterministic rendering */
  //       * {
  //         margin: 0;
  //         padding: 0;
  //         box-sizing: border-box;
  //       }

  //       html, body {
  //         margin: 0;
  //         padding: 0;
  //         overflow: hidden;
  //         background: #ffffff;
  //         color: #0b1220;
  //         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  //         -webkit-font-smoothing: antialiased;
  //         text-rendering: optimizeLegibility;
  //       }

  //       /* Fixed canvas for Playwright screenshot */
  //       .wrapper {
  //         position: relative;
  //         width: __WRAPPER_WIDTH__px;
  //         height: calc(__WRAPPER_HEIGHT__px + 4px);
  //         overflow: hidden;
  //       }
  //       .wrapper::before {
  //         background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
  //         /* background-image: url('http://local-assets/__IMAGE_FILE_NAME__'); */
  //         background-size: cover;
  //         background-position: center;
  //         background-repeat: no-repeat;
  //         overflow: hidden;
  //         content: "";
  //         position: absolute;
  //         inset: 0;
  //         /* filter: blur(30px); */
  //         transform: scale(1.1);
  //         opacity: 0.75; /* 0 = transparent, 1 = opaque */
  //         z-index: 1;
  //       }
  //       /* Shared text styles */
  //       .text {
  //         position: absolute;
  //         left: 50%;
  //         transform: translateX(-50%);
  //         text-align: center;
  //         letter-spacing: 0.02em;
  //         color: #0b1220;
  //         z-index: 3;
  //       }

  //       /* Top */
  //       .top {
  //         top: 100px;
  //         font-size: 64px;
  //         font-weight: 600;
  //         padding: 2rem 4rem;
  //         border-radius: 5rem;
  //         background-color: rgba(255, 255, 255, 0.75);
  //       }

  //       /* Center block (stacked lines) */
  //       .center {
  //         top: 50%;
  //         transform: translate(-50%, -50%);
  //         font-size: 48px;
  //         line-height: 1.4;
  //         font-weight: 500;
  //         padding: 2rem 4rem;
  //         border-radius: 5rem;
  //         background-color: rgba(255, 255, 255, 0.75);
  //       }

  //       /* Bottom */
  //       .bottom {
  //         bottom: 60px;
  //         font-size: 28px;
  //         opacity: 0.7;
  //         display: flex;
  //         gap: 1rem;
  //         padding: 1rem 2rem;
  //         background-color: rgba(255, 255, 255, 0.75);
  //         border-radius: 3rem;
  //       }
  //       .bottom img {
  //         width: 32px;
  //         height: auto;
  //         opacity: 1;
  //         display: inline-block;
  //       }

  //     </style>`,
  //     pathFileAbs: '',
  //     width: ImageSizesStandardEnum.LANDSCAPE_WIDTH,
  //     height: ImageSizesStandardEnum.LANDSCAPE_HEIGHT,
  //     scale: 2,
  //     scalingMode: ScalingModeEnum.deviceScaleFactor,
  //   },
  //   options: {
  //     isProduction: false,
  //   },
  //   expected: { imageBase64: '' },
  // },
]
