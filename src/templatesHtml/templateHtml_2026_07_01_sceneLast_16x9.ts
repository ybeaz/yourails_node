export const templateHtml_2026_07_01_sceneLast_16x9 = `
<!-- templateHtml_2026_07_01_sceneLast_16x9 -->
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
      .wrapper::before {
        /* filter: blur(30px); */
        opacity: 0.75; /* 0 = transparent, 1 = opaque */
      }
      /* Shared text styles */
      .text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        letter-spacing: 0.02em;
        color: #0b1220;
        z-index: 3;
      }
      /* Top
      .top {
        top: 100px;
        font-size: 64px;
        font-weight: 600;
        padding: 2rem 4rem;
        border-radius: 5rem;
        background-color: rgba(255, 255, 255, 0.75);
      } */
      /* Center block (stacked lines) */
      .center {
        top: 46%;
        transform: translate(-50%, -50%);
        font-size: 64px;
        line-height: 1.4;
        font-weight: 500;
        padding: 2rem 4rem;
        border-radius: 5rem;
        background-color: rgba(255, 255, 255, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        resize: both;
        overflow: auto;
      }
      /* Bottom */
      .bottom {
        bottom: 60px;
        font-size: 28px;
        opacity: 0.7;
        display: flex;
        gap: 1rem;
        padding: 1rem 2rem;
        background-color: rgba(255, 255, 255, 0.75);
        border-radius: 3rem;
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
  </head>
  <body>
    <div class="wrapper">
      <!-- <div class="text top">Thank you</div> -->
      <div class="text center">
        <div>Thank you</div>
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
