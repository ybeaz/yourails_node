import { scriptToDrugTextSection } from './shared/scriptToDrugTextSection'
import { scriptToResizeImage } from './shared/scriptToResizeImage'
import { scriptToResizeTextFontSize } from './shared/scriptToResizeTextFontSize'

export const templateHtml_2026_08_18_sceneRegular_9x16 = `
<!-- templateHtml_2026_08_18_sceneRegular_9x16 -->
<!DOCTYPE html>
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
          overflow-x: hidden;
          overflow-y: auto;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          color: #0b1220;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .wrapper {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          overflow: visible;
          background-color: __BACKGROUND_COLOR__;
        }

        __POSITION_IN_RECTANGLE_CSS__

        .image-section {
          height: 50%;
          width: 100%;
          overflow: hidden;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          flex-shrink: 0;
        }

        .image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .resize-handle-corner {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 16px;
          height: 16px;
          cursor: nwse-resize;
          z-index: 10;
        }
        .resize-handle-corner:hover {
          background: rgba(0,0,0,0.15);
        }

        .resize-handle-left,
        .resize-handle-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 16px;
          cursor: ew-resize;
          z-index: 10;
        }
        .resize-handle-left:hover,
        .resize-handle-right:hover {
          background: rgba(0,0,0,0.08);
        }

        .resize-handle-left { left: 0; }
        .resize-handle-right { right: 0; }

        .text-section {
          height: 45vh; /* Initial text section position */
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: auto;
          position: relative;
          top: 0;                        /* anchors to upper edge — untouched by resize */
          left: 50%;
          transform: translateX(-50%);   /* horizontal centering, same trick as image-section */
          flex-shrink: 0;
        }

        .text-section .resize-handle-left,
        .text-section .resize-handle-right {
          position: absolute;
          top: 0;
          bottom: 0;
          cursor: ew-resize;
          z-index: 10;
        }

        .text-section .resize-handle-left { left: 0; }
        .text-section .resize-handle-right { right: 0; }

        .text-section .resize-handle-corner {
          position: absolute;
          right: 0;
          bottom: 0;
          cursor: nwse-resize;
          z-index: 10;
        }

        .overlay {
          padding: 0 2rem;
        }
      </style>
      <style>

      </style>
    </head>
    <body>
      <div class="wrapper">
        <div id="imageSection" class="image-section">
          <img src="data:image/png;base64,__IMAGE_BASE_64__" alt="" />
          <div class="resize-handle-left" id="resizeHandleLeft"></div>
          <div class="resize-handle-right" id="resizeHandleRight"></div>
          <div class="resize-handle-corner" id="resizeHandleCorner"></div>
        </div>
        
        <div id="textSection" class="text-section">
          <div class='overlay'>__SNIPPET_HTML__</div>
          <div class="resize-handle-left" id="textResizeHandleLeft"></div>
          <div class="resize-handle-right" id="textResizeHandleRight"></div>
          <div class="resize-handle-corner" id="textResizeHandleCorner"></div>
        </div>
      </div>
    </body>

    <script></script>

    <!-- SCRIPT TO RESIZE IMAGE -->
    <script>
      ${scriptToResizeImage}
    </script>
      
    <!-- SCRIPT TO RESIZE TEXT FONT-SIZE -->
    <script>
      ${scriptToResizeTextFontSize}
    </script>

    <!-- SCRIPT TO DRUG TEXT SECTION -->
    <script>
      ${scriptToDrugTextSection}
    </script>
  </html>
`
