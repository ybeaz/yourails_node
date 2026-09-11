export const templateHtml_2026_07_01_sceneFirst_16x9 = `
<!-- templateHtml_2026_07_01_sceneFirst_16x9 -->
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
      .logo-group {
        position: absolute;
        top: 48px;
        left: 48px;
        z-index: 2;
        display: block;
        display: __LOGO_GROUP_DISPLAY__;
      }
      .logo-group img {
        width: 72px;
        height: auto;
        display: block;
      }
      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Roboto", Arial, sans-serif;
      }
      .text-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        z-index: 2;
        gap: 1rem;
      }
      .text-group > :only-child {
        margin-top: auto;
        margin-bottom: auto;
      }
      .text-group .h1 {
        display: flex;
        justify-content: center;
        align-items: center; 
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
        overflow: auto;
        resize: both;
        font-size: 54px;
      }
      .text-group .h2 {
        display: flex;
        justify-content: center;
        align-items: center;
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
        overflow: auto;
        resize: both;
        font-size: 36px;
      }
      .text-group .h1:empty,
      .text-group .h2:empty {
        display: none;
      }
    </style>
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
        <div class="h1">__HEADER_MAIN__</div>
        __SUBHEADER_MAIN__
      </div>
    </div>
  </body>
</html>
`
