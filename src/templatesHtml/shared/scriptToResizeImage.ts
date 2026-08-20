export const scriptToResizeImage = `(function () {
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
            })();`
