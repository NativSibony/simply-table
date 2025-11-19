import { useState, useCallback } from "react";
import { Column } from "../types";

export function useColumnReorder<T>(initialColumns: Column<T>[], onColumnReorder?: (columns: Column<T>[]) => void) {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, columnId: string) => {
      e.preventDefault();
      if (draggedColumn !== columnId) {
        setDragOverColumn(columnId);
      }
    },
    [draggedColumn]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, targetColumnId: string) => {
      e.preventDefault();

      if (!draggedColumn || draggedColumn === targetColumnId) {
        setDraggedColumn(null);
        setDragOverColumn(null);
        return;
      }

      setColumns((prev) => {
        const newColumns = [...prev];
        const draggedIndex = newColumns.findIndex((col) => col.id === draggedColumn);
        const targetIndex = newColumns.findIndex((col) => col.id === targetColumnId);

        const [removed] = newColumns.splice(draggedIndex, 1);
        newColumns.splice(targetIndex, 0, removed);

        if (onColumnReorder) {
          onColumnReorder(newColumns);
        }

        return newColumns;
      });

      setDraggedColumn(null);
      setDragOverColumn(null);
    },
    [draggedColumn, onColumnReorder]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  }, []);

  return {
    columns,
    setColumns,
    draggedColumn,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
