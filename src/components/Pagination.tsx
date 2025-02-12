import { useSearchParams } from "react-router-dom";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
        <div className="flex items-center gap-4 justify-start">
        <Pagination>
            <PaginationContent>
                    {
                        page - 1 > 0 && (
                            <PaginationItem className="cursor-pointer">
                                {page > 1 && (
                                    <PaginationPrevious
                                        onClick={() => onPageChange(Math.max(1, page - 1))}
                                    />
                                )}
                            </PaginationItem>
                        )
                    }
                {pages.map((p) => (
                    <PaginationItem className="cursor-pointer" key={p}>
                        <PaginationLink
                            isActive={p === page}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                    {totalPages > 3 &&
                        <PaginationItem
                            className="cursor-pointer"
                        >
                            <PaginationEllipsis />
                        </PaginationItem>
                    }
                    {
                        totalPages > page + 1 && (
                            <PaginationItem className="cursor-pointer">
                                <PaginationNext

                                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                                />
                            </PaginationItem>)
                    }
                </PaginationContent>
            </Pagination>
            <div className="w-full flex flex-row gap-3 items-center  ">
                <label className="block text-sm font-medium text-gray-700">Items per page</label>
                <div className="" >
                    <span className="text-gray-700 text-sm">Showing 1-{page} of {totalPages}</span>
                </div>
                <Select
                    onValueChange={(value) => {
                        if (value)
                        {
                            searchParams.set("limit", value);
                            searchParams.set("page", "1");
                        }
                        else
                            searchParams.delete("limit");
                        setSearchParams(searchParams);
                    }}

                >
                    <SelectTrigger className="w-32">
                        <SelectValue className="p-2 rounded-lg text-slate-800 bg-gray-100" />
                    </SelectTrigger>
                    <SelectContent className="z-[4000] w-32">
                        <SelectGroup>
                            {[2, 5, 10, 25, 50, 100].map((limit) => (
                                <SelectItem key={limit} value={limit.toString()}>{limit}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
