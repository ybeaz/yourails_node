export const scriptToDrugTextSection = `(function () {
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
            })();`
