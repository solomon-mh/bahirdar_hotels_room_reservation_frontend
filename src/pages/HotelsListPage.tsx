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

  const handleStarsChange = (e: { target: { value: string; checked: boolean } }) => {
    const starRating = e.target.value;

    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );

    const updatedStars = e.target.checked
      ? [...selectedStars, starRating]
      : selectedStars.filter((star) => star !== starRating);

    searchParams.delete('hotelStar');
    updatedStars.forEach((star) => {
      searchParams.append('hotelStar', star);
    });
    setSearchParams(searchParams);
  };


  return (
    <div className="relative flex flex-col md:flex-row w-screen px-4 md:px-16">
      {/* Filter/Sort Sidebar */}
      <div className="sticky top-0 z-10 w-full md:w-auto md:top-4 md:h-[80vh] p-2 bg-white shadow-md shadow-accent-100">
        <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-6">
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
        </div>
      </div>

      {/* Main Content */}
      <div className=" md:mt-0 w-full md:w-[80%]">
        {/* Search & Sort */}
        <div className="flex w-full px-0 md:px-4  py-4 md:py-6">
          <section className="flex flex-1  flex-col md:flex-row items-stretch md:items-center justify-between gap-x-6 gap-y-4 rounded bg-black/5 p-6">
            <div className="w-full">
              <Select
                onChange={handleSortChange}
                isMulti
                options={sortOptions}
                placeholder="sort hotels"
              />
            </div>

            <div className="flex  flex-row rounded bg-slate-200 shadow-lg">
              <input
                type="search"
                  disabled={isLoading}
                  onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
                className="rounded w-full bg-inherit px-6 py-2 focus:outline-none disabled:cursor-not-allowed"
                  placeholder="Search"
                />
            </div>
          </section>
        </div>

        {/* Hotel Listings */}
        <div className="flex flex-col w-full gap-4 p-4">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <LoadingSkeleton className="h-3 w-[10rem]" />
              <LoadingSkeleton className="h-3 w-[30rem]" />
              <LoadingSkeleton className="h-3 w-[20rem]" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <h1 className="text-2xl text-red-400 text-center">Something went wrong</h1>
            </div>
            ) : !data?.data.length ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <h1 className="text-xl text-center">No hotels found</h1>
              </div>
          ) : (
            <section className="w-full rounded-md border border-gray-300 bg-white shadow-lg">
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
