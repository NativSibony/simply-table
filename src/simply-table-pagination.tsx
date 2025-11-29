import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import styles from "./styles/table.module.css";

interface SimplyTablePaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
}

export type { SimplyTablePaginationProps };

export function SimplyTablePagination({
  page,
  pageSize,
  totalPages,
  totalRows,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  className,
}: SimplyTablePaginationProps) {
  const startRow = page * pageSize + 1;
  const endRow = Math.min((page + 1) * pageSize, totalRows);

  return (
    <div className={cn(styles.pagination, className)}>
      <div className={styles.paginationInfo}>
        <span>Rows per page:</span>
        <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger style={{ height: '2rem', width: '4rem' }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={styles.paginationControls}>
        <span className={styles.paginationText}>
          {startRow}-{endRow} of {totalRows}
        </span>

        <div className={styles.paginationButtons}>
          <Button
            variant="outline"
            size="icon"
            style={{ height: '2rem', width: '2rem' }}
            onClick={() => onPageChange(0)}
            disabled={page === 0}
          >
            <ChevronsLeft style={{ height: '1rem', width: '1rem' }} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            style={{ height: '2rem', width: '2rem' }}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
          </Button>
          <span style={{ fontSize: '0.875rem', padding: '0 0.5rem' }}>
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            style={{ height: '2rem', width: '2rem' }}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages - 1}
          >
            <ChevronRight style={{ height: '1rem', width: '1rem' }} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            style={{ height: '2rem', width: '2rem' }}
            onClick={() => onPageChange(totalPages - 1)}
            disabled={page >= totalPages - 1}
          >
            <ChevronsRight style={{ height: '1rem', width: '1rem' }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
