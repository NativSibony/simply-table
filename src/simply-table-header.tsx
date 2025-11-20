import { Column, SortModel, SortIconProps, ResizeHandleProps, DragIndicatorProps, TableClassNames } from "./types";
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
  sortIcon?: React.ComponentType<SortIconProps>;
  resizeHandle?: React.ComponentType<ResizeHandleProps>;
  dragIndicator?: React.ComponentType<DragIndicatorProps>;
  sortIconClassName?: string;
  resizeHandleClassName?: string;
  defaultMinResizeWidth?: number;
  defaultMaxResizeWidth?: number;
  classNames?: TableClassNames<T>;
}

const DefaultSortIcon = ({ direction }: SortIconProps) => {
  if (direction === 'asc') {
    return (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  if (direction === 'desc') {
    return (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  );
};

const DefaultResizeHandle = ({ onMouseDown }: ResizeHandleProps) => (
  <div
    className="absolute right-1 top-1/2 -translate-y-1/2 w-0.5 h-3.5 dark:bg-[#babacd] bg-[#9595a0] hover:bg-primary rounded-full cursor-col-resize transition-colors opacity-0 group-hover:opacity-100"
    onMouseDown={onMouseDown}
    onClick={(e) => e.stopPropagation()}
  />
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
  SortIconComponent,
  ResizeHandleComponent,
  DragIndicatorComponent,
  sortIconClassName,
  resizeHandleClassName,
  defaultMinResizeWidth,
  defaultMaxResizeWidth,
  classNames,
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
  SortIconComponent: React.ComponentType<SortIconProps>;
  ResizeHandleComponent: React.ComponentType<ResizeHandleProps>;
  DragIndicatorComponent?: React.ComponentType<DragIndicatorProps>;
  sortIconClassName?: string;
  resizeHandleClassName?: string;
  defaultMinResizeWidth?: number;
  defaultMaxResizeWidth?: number;
  classNames?: TableClassNames<T>;
}) {
  const { onResizeStart, newWidth } = useColumnResize({
    column,
    onResize: (width) => onResizeColumn(column.id, width),
    defaultMinWidth: defaultMinResizeWidth,
    defaultMaxWidth: defaultMaxResizeWidth,
  });

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-3 font-medium text-sm border-r last:border-r-0 relative group overflow-hidden",
        isDragging && "opacity-50",
        isDragOver && "bg-accent",
        classNames?.headerCell,
        isDragging && classNames?.headerCellDragging,
        isDragOver && classNames?.headerCellDragOver
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
      {DragIndicatorComponent && <DragIndicatorComponent isDragging={isDragging} />}

      <div className="flex-1 truncate min-w-0" title={typeof column.header === "string" ? column.header : undefined}>
        {typeof column.header === "function" ? column.header(column) : column.header}
      </div>

      {!!column.sortable && (
        <button
          onClick={() => onSort(column.field as string)}
          className={cn("hover:bg-accent rounded p-1 transition-colors shrink-0", sortIconClassName, classNames?.sortIcon)}
        >
          <SortIconComponent direction={sort?.sort || null} />
        </button>
      )}

      {!!column.resizable && (
        <div className={cn('opacity-0 group-hover:opacity-100 transition-all duration-300', resizeHandleClassName, classNames?.resizeHandle)}>
          <ResizeHandleComponent onMouseDown={onResizeStart} />
        </div>
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
  sortIcon: SortIconComponent = DefaultSortIcon,
  resizeHandle: ResizeHandleComponent = DefaultResizeHandle,
  dragIndicator: DragIndicatorComponent,
  sortIconClassName,
  resizeHandleClassName,
  defaultMinResizeWidth,
  defaultMaxResizeWidth,
  classNames,
}: SimplyTableHeaderProps<T>) {
  return (
    <div className={cn("flex border-b bg-muted/50 sticky top-0 z-10 backdrop-blur-sm", className, classNames?.header)}>
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
            SortIconComponent={SortIconComponent}
            ResizeHandleComponent={ResizeHandleComponent}
            DragIndicatorComponent={DragIndicatorComponent}
            sortIconClassName={sortIconClassName}
            resizeHandleClassName={resizeHandleClassName}
            defaultMinResizeWidth={defaultMinResizeWidth}
            defaultMaxResizeWidth={defaultMaxResizeWidth}
            classNames={classNames}
          />
        );
      })}
    </div>
  );
}
