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
      <svg className="st-w-4 st-h-4 st-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  if (direction === 'desc') {
    return (
      <svg className="st-w-4 st-h-4 st-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  return (
    <svg className="st-w-4 st-h-4 st-shrink-0 st-opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    className="st-absolute st-right-1 st-top-1/2 st--translate-y-1/2 st-w-0.5 st-h-3.5 dark:st-bg-[#babacd] st-bg-[#9595a0] hover:st-bg-primary st-rounded-full st-cursor-col-resize st-transition-colors st-opacity-0 group-hover:st-opacity-100"
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
        "st-flex st-items-center st-gap-2 st-px-4 st-py-3 st-font-medium st-text-sm st-border-r last:st-border-r-0 st-relative st-group st-overflow-hidden",
        isDragging && "st-opacity-50",
        isDragOver && "st-bg-accent",
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

      <div className="st-flex-1 st-truncate st-min-w-0" title={typeof column.header === "string" ? column.header : undefined}>
        {typeof column.header === "function" ? column.header(column) : column.header}
      </div>

      {!!column.sortable && (
        <button
          onClick={() => onSort(column.field as string)}
          className={cn("hover:st-bg-accent st-rounded st-p-1 st-transition-colors st-shrink-0", sortIconClassName, classNames?.sortIcon)}
        >
          <SortIconComponent direction={sort?.sort || null} />
        </button>
      )}

      {!!column.resizable && (
        <div className={cn('st-opacity-0 group-hover:st-opacity-100 st-transition-all st-duration-300', resizeHandleClassName, classNames?.resizeHandle)}>
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
    <div className={cn("st-flex st-border-b st-bg-muted/50 st-sticky st-top-0 st-z-10 st-backdrop-blur-sm", className, classNames?.header)}>
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
