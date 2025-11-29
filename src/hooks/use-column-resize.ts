import type { Column } from "../types";

export interface UseColumnResizeOptions<T> {
  column: Column<T>;
  onResize?: (width: number) => void;
  defaultMinWidth?: number;
  defaultMaxWidth?: number;
}

export function useColumnResize<T>({
  column,
  onResize,
  defaultMinWidth = 50,
  defaultMaxWidth = 800,
}: UseColumnResizeOptions<T>) {
  const onResizeStart = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const startX = event.clientX;
    const width = column.width ?? defaultMinWidth;
    const maxWidth = column.maxWidth || defaultMaxWidth;
    const minWidth = column.minWidth || defaultMinWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const updatedWidth = width + deltaX;
      if (updatedWidth >= minWidth && updatedWidth <= maxWidth) {
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

  return { onResizeStart };
}
