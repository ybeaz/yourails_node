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
            .overlay {
              __POSITION_IN_RECTANGLE_CSS__
              position: absolute;
              width: calc(768px - 40px);
              height: calc(512px + 150px - 40px);
              border-radius: 10px;
              z-index: 10;
              -webkit-text-size-adjust: 100%;
              font-family: Consolas, Menlo, "courier new", monospace;
              color: black;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: auto;
              resize: both;
              background-color: rgb(240 246 242);
              font-size: 22px;
              line-height: 1.5;
              padding: 2rem;
            }
            .parent * {
                font-size: inherit;
            }
          </style>
        </head>
        <body>
          <div class='wrapper'>
            <div class="overlay">__SNIPPET_HTML__</div>
          </div>
        </body>
        <script>
          const overlay=document.querySelector('.overlay');let size=22;while(size<=36){overlay.style.fontSize=size+'px';if(overlay.scrollWidth>overlay.clientWidth||overlay.scrollHeight>overlay.clientHeight){overlay.style.fontSize=(size-0.5)+'px';break;}size+=0.5;};
        </script>
      </html>`
