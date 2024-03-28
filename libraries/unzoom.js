function handleZoom(event) {
  const { ctrlKey, metaKey, deltaY, key } = event;
  const isControl = (ctrlKey || metaKey);
  const isDelta = (deltaY > 0 || deltaY < 0);
  const isZoomKey = (key === '-' || key === '+' || key === '=');

  if (isControl && (isDelta || isZoomKey)) event.preventDefault();
}

function unzoom(element) {
  element.addEventListener('wheel', handleZoom, { passive: false });
  element.addEventListener('keydown', handleZoom, { passive: false });

  return () => {
    element.removeEventListener('wheel', handleZoom, { passive: false });
    element.removeEventListener('keydown', handleZoom, { passive: false });
  };
}

export default unzoom;
