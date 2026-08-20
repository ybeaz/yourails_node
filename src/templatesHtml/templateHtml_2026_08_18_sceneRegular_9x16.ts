export const templateHtml_2026_08_18_sceneRegular_9x16 = `<!DOCTYPE html>
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
                flex-direction: column;
                overflow: visible;
                background-color: rgb(240 246 242);
              }

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
                height: 30vh; // Initial text section position
                width: 100%;
                display: flex;
                align-items: center;
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
            </style>
            <style>

            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="image-section" id="imageSection">
                <img src="data:image/png;base64,__IMAGE_BASE_64__" alt="" />
                <div class="resize-handle-left" id="resizeHandleLeft"></div>
                <div class="resize-handle-right" id="resizeHandleRight"></div>
                <div class="resize-handle-corner" id="resizeHandleCorner"></div>
              </div>
              
              <div class="text-section" id="textSection">
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
            (function () {
              const section = document.getElementById('imageSection');
              const cornerHandle = document.getElementById('resizeHandleCorner');
              const leftHandle = document.getElementById('resizeHandleLeft');
              const rightHandle = document.getElementById('resizeHandleRight');

              // Proportional corner resize (unchanged from before)
              function startProportionalResize(e) {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = section.offsetWidth;
                const startHeight = section.offsetHeight;
                const aspectRatio = startWidth / startHeight;

                const onMouseMove = (e) => {
                  const dx = e.clientX - startX;
                  const dy = e.clientY - startY;
                  let newWidth, newHeight;
                  if (Math.abs(dx) > Math.abs(dy)) {
                    newWidth = Math.max(startWidth + dx, 50);
                    newHeight = newWidth / aspectRatio;
                  } else {
                    newHeight = Math.max(startHeight + dy, 50);
                    newWidth = newHeight * aspectRatio;
                  }
                  section.style.width = newWidth + 'px';
                  section.style.height = newHeight + 'px';
                };

                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }

              // Free horizontal-only stretch (out of proportion)
              function startHorizontalResize(e) {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = section.offsetWidth;

                const onMouseMove = (e) => {
                  const dx = e.clientX - startX;
                  // dragging either side grows the box outward from center,
                  // since left:50%+translateX(-50%) already recenters it —
                  // moving either edge by dx has the same net visual effect
                  const newWidth = Math.max(startWidth + Math.abs(dx) * 2 * Math.sign(dx === 0 ? 1 : dx), 50);
                  section.style.width = newWidth + 'px';
                  // height is intentionally left untouched -> distorts aspect ratio
                };

                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }

              cornerHandle.addEventListener('mousedown', startProportionalResize);
              leftHandle.addEventListener('mousedown', startHorizontalResize);
              rightHandle.addEventListener('mousedown', startHorizontalResize);
            })();
          </script>
           
          <!-- SCRIPT TO RESIZE TEXT FONT-SIZE -->
          <script>
            (function () {
              const textSection = document.getElementById('textSection');
              const overlay = document.querySelector('.overlay');
              const PADDING = 40;
              const MIN_FONT = 10;
              const MAX_FONT = 96;

              function fitText() {
                if (!overlay || !textSection) return;

                const maxWidth = textSection.clientWidth - PADDING;
                const maxHeight = textSection.clientHeight - PADDING;

                // Guard: if container has no real size yet, bail and retry later
                if (maxWidth <= 0 || maxHeight <= 0) {
                  console.warn('fitText: textSection not laid out yet', { maxWidth, maxHeight });
                  return false;
                }

                overlay.style.display = 'inline-block';

                let lo = MIN_FONT;
                let hi = MAX_FONT;
                let best = MIN_FONT;

                while (hi - lo > 0.5) {
                  const mid = (lo + hi) / 2;
                  overlay.style.fontSize = mid + 'px';
                  const fits = overlay.scrollWidth <= maxWidth && overlay.scrollHeight <= maxHeight;
                  if (fits) {
                    best = mid;
                    lo = mid;
                  } else {
                    hi = mid;
                  }
                }

                overlay.style.fontSize = best + 'px';
                console.log('fitText result', { best, maxWidth, maxHeight });
                return true;
              }

              function runInitialFit() {
                // Double rAF: first rAF waits for the browser's next paint tick,
                // second rAF guarantees layout from that tick has been committed —
                // avoids measuring against a stale/zero layout right after load.
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    const ok = fitText();
                    // Safety net: if container still wasn't ready, retry shortly after
                    if (!ok) setTimeout(fitText, 100);
                  });
                });
              }

              function start() {
                if (document.fonts && document.fonts.ready) {
                  // Wait for web fonts to finish loading before measuring —
                  // otherwise scrollWidth/Height reflect fallback-font metrics
                  // and the "biggest fit" size is computed against the wrong text box.
                  document.fonts.ready.then(runInitialFit);
                } else {
                  runInitialFit();
                }
              }

              if (document.readyState === 'complete') {
                start();
              } else {
                window.addEventListener('load', start);
              }

              let rafId = null;
              const ro = new ResizeObserver(() => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(fitText);
              });
              if (textSection) ro.observe(textSection);
            })();
          </script>

          <!-- SCRIPT TO RESIZE TEXT SECTION (drag handles) -->
          <script>
            (function () {
              const textSection = document.getElementById('textSection');
              const cornerHandle = document.getElementById('textResizeHandleCorner');
              const leftHandle = document.getElementById('textResizeHandleLeft');
              const rightHandle = document.getElementById('textResizeHandleRight');

              function startProportionalResize(e) {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = textSection.offsetWidth;
                const startHeight = textSection.offsetHeight;
                const aspectRatio = startWidth / startHeight;

                const onMouseMove = (e) => {
                  const dx = e.clientX - startX;
                  const dy = e.clientY - startY;
                  let newWidth, newHeight;
                  if (Math.abs(dx) > Math.abs(dy)) {
                    newWidth = Math.max(startWidth + dx, 50);
                    newHeight = newWidth / aspectRatio;
                  } else {
                    newHeight = Math.max(startHeight + dy, 50);
                    newWidth = newHeight * aspectRatio;
                  }
                  textSection.style.width = newWidth + 'px';
                  textSection.style.height = newHeight + 'px';
                };

                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }

              function startHorizontalResize(e) {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = textSection.offsetWidth;

                const onMouseMove = (e) => {
                  const dx = e.clientX - startX;
                  const newWidth = Math.max(startWidth + Math.abs(dx) * 2 * Math.sign(dx === 0 ? 1 : dx), 50);
                  textSection.style.width = newWidth + 'px';
                };

                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }

              if (cornerHandle) cornerHandle.addEventListener('mousedown', startProportionalResize);
              if (leftHandle) leftHandle.addEventListener('mousedown', startHorizontalResize);
              if (rightHandle) rightHandle.addEventListener('mousedown', startHorizontalResize);
            })();
          </script>
        </html>
      `
