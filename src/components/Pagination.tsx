import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface PaginationDemoProps {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
}

export function CustomPagination({ totalPages, page, onPageChange }: PaginationDemoProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {page > 1 && (
                        <PaginationPrevious
                            href="#"
                            onClick={() => onPageChange(Math.max(1, page - 1))}
                        />
                    )}
                </PaginationItem>
                {pages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            href="#"
                            isActive={p === page}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {totalPages > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
