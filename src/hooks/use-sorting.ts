import { useState, useCallback, useMemo } from "react";
import { SortModel, Column } from "../types";

export function useSorting<T>(
  rows: T[],
  columns: Column<T>[],
  sortMode: "client" | "server" = "client",
  initialSortModel?: SortModel[],
  onSortChange?: (model: SortModel[]) => void
) {
  const [sortModel, setSortModel] = useState<SortModel[]>(initialSortModel || []);

  const handleSort = useCallback(
    (field: string) => {
      const existingSort = sortModel.find((s) => s.field === field);
      let newSortModel: SortModel[];

      if (!existingSort) {
        newSortModel = [{ field, sort: "asc" }];
      } else if (existingSort.sort === "asc") {
        newSortModel = [{ field, sort: "desc" }];
      } else {
        newSortModel = [];
      }

      setSortModel(newSortModel);
      onSortChange?.(newSortModel);
    },
    [sortModel, onSortChange]
  );

  const sortedRows = useMemo(() => {
    if (sortMode === "server" || sortModel.length === 0) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      for (const sort of sortModel) {
        const column = columns.find((col) => col.field === sort.field);
        if (!column) continue;

        const aValue = column.valueGetter ? column.valueGetter(a) : a[column.field as keyof T];
        const bValue = column.valueGetter ? column.valueGetter(b) : b[column.field as keyof T];

        let comparison = 0;
        if (column.comparator) {
          comparison = column.comparator(aValue, bValue);
        } else {
          if (aValue < bValue) comparison = -1;
          if (aValue > bValue) comparison = 1;
        }

        if (comparison !== 0) {
          return sort.sort === "asc" ? comparison : -comparison;
        }
      }
      return 0;
    });
  }, [rows, sortModel, sortMode, columns]);

  return {
    sortedRows,
    sortModel,
    handleSort,
  };
}
