import { useState, useCallback, useMemo } from "react";
import { FilterModel, Column } from "../types";

export function useFiltering<T>(
  rows: T[],
  columns: Column<T>[],
  filterMode: "client" | "server" = "client",
  initialFilterModel?: FilterModel,
  onFilterChange?: (model: FilterModel) => void
) {
  const [filterModel, setFilterModel] = useState<FilterModel>(initialFilterModel || {});

  const handleFilterChange = useCallback(
    (field: string, value: any, operator: string = "contains") => {
      const newFilterModel = { ...filterModel };

      if (!value || value === "") {
        delete newFilterModel[field];
      } else {
        newFilterModel[field] = { value, operator: operator as any };
      }

      setFilterModel(newFilterModel);
      onFilterChange?.(newFilterModel);
    },
    [filterModel, onFilterChange]
  );

  const filteredRows = useMemo(() => {
    if (filterMode === "server" || Object.keys(filterModel).length === 0) {
      return rows;
    }

    return rows.filter((row) => {
      return Object.entries(filterModel).every(([field, filter]) => {
        const column = columns.find((col) => col.field === field);
        if (!column) return true;

        const value = column.valueGetter ? column.valueGetter(row) : row[field as keyof T];
        const filterValue = filter.value;
        const operator = filter.operator || "contains";

        const strValue = String(value).toLowerCase();
        const strFilterValue = String(filterValue).toLowerCase();

        switch (operator) {
          case "contains":
            return strValue.includes(strFilterValue);
          case "equals":
            return strValue === strFilterValue;
          case "startsWith":
            return strValue.startsWith(strFilterValue);
          case "endsWith":
            return strValue.endsWith(strFilterValue);
          case "gt":
            return value > filterValue;
          case "lt":
            return value < filterValue;
          case "gte":
            return value >= filterValue;
          case "lte":
            return value <= filterValue;
          default:
            return true;
        }
      });
    });
  }, [rows, filterModel, filterMode, columns]);

  return {
    filteredRows,
    filterModel,
    handleFilterChange,
  };
}
