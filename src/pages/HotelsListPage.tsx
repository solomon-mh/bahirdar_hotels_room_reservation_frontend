import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import HotelsListItem from "../ui/HotelsListItem";
import StarRatingFilter from "../components/StarRatingFilter";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import { useGetAllHotelsQuery } from "../redux/api/hotelApi";
import { createLabel } from "../utils/text";
import { HotelSortEnum } from "../enums/hotelSortEnum";
interface Option {
  value: string;
  label: string;
}
function HotelsListPage() {
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearch)
    {
      searchParams.set("search", debouncedSearch);
      setSearchParams(searchParams);
    }
    else
    {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  const { data, error, isLoading } = useGetAllHotelsQuery(searchParams.toString());

  const sortOptions = Object.values(HotelSortEnum).map((sort) => ({
    value: sort,
    label: createLabel(sort),
  }));
  const handleSortChange = (newValue: MultiValue<Option>) => {
    const sort = newValue.map((option: { value: unknown; }) => option.value).join(',');
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  };



  const handleStarsChange = (e: { target: { value: string; checked: boolean; }; }) => {
    const starRating = e.target.value;

    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating),
    );
  };

  return (
    <div className=" relative flex flex-row w-screen px-4 md:px-16 ">
        {/* filter/sort */}
      <div className="sticky h-[80vh] top-4 p-2 shadow-md shadow-accent-100 ">
        <div className="flex flex-col items-center justify-center gap-6 space-y-8 ">
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />
          </div>
      </div>
      <div className="-mt-6 w-[80%]">
          {/* SEARCH */}
        <div className="flex w-full px-0 p-6">
            <section className="flex flex-1 items-center justify-between gap-x-6 gap-y-4 rounded bg-black/5 p-6">
              <div className="w-full">
                <Select
                onChange={handleSortChange}
                isMulti
                options={sortOptions}
                  placeholder="sort hotels"
                />
              </div>

              <form
              className="group relative flex items-center justify-center"
              >
                <div className="flex flex-row rounded bg-slate-200 shadow-lg">
                  <input
                    type="search"
                  disabled={isLoading}
                  onChange={(e) => setSearchInput(e.target.value)}
                    autoFocus
                    className="rounded bg-inherit px-6 py-2 focus:outline-none disabled:cursor-not-allowed"
                  placeholder="Search"
                />
                </div>
              </form>
            </section>
          </div>
          <div className="flex w-full gap-4 px-6">
            {/* hotel cards */}
            {isLoading ? (
              <div className="mx-auto w-[69.5vw]">
                <div className="mx-auto flex min-h-screen w-full justify-center">
                  <div className="mt-5 p-4 lg:mt-12">
                    <LoadingSkeleton className="h-3 w-[10rem]" />
                    <LoadingSkeleton className="h-3 w-[30rem]" />
                    <LoadingSkeleton className="h-3 w-[20rem]" />
                    <LoadingSkeleton className="h-3 w-[15rem]" />
                    <LoadingSkeleton className="h-3 w-[25rem]" />
                    <LoadingSkeleton className="h-3 w-[10rem]" />
                  </div>
                </div>
              </div>
          )
            :

            error ? (
              <div className="mx-auto w-[69.5vw]">
                <div className="mx-auto flex min-h-screen w-full justify-center">
                  <div className="mt-5 p-4 lg:mt-12">
                    <h1 className="text-2xl text-red-400 text-center">Something went wrong</h1>
                  </div>
                </div>
              </div>

            )
              :
              !data?.data.length
                ?
                (
                <div className="mx-auto w-[69.5vw]">
                  <div className="mx-auto flex min-h-screen w-full justify-center">
                    <div className="mt-5 p-4 lg:mt-12">
                      <h1 className="text-xl text-center">No hotels found</h1>
                    </div>
                  </div>
                </div>
              ) :


                (
                <section className="min-h-[100vh] w-full rounded-md border-l-2 border-r-2 py-4 shadow-lg">
                    {data.data?.map((hotel, i) => (
                      <HotelsListItem hotel={hotel} key={i} />
                    ))}
                  </section>
                )}
        </div>
      </div>

    </div>
  );
}

export default HotelsListPage;
