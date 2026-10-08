export const templateHtml_2026_07_01_header = `
<!-- templateHtml_2026_07_01_header -->
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .wrapper {
    display: flex;
    justify-content: center;   /* vertical center */
    align-items: center;       /* horizontal center */
    flex-direction: column;

    width: 100%;
    height: 100%;              /* 👈 important for vertical centering */

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Roboto", Arial, sans-serif;
  }
  .wrapper .text {
    color: #0b1220;
  }
  .wrapper .h1 {
    width: 100%;               /* 👈 force wrapping inside 400px viewport */
    max-width: 100%;

    text-align: center;        /* 👈 center multiline text */

    font-size: 24px;
    font-weight: 600;
    color: #0b1220;

    line-height: 1.25;
    letter-spacing: -0.03em;

    word-break: break-word;    /* 👈 prevents overflow on long words */
    white-space: nowrap;    /* 👈 prevent wrapping */
    overflow: hidden; 
  }

  .wrapper .h2 {
    font-size: ${16}px;
    font-weight: 500;
    color: #667085;
    margin-top: 12px;
    line-height: 1.25;
  }
</style>
<div class='wrapper'>
  <div id="title" class="h1">__TITLE_HEADER__</div>
  <!-- <div class="h2">My subtitle</div> -->
<div>
<script>
  const el = document.getElementById('title');
  const maxWidth = 400;
  let size = 24;
  while (el.scrollWidth > maxWidth && size > 8) {
    size -= 0.5;
    el.style.fontSize = size + 'px';
  }
</script>`
