import { useState } from "react";
import type { Column } from "../types";

const MAX_WIDTH = 400;
const MIN_WIDTH = 50;

export function useColumnResize<T>({ column, onResize }: { column: Column<T>; onResize?: (width: number) => void }) {
  const [newWidth, setNewWidth] = useState(column.width ?? MIN_WIDTH);

  const onResizeStart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const startX = event.clientX;
    const width = newWidth;
    const maxWidth = column.maxWidth || MAX_WIDTH;
    const minWidth = column.minWidth || MIN_WIDTH;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const updatedWidth = width + deltaX;
      if (updatedWidth >= minWidth && updatedWidth <= maxWidth) {
        setNewWidth(updatedWidth);
        if (onResize) {
          onResize(updatedWidth);
        }
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return { onResizeStart, newWidth };
}
