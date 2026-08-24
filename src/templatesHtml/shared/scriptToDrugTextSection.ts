export const scriptToDrugTextSection = `(function () {
              const section = document.getElementById('textSection');
              const cornerHandle = document.getElementById('textResizeHandleCorner');
              const leftHandle = document.getElementById('textResizeHandleLeft');
              const rightHandle = document.getElementById('textResizeHandleRight');

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

              function startHorizontalResize(e, direction) {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = section.offsetWidth;

                const onMouseMove = (e) => {
                  const dx = e.clientX - startX;
                  const newWidth = Math.max(startWidth + dx * direction * 2, 50);
                  section.style.width = newWidth + 'px';
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
