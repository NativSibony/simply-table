import { Column, SortModel, SortIconProps, ResizeHandleProps, DragIndicatorProps, TableClassNames } from "./types";
import { useColumnResize } from "./hooks/use-column-resize";
import { cn } from "@/lib/utils";
import styles from "./styles/table.module.css";

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
      <svg className={styles.sortIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  if (direction === 'desc') {
    return (
      <svg className={styles.sortIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  return (
    <svg className={cn(styles.sortIconSvg, styles.sortIconInactive)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    className={styles.resizeHandle}
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
  const { onResizeStart } = useColumnResize({
    column,
    onResize: (width) => onResizeColumn(column.id, width),
    defaultMinWidth: defaultMinResizeWidth,
    defaultMaxWidth: defaultMaxResizeWidth,
  });

  const width = column.width || 150;

  return (
    <div
      className={cn(
        styles.headerCell,
        isDragging && styles.headerCellDragging,
        isDragOver && styles.headerCellDragOver,
        classNames?.headerCell,
        isDragging && classNames?.headerCellDragging,
        isDragOver && classNames?.headerCellDragOver
      )}
      style={{
        width: `${width}px`,
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

      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }} title={typeof column.header === "string" ? column.header : undefined}>
        {typeof column.header === "function" ? column.header(column) : column.header}
      </div>

      {!!column.sortable && (
        <button
          onClick={() => onSort(column.field as string)}
          className={cn(styles.sortIcon, sortIconClassName, classNames?.sortIcon)}
        >
          <SortIconComponent direction={sort?.sort || null} />
        </button>
      )}

      {!!column.resizable && (
        <div className={cn(resizeHandleClassName, classNames?.resizeHandle)}>
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
    <div className={cn(styles.header, className, classNames?.header)}>
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