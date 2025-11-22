import { Column, CellRendererParams, TableClassNames } from "./types";
import { cn } from "@/lib/utils";

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
        "st-flex st-border-b last:st-border-b-0 hover:st-bg-muted/50 st-transition-colors",
        isEven && "st-bg-muted/20",
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
              "st-px-4 st-py-3 st-border-r last:st-border-r-0 st-text-sm st-flex st-items-center st-overflow-hidden st-min-w-0",
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
              <span className="st-truncate">{String(value || "")}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
