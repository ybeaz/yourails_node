export const scriptToResizeTextFontSize = `(function () {
  const textSection = document.getElementById('textSection');
  const overlay = document.querySelector('.overlay');
  if (!textSection || !overlay) return;

  const PADDING = 40;
  const MIN_FONT = 10;
  const ABS_MAX_FONT = 600; // sanity cap for very short text in a huge box
  const INITIAL_FONT = 48;

  // Auto-fit stays off until the user actually starts dragging a handle
  let autoFitEnabled = false;

  function textFits(maxHeight) {
    const fitsWidth = overlay.scrollWidth <= overlay.clientWidth + 1;
    const fitsHeight = overlay.scrollHeight <= maxHeight;
    return fitsWidth && fitsHeight;
  }

  function fitText() {
    const maxHeight = textSection.clientHeight - PADDING;

    if (textSection.clientWidth <= 0 || maxHeight <= 0) {
      console.warn('fitText: textSection not laid out yet');
      return false;
    }

    overlay.style.display = 'inline-block';

    let lo = MIN_FONT;
    let hi = Math.max(MIN_FONT, Math.min(maxHeight, ABS_MAX_FONT));
    let best = MIN_FONT;

    while (hi - lo > 0.5) {
      const mid = (lo + hi) / 2;
      overlay.style.fontSize = mid + 'px';
      if (textFits(maxHeight)) {
        best = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }

    overlay.style.fontSize = best + 'px';
    return true;
  }

  // Exposed so the drag script can call it explicitly if needed
  window.__fitText = fitText;

  function applyInitialFont() {
    const maxHeight = textSection.clientHeight - PADDING;

    if (textSection.clientWidth <= 0 || maxHeight <= 0) {
      return false;
    }

    overlay.style.display = 'inline-block';

    // Try the desired fixed size first
    overlay.style.fontSize = INITIAL_FONT + 'px';

    if (textFits(maxHeight)) {
      // 48px fits as authored — keep it exactly
      overlay.style.fontSize = INITIAL_FONT + 'px';
    } else {
      // 48px overflows the box — shrink to the largest size that fits
      fitText();
    }

    return true;
  }

  function runInitialFit() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const ok = applyInitialFont();
        if (!ok) setTimeout(applyInitialFont, 100);
      });
    });
  }

  function start() {
    if (document.fonts && document.fonts.ready) {
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
  function scheduleFit() {
    if (!autoFitEnabled) return; // ignore resize events until the user drags
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = null;
      fitText();
    });
  }

  const ro = new ResizeObserver(scheduleFit);
  ro.observe(textSection);
  window.addEventListener('resize', scheduleFit);

  // Arm auto-fit as soon as the user starts interacting with a handle
  function armAutoFit() {
    autoFitEnabled = true;
  }
  ['textResizeHandleLeft', 'textResizeHandleRight', 'textResizeHandleCorner'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('pointerdown', armAutoFit, { once: true });
  });
})();`
