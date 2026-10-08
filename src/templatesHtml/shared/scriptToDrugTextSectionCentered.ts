export const scriptToDrugTextSectionCentered = `(function () {
  const section = document.getElementById('textSection');
  const cornerHandle = document.getElementById('textResizeHandleCorner');
  const leftHandle = document.getElementById('textResizeHandleLeft');
  const rightHandle = document.getElementById('textResizeHandleRight');

  function getCurrentRect() {
    const rect = section.getBoundingClientRect();
    const parentRect = section.offsetParent
      ? section.offsetParent.getBoundingClientRect()
      : { left: 0, top: 0 };
    return {
      width: rect.width || section.offsetWidth,
      height: rect.height || section.offsetHeight,
      left: rect.left - parentRect.left,
      top: rect.top - parentRect.top,
    };
  }

  function lockCurrentBox() {
    const { width, height, left, top } = getCurrentRect();
    // Kill the centering trick (left:50%+transform) and replace it with
    // an absolute px box in the SAME visual spot, so left/width become
    // independently controllable instead of being recomputed together.
    section.style.position = 'absolute';
    section.style.transform = 'none';
    section.style.margin = '0';
    section.style.left = left + 'px';
    section.style.top = top + 'px';
    section.style.width = width + 'px';
    section.style.height = height + 'px';
    return { width, height, left, top };
  }

  function startProportionalResize(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const { width: startWidth, height: startHeight, left: startLeft, top: startTop } = lockCurrentBox();
    const aspectRatio = startHeight > 0 ? startWidth / startHeight : 1;
    const centerX = startLeft + startWidth / 2;
    const centerY = startTop + startHeight / 2;

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
      // corner handle still grows from the box's own center
      section.style.width = newWidth + 'px';
      section.style.height = newHeight + 'px';
      section.style.left = (centerX - newWidth / 2) + 'px';
      section.style.top = (centerY - newHeight / 2) + 'px';
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function startHorizontalResize(e, direction) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const startX = e.clientX;
    const { width: startWidth, left: startLeft } = lockCurrentBox();

    const onMouseMove = (e) => {
      const dx = e.clientX - startX;
      if (direction === 1) {
        // right handle: right edge follows the mouse, left edge stays put
        const newWidth = Math.max(startWidth + dx, 50);
        section.style.width = newWidth + 'px';
      } else {
        // left handle: left edge follows the mouse, right edge stays put
        const newWidth = Math.max(startWidth - dx, 50);
        section.style.width = newWidth + 'px';
        section.style.left = (startLeft + (startWidth - newWidth)) + 'px';
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  if (cornerHandle) cornerHandle.addEventListener('mousedown', startProportionalResize);
  if (leftHandle) leftHandle.addEventListener('mousedown', (e) => startHorizontalResize(e, -1));
  if (rightHandle) rightHandle.addEventListener('mousedown', (e) => startHorizontalResize(e, 1));
})();`
