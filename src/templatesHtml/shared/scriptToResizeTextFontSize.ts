export const scriptToResizeTextFontSize = `(function () {
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
            })();`
