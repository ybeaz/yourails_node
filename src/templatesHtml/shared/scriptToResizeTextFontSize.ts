export const scriptToResizeTextFontSize = `(function () {
  const textSection = document.getElementById('textSection');
  const overlay = document.querySelector('.overlay');
  if (!textSection || !overlay) return;

  const PADDING = 40;
  const MIN_FONT = 10;
  const ABS_MAX_FONT = 600; // sanity cap for very short text in a huge box

  function fitText() {
    const maxHeight = textSection.clientHeight - PADDING;

    // Guard: if container has no real size yet, bail so the caller can retry
    if (textSection.clientWidth <= 0 || maxHeight <= 0) {
      console.warn('fitText: textSection not laid out yet');
      return false;
    }

    overlay.style.display = 'inline-block';

    let lo = MIN_FONT;
    // Upper bound follows the current box, so growing the box can grow the font
    let hi = Math.max(MIN_FONT, Math.min(maxHeight, ABS_MAX_FONT));
    let best = MIN_FONT;

    while (hi - lo > 0.5) {
      const mid = (lo + hi) / 2;
      overlay.style.fontSize = mid + 'px';

      // scrollWidth is rounded, so allow 1px of tolerance
      const fitsWidth = overlay.scrollWidth <= overlay.clientWidth + 1;
      const fitsHeight = overlay.scrollHeight <= maxHeight;

      if (fitsWidth && fitsHeight) {
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

  function runInitialFit() {
    // Double rAF: wait for a paint tick, then for its layout to be committed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const ok = fitText();
        if (!ok) setTimeout(fitText, 100);
      });
    });
  }

  function start() {
    if (document.fonts && document.fonts.ready) {
      // Wait for web fonts so measurements use the real font metrics
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
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = null;
      fitText();
    });
  }

  const ro = new ResizeObserver(scheduleFit);
  ro.observe(textSection);
  window.addEventListener('resize', scheduleFit);
})();`
