import { useState, useCallback, useRef, useEffect } from "react";

interface UseVirtualizationProps {
  totalRows: number;
  rowHeight: number;
  containerHeight?: number;
  overscanCount?: number;
}

export function useVirtualization({
  totalRows,
  rowHeight,
  containerHeight: externalContainerHeight,
  overscanCount = 5,
}: UseVirtualizationProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const containerHeight = externalContainerHeight || measuredHeight || 600;

  useEffect(() => {
    if (externalContainerHeight) {
      return;
    }

    const measureHeight = () => {
      if (scrollRef.current) {
        const height = scrollRef.current.clientHeight;
        if (height > 0 && height !== measuredHeight) {
          setMeasuredHeight(height);
        }
      }
    };

    const timeoutId = setTimeout(measureHeight, 0);

    window.addEventListener("resize", measureHeight);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", measureHeight);
    };
  }, [externalContainerHeight, measuredHeight]);

  const visibleRowCount = Math.ceil(containerHeight / rowHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscanCount);
  const endIndex = Math.min(totalRows, startIndex + visibleRowCount + overscanCount * 2);

  const virtualRows = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);
  const totalHeight = totalRows * rowHeight;
  const offsetY = startIndex * rowHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    virtualRows,
    totalHeight,
    offsetY,
    handleScroll,
    scrollRef,
  };
}
