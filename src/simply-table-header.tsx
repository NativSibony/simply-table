import { Column, SortModel } from "./types";
import { useColumnResize } from "./hooks/use-column-resize";
import { cn } from "@/lib/utils";

interface SimplyTableHeaderProps<T> {
  columns: Column<T>[];
  sortModel: SortModel[];
  onSort: (field: string) => void;
  onDragStart: (e: React.DragEvent, columnId: string) => void;
  onDragOver: (e: React.DragEvent, columnId: string) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragEnd: () => void;
  onResizeColumn: (columnId: string, newWidth: number) => void;
  draggedColumn: string | null;
  dragOverColumn: string | null;
  className?: string;
}

const ArrowUpDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
    />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const GripVerticalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="9" cy="5" r="1" fill="currentColor" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="9" cy="19" r="1" fill="currentColor" />
    <circle cx="15" cy="5" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="19" r="1" fill="currentColor" />
  </svg>
);

function HeaderCell<T>({
  column,
  sort,
  isDragging,
  isDragOver,
  onSort,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onResizeColumn,
}: {
  column: Column<T>;
  sort: SortModel | undefined;
  isDragging: boolean;
  isDragOver: boolean;
  onSort: (field: string) => void;
  onDragStart: (e: React.DragEvent, columnId: string) => void;
  onDragOver: (e: React.DragEvent, columnId: string) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragEnd: () => void;
  onResizeColumn: (columnId: string, newWidth: number) => void;
}) {
  const { onResizeStart, newWidth } = useColumnResize({
    column,
    onResize: (width) => onResizeColumn(column.id, width),
  });

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-3 font-medium text-sm border-r last:border-r-0 relative group overflow-hidden",
        isDragging && "opacity-50",
        isDragOver && "bg-accent"
      )}
      style={{
        width: `${newWidth}px`,
        flexShrink: 0,
        flexGrow: 0,
        minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
        maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, column.id)}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDrop={(e) => onDrop(e, column.id)}
      onDragEnd={onDragEnd}
    >
      <GripVerticalIcon />

      <div className="flex-1 truncate min-w-0" title={typeof column.header === "string" ? column.header : undefined}>
        {typeof column.header === "function" ? column.header(column) : column.header}
      </div>

      {column.sortable !== false && (
        <button
          onClick={() => onSort(column.field as string)}
          className="hover:bg-accent rounded p-1 transition-colors flex-shrink-0"
        >
          {!sort && <ArrowUpDownIcon />}
          {sort?.sort === "asc" && <ArrowUpIcon />}
          {sort?.sort === "desc" && <ArrowDownIcon />}
        </button>
      )}

      {column.resizable !== false && (
        <div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary transition-colors"
          onMouseDown={onResizeStart}
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </div>
  );
}

export function SimplyTableHeader<T>({
  columns,
  sortModel,
  onSort,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onResizeColumn,
  draggedColumn,
  dragOverColumn,
  className,
}: SimplyTableHeaderProps<T>) {
  return (
    <div className={cn("flex border-b bg-muted/50 sticky top-0 z-10 backdrop-blur-sm", className)}>
      {columns.map((column) => {
        const sort = sortModel.find((s) => s.field === column.field);
        const isDragging = draggedColumn === column.id;
        const isDragOver = dragOverColumn === column.id;

        return (
          <HeaderCell
            key={column.id}
            column={column}
            sort={sort}
            isDragging={isDragging}
            isDragOver={isDragOver}
            onSort={onSort}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
            onResizeColumn={onResizeColumn}
          />
        );
      })}
    </div>
  );
}
