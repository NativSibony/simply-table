import { useMemo, useRef, useState, useEffect } from "react";
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
import styles from "./styles/table.module.css";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const [containerHeight] = useState(600);
  const [containerWidth, setContainerWidth] = useState(0);
  const isScrollingSyncRef = useRef(false);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    initialColumns.forEach((col) => {
      widths[col.id] = col.width || 150;
    });
    return widths;
  });

  // Update container width on mount and resize
  useEffect(() => {
    const updateContainerWidth = () => {
      if (rootRef.current) {
        setContainerWidth(rootRef.current.offsetWidth);
      }
    };

    updateContainerWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateContainerWidth();
    });

    if (rootRef.current) {
      resizeObserver.observe(rootRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const columns = useMemo(() => {
    return initialColumns.map((col) => ({
      ...col,
      width: columnWidths[col.id] || col.width || 150,
    }));
  }, [initialColumns, columnWidths]);

  // Calculate total width for scroll detection
  const totalColumnsWidth = useMemo(() => {
    return columns.reduce((sum, col) => sum + (col.width || 150), 0);
  }, [columns]);

  const needsHorizontalScroll = useMemo(() => {
    if (containerWidth === 0) return false;
    return totalColumnsWidth > containerWidth;
  }, [totalColumnsWidth, containerWidth]);

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
    if (isScrollingSyncRef.current) return;
    
    if (enableVirtualization) {
      handleScroll(e);
    }
    
    // Sync horizontal scroll to header
    if (headerScrollRef.current) {
      isScrollingSyncRef.current = true;
      headerScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
      requestAnimationFrame(() => {
        isScrollingSyncRef.current = false;
      });
    }
  };

  const handleHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isScrollingSyncRef.current) return;
    
    // Sync horizontal scroll to body
    const bodyRef = enableVirtualization ? scrollRef.current : bodyScrollRef.current;
    if (bodyRef) {
      isScrollingSyncRef.current = true;
      bodyRef.scrollLeft = e.currentTarget.scrollLeft;
      requestAnimationFrame(() => {
        isScrollingSyncRef.current = false;
      });
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
    <div ref={rootRef} className={cn(styles.root, className, classNames?.root)}>
      {/* Header - sticky, outside scroll container */}
      <div
        ref={headerScrollRef}
        onScroll={handleHeaderScroll}
        style={{
          overflowX: needsHorizontalScroll ? 'auto' : 'hidden',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div style={{ minWidth: needsHorizontalScroll ? 'max-content' : '100%' }}>
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
        className={cn(styles.container, classNames?.container)}
        ref={enableVirtualization ? scrollRef : bodyScrollRef}
        onScroll={handleBodyScroll}
        style={{
          flex: 1,
          overflowX: needsHorizontalScroll ? 'auto' : 'hidden',
          overflowY: 'auto'
        }}
      >
        <div style={{ minWidth: needsHorizontalScroll ? 'max-content' : '100%' }}>
          <div ref={containerRef} className={cn(styles.body, classNames?.body)}>
            {loading && (
              <div className={cn(styles.loadingOverlay, classNames?.loadingOverlay)}>
                <div className={cn(styles.loadingSpinner, classNames?.loadingSpinner)} />
              </div>
            )}

            {!loading && displayData.length === 0 && (
              <div className={cn(styles.emptyState, classNames?.emptyState)}>
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
