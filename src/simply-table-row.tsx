import { Column, CellRendererParams, TableClassNames } from "./types";
import { cn } from "@/lib/utils";
import styles from "./styles/table.module.css";

interface SimplyTableRowProps<T> {
  row: T;
  rowIndex: number;
  columns: Column<T>[];
  isEven: boolean;
  cellClassName?: string | ((params: CellRendererParams<T>) => string);
  rowClassName?: string | ((row: T, index: number) => string);
  columnWidths?: Record<string, number>;
  classNames?: TableClassNames<T>;
}

export function SimplyTableRow<T>({
  row,
  rowIndex,
  columns,
  isEven,
  cellClassName,
  rowClassName,
  columnWidths,
  classNames,
}: SimplyTableRowProps<T>) {
  const rowClass = typeof rowClassName === "function" ? rowClassName(row, rowIndex) : rowClassName;

  return (
    <div
      className={cn(
        styles.row,
        isEven && styles.rowEven,
        rowClass,
        classNames?.row && (typeof classNames.row === 'function' ? classNames.row(row, rowIndex) : classNames.row),
        isEven ? classNames?.rowEven : classNames?.rowOdd
      )}
    >
      {columns.map((column) => {
        const value = column.valueGetter ? column.valueGetter(row) : row[column.field as keyof T];

        const params: CellRendererParams<T> = {
          value,
          row,
          rowIndex,
          column,
        };

        const cellClass = typeof cellClassName === "function" ? cellClassName(params) : cellClassName;

        const width = columnWidths?.[column.id] || column.width || 150;

        return (
          <div
            key={column.id}
            className={cn(
              styles.cell,
              cellClass,
              classNames?.cell && (typeof classNames.cell === 'function' ? classNames.cell(params) : classNames.cell)
            )}
            style={{
              width: `${width}px`,
              flexShrink: 0,
              flexGrow: 0,
              minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
              maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
            }}
          >
            {column.cellRenderer ? (
              column.cellRenderer(params)
            ) : (
              <span className={styles.cellContent}>{String(value || "")}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
