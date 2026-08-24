import { scriptToDrugTextSection } from './shared/scriptToDrugTextSection'
import { scriptToResizeTextFontSize } from './shared/scriptToResizeTextFontSize'

export const templateHtml_2026_07_01_sceneRegular_16x9 = `<!DOCTYPE html>
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
              height: 100%;
              overflow: hidden;
              display: flex;
              background-image: url('data:image/png;base64,__IMAGE_BASE_64__');
              /* background-image: url('http://local-assets/__IMAGE_FILE_NAME__'); */
              background-size: 100% 100%;   /* stretch to fill exactly, no cropping */
              background-position: center;
              background-repeat: no-repeat;
            }
          </style>
          <style>
            .text-section {
              __POSITION_IN_RECTANGLE_CSS__
              background-color: __BACKGROUND_COLOR__;
              position: absolute;
              width: calc(768px - 40px);
              height: calc(512px + 150px - 40px);
              overflow: visible;
              flex-shrink: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            /* Handles are positioned relative to .overlay, since that's what they resize */
            .text-section .resize-handle-corner {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 16px;
              height: 16px;
              cursor: nwse-resize;
              z-index: 20;
            }
            .text-section .resize-handle-corner:hover {
              background: rgba(0,0,0,0.15);
            }

            .text-section .resize-handle-left,
            .text-section .resize-handle-right {
              position: absolute;
              top: 0;
              bottom: 0;
              width: 16px;
              cursor: ew-resize;
              z-index: 20;
            }
            .text-section .resize-handle-left:hover,
            .text-section .resize-handle-right:hover {
              background: rgba(0,0,0,0.08);
            }

            .text-section .resize-handle-left { left: 0; }
            .text-section .resize-handle-right { right: 0; }

            .overlay {
              padding: 0 2rem;
            }

          </style>
        </head>
        <body>
          <div class='wrapper'>
              <div class="text-section" id="textSection">
                <div class='overlay' id="textOverlay">
                  __SNIPPET_HTML__
                </div>
                <div class="resize-handle-left" id="textResizeHandleLeft"></div>
                <div class="resize-handle-right" id="textResizeHandleRight"></div>
                <div class="resize-handle-corner" id="textResizeHandleCorner"></div>
              </div>
          </div>
        </body>
        <!-- SCRIPT TO RESIZE TEXT FONT-SIZE -->
        <script>
          ${scriptToResizeTextFontSize}
        </script>

        <!-- SCRIPT TO RESIZE TEXT FONT-SIZE -->
        <script>
          ${scriptToDrugTextSection}
        </script>
      </html>`

// <script>
//   const overlay=document.querySelector('.overlay');let size=22;while(size<=36){overlay.style.fontSize=size+'px';if(overlay.scrollWidth>overlay.clientWidth||overlay.scrollHeight>overlay.clientHeight){overlay.style.fontSize=(size-0.5)+'px';break;}size+=0.5;};
// </script>

// <!-- SCRIPT TO DRUG TEXT SECTION -->
// <script>
//   ${scriptToDrugTextSection}
// </script>
