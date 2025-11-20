import { useMemo, useRef, useState } from "react";
import { SimplyTableProps } from "./types";
import { SimplyTableHeader } from "./simply-table-header";
import { SimplyTableRow } from "./simply-table-row";
import { SimplyTablePagination } from "./simply-table-pagination";
import { useColumnReorder } from "./hooks/use-column-reorder";
import { useSorting } from "./hooks/use-sorting";
import { useFiltering } from "./hooks/use-filtering";
import { usePagination } from "./hooks/use-pagination";
import { useVirtualization } from "./hooks/use-virtualization";
import { cn } from "@/lib/utils";

export function SimplyTable<T = any>({
  columns: initialColumns,
  rows: initialRows,
  rowKey,
  enableVirtualization = false,
  rowHeight = 48,
  overscanCount = 5,
  sortMode = "client",
  sortModel: externalSortModel,
  onSortChange,
  filterMode = "client",
  filterModel: externalFilterModel,
  onFilterChange,
  enablePagination = false,
  paginationMode = "client",
  page: externalPage,
  pageSize: externalPageSize = 10,
  totalRows: externalTotalRows,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  paginationComponent: PaginationComponent = SimplyTablePagination,
  paginationClassName,
  onColumnReorder,
  onColumnResize,
  defaultMinResizeWidth = 50,
  defaultMaxResizeWidth = 800,
  rowRenderer,
  sortIcon,
  resizeHandle,
  dragIndicator,
  className,
  headerClassName,
  rowClassName,
  cellClassName,
  sortIconClassName,
  resizeHandleClassName,
  classNames,
  loading,
  noRowsOverlay,
}: SimplyTableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const [containerHeight] = useState(600);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    initialColumns.forEach((col) => {
      widths[col.id] = col.width || 150;
    });
    return widths;
  });

  const columns = useMemo(() => {
    return initialColumns.map((col) => ({
      ...col,
      width: columnWidths[col.id] || col.width || 150,
    }));
  }, [initialColumns, columnWidths]);

  // Column reorder
  const {
    columns: reorderedColumns,
    draggedColumn,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useColumnReorder(columns, onColumnReorder);

  // Filtering
  const { filteredRows } = useFiltering(
    initialRows,
    reorderedColumns,
    filterMode,
    externalFilterModel,
    onFilterChange
  );

  // Sorting
  const { sortedRows, sortModel, handleSort } = useSorting(
    filteredRows,
    reorderedColumns,
    sortMode,
    externalSortModel,
    onSortChange
  );

  // Pagination (only if enabled)
  const { paginatedRows, page, pageSize, totalPages, handlePageChange, handlePageSizeChange } = usePagination(
    sortedRows,
    enablePagination ? paginationMode : 'client',
    externalPage,
    externalPageSize,
    externalTotalRows,
    onPageChange,
    onPageSizeChange
  );

  // Use sorted rows directly if pagination is disabled
  const displayData = enablePagination ? paginatedRows : sortedRows;

  // Virtualization
  const { virtualRows, totalHeight, offsetY, handleScroll, scrollRef } = useVirtualization({
    totalRows: displayData.length,
    rowHeight,
    containerHeight,
    overscanCount,
  });

  // Sync horizontal scroll between header and body
  const handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (enableVirtualization) {
      handleScroll(e);
    }
    // Sync horizontal scroll to header
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleResizeColumn = (columnId: string, newWidth: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: newWidth,
    }));

    if (onColumnResize) {
      onColumnResize(columnId, newWidth);
    }
  };

  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }
    if (rowKey) {
      return row[rowKey] as string | number;
    }
    return index;
  };

  const displayRows = enableVirtualization
    ? virtualRows.map((index) => ({ row: displayData[index], index }))
    : displayData.map((row, index) => ({ row, index }));

  return (
    <div className={cn("flex flex-col border rounded-lg bg-card", className, classNames?.root)}>
      {/* Header - sticky, outside scroll container */}
      <div
        ref={headerScrollRef}
        className="overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="min-w-max">
        <SimplyTableHeader
          columns={reorderedColumns}
          sortModel={sortModel}
          onSort={handleSort}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onResizeColumn={handleResizeColumn}
          draggedColumn={draggedColumn}
          dragOverColumn={dragOverColumn}
          className={headerClassName}
          classNames={classNames}
          sortIcon={sortIcon}
          resizeHandle={resizeHandle}
          dragIndicator={dragIndicator}
          sortIconClassName={sortIconClassName}
          resizeHandleClassName={resizeHandleClassName}
          defaultMinResizeWidth={defaultMinResizeWidth}
          defaultMaxResizeWidth={defaultMaxResizeWidth}
          />
        </div>
      </div>

      {/* Body - scrollable container */}
      <div
        className={cn("flex-1 overflow-auto", classNames?.container)}
        ref={enableVirtualization ? scrollRef : bodyScrollRef}
        onScroll={handleBodyScroll}
      >
        <div className="min-w-max">
          <div ref={containerRef} className={cn("relative min-h-0", classNames?.body)}>
            {loading && (
              <div className={cn("absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-20", classNames?.loadingOverlay)}>
                <div className={cn("w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin", classNames?.loadingSpinner)} />
              </div>
            )}

            {!loading && displayData.length === 0 && (
              <div className={cn("flex items-center justify-center py-12 text-muted-foreground", classNames?.emptyState)}>
                {noRowsOverlay || "No rows to display"}
              </div>
            )}

            {enableVirtualization && displayData.length > 0 && (
              <div style={{ height: totalHeight, position: "relative" }}>
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                  {displayRows.map(({ row, index }) => {
                    if (!row) return null;

                    const cells = (
                      <SimplyTableRow
                        key={getRowKey(row, index)}
                        row={row}
                        rowIndex={index}
                        columns={reorderedColumns}
                        isEven={index % 2 === 0}
                        cellClassName={cellClassName}
                        rowClassName={rowClassName}
                        columnWidths={columnWidths}
                        classNames={classNames}
                      />
                    );

                    if (rowRenderer) {
                      return rowRenderer({
                        row,
                        rowIndex: index,
                        cells,
                        isEven: index % 2 === 0,
                      });
                    }

                    return cells;
                  })}
                </div>
              </div>
            )}

            {!enableVirtualization && displayData.length > 0 && (
              <div>
                {displayRows.map(({ row, index }) => {
                  if (!row) return null;

                  const cells = (
                    <SimplyTableRow
                      key={getRowKey(row, index)}
                      row={row}
                      rowIndex={index}
                      columns={reorderedColumns}
                      isEven={index % 2 === 0}
                      cellClassName={cellClassName}
                      rowClassName={rowClassName}
                      columnWidths={columnWidths}
                      classNames={classNames}
                    />
                  );

                  if (rowRenderer) {
                    return rowRenderer({
                      row,
                      rowIndex: index,
                      cells,
                      isEven: index % 2 === 0,
                    });
                  }

                  return cells;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {enablePagination && (
        <PaginationComponent
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRows={externalTotalRows || sortedRows.length}
          pageSizeOptions={pageSizeOptions}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          className={cn(paginationClassName, classNames?.pagination)}
        />
      )}
    </div>
  );
}
