import { scriptToDrugTextSectionCentered } from './shared/scriptToDrugTextSectionCentered'
import { scriptToResizeTextFontSize } from './shared/scriptToResizeTextFontSize'

export const templateHtml_2026_09_04_sceneTitle_9x16 = `
<!-- templateHtml_2026_09_04_sceneTitle_9x16 -->
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Slide</title>
      <link rel="stylesheet" href="styles.css" />
      <style>
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
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
          display: flex;
          flex-direction: column;
          align-items: stretch;
          height: 100%;
        }

        .image-section {
          flex: 1 1 0;   /* each section takes an equal share of available height */
          min-height: 0; /* prevents flex children from overflowing their container */
          width: 100%;
          opacity: 0.55; /* 0 = transparent, 1 = opaque */
        }

        .image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* keeps it filling the section, cropping as needed */
          display: block;
        }

        .logo-group {
          position: absolute;
          top: 48px;
          left: 48px;
          z-index: 2;
          display: block;
          display: __LOGO_GROUP_DISPLAY__;
        }
        .logo-group img {
          width: 64px;
          height: auto;
          display: block;
        }

        .text-section {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 2rem;
          right: 2rem;
          top: 46%;
          transform: translateY(-50%);
          font-size: 64px;
          line-height: 1.4;
          font-weight: 500;
          padding: 2rem;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 5rem;
        }

        .overlay {
          text-align: center;
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
        
        /* Bottom */
        .bottom {
          position: absolute;
          left: 50%;  
          transform: translateX(-50%);
          bottom: 60px;
          font-size: 20px;
          opacity: 0.9;
          display: flex;
          gap: 1rem;
          padding: 0.63rem 0.67rem;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 3rem;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          resize: both;
          overflow: auto;
        }
        .bottom img {
          width: 32px;
          height: auto;
          opacity: 1;
          display: inline-block;
        }
        .copyright {
          display: block;
          display: __COPYRIGHT_DISPLAY__;
        }
      </style>
      <style>

      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="image-section">
          <img src="data:image/png;base64,__IMAGE_BASE_64__" alt="" />
        </div>
        <div class="image-section">
          <img src="data:image/png;base64,__IMAGE_BASE_64_2__" alt="" />
        </div>

        <div class="logo-group">
          <img
            src="http://localhost:3000/images/youRailsLogos/2026-05-22_logos/yourails_05_cycle.svg"
            alt="YouRails logo"
          />
        </div>

        <div id="textSection" class="text-section center">
          <div class='overlay'>__HEADER_MAIN__</div>
          <div class="resize-handle-left" id="textResizeHandleLeft"></div>
          <div class="resize-handle-right" id="textResizeHandleRight"></div>
          <div class="resize-handle-corner" id="textResizeHandleCorner"></div>
        </div>

        <div class="text bottom copyright">
          <img
            src="http://localhost:3000/images/youRailsLogos/2026-05-22_logos/yourails_05_cycle.svg"
            alt="YouRails logo"
          />
          <span>Studio YouRails.com &nbsp;&nbsp; © 2026</span>
        </div>
      </div>
    </body>

    <!-- SCRIPT TO RESIZE TEXT FONT-SIZE -->
    <script>
      ${scriptToResizeTextFontSize}
    </script>

    <!-- SCRIPT TO DRUG TEXT SECTION -->
    <script>
      ${scriptToDrugTextSectionCentered}
    </script>

    <script>
      const overlay = document.querySelector('.overlay');
      const wordsNumber = overlay.innerText.split(' ').length
      if(wordsNumber < 3) overlay.style.whiteSpace = 'nowrap';
      else overlay.style.whiteSpace = 'pre-line';
    </script>

  </html>
`

export const templateHtml_2026_09_04_sceneTitle_9x16__2 = `
<!-- templateHtml_2026_09_04_sceneTitle_9x16 -->
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Slide</title>
      <link rel="stylesheet" href="styles.css" />
      <style>
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
          display: flex;
          flex-direction: column;
          align-items: stretch;
          height: 100%;
        }

        .image-section {
          flex: 1 1 0;   /* each section takes an equal share of available height */
          min-height: 0; /* prevents flex children from overflowing their container */
          width: 100%;
          opacity: 0.55; /* 0 = transparent, 1 = opaque */
        }

        .image-section img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* keeps it filling the section, cropping as needed */
          display: block;
        }

        .center {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 50%;
          top: 46%;
          transform: translate(-50%, -50%);
          font-size: 64px;
          line-height: 1.4;
          font-weight: 500;
          padding: 2rem 4rem;
          border-radius: 5rem;
          background-color: rgba(255, 255, 255, 0.9);
          white-space: pre-line;
          margin: 0 2rem;
          resize: both;
          overflow: auto;
        }
        /* Bottom */
        .bottom {
          position: absolute;
          left: 50%;  
          transform: translateX(-50%);
          bottom: 60px;
          font-size: 20px;
          opacity: 0.9;
          display: flex;
          gap: 1rem;
          padding: 0.63rem 0.67rem;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 3rem;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          resize: both;
          overflow: auto;
        }
        .bottom img {
          width: 32px;
          height: auto;
          opacity: 1;
          display: inline-block;
        }
      </style>
      <style>

      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="image-section">
          <img src="data:image/png;base64,__IMAGE_BASE_64__" alt="" />
        </div>
        <div class="image-section">
          <img src="data:image/png;base64,__IMAGE_BASE_64_2__" alt="" />
        </div>
        <div class="text center">
          <div>__HEADER_MAIN__</div>
        </div>
        <div class="text bottom">
          <img
            src="http://localhost:3000/images/youRailsLogos/2026-05-22_logos/yourails_05_cycle.svg"
            alt="YouRails logo"
          />
          <span>Studio YouRails.com &nbsp;&nbsp; © 2026</span>
        </div>
      </div>
    </body>
  </html>`
