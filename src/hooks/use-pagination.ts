import { useState, useCallback, useMemo } from "react";

export function usePagination<T>(
  rows: T[],
  paginationMode: "client" | "server" = "client",
  initialPage: number = 0,
  initialPageSize: number = 10,
  totalRows?: number,
  onPageChange?: (page: number) => void,
  onPageSizeChange?: (pageSize: number) => void
) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      onPageChange?.(newPage);
    },
    [onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setPage(0);
      onPageSizeChange?.(newPageSize);
    },
    [onPageSizeChange]
  );

  const paginatedRows = useMemo(() => {
    if (paginationMode === "server") {
      return rows;
    }

    const start = page * pageSize;
    const end = start + pageSize;
    return rows.slice(start, end);
  }, [rows, page, pageSize, paginationMode]);

  const totalPages = Math.ceil((totalRows || rows.length) / pageSize);

  return {
    paginatedRows,
    page,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  };
}
