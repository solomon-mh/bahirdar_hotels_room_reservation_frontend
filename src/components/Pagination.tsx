import { useSearchParams } from "react-router-dom";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@radix-ui/react-select";

interface PaginationDemoProps {
    totalPages: number;
    page: number;
    onPageChange?: (page: number) => void;
}

export function CustomPagination({ totalPages, page }: PaginationDemoProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const onPageChange = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    }
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
                <Select
                    onValueChange={(value) => {
                        if (value)
                            searchParams.set("limit", value);
                        else
                            searchParams.delete("limit");
                        setSearchParams(searchParams);
                    }}
                >
                    <SelectTrigger value={page}>
                        {page}
                    </SelectTrigger>
                    <SelectContent>
                
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                </Select>
            </PaginationContent>
        </Pagination>
    );
}
