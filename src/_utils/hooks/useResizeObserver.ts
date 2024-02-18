import { useState, useLayoutEffect, RefObject } from 'react';

export const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  function handleResize(entries: ResizeObserverEntry[]) {
    if (!Array.isArray(entries)) {
      return;
    }

    // get width and height of the container ref
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        setHeight(entry.contentBoxSize[0].blockSize);
        setWidth(entry.contentBoxSize[0].inlineSize);
      } else {
        setHeight(entry.contentRect.height);
        setWidth(entry.contentRect.width);
      }
    }
  }

  useLayoutEffect(() => {
    if (!ref.current) return;

    //https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
    const observer = new ResizeObserver((entries) => {
      handleResize(entries);
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [width, height];
};

export default useResizeObserver;
