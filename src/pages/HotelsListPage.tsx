import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import HotelsListItem from "../ui/HotelsListItem";
import StarRatingFilter from "../components/StarRatingFilter";
import { FaSearch } from "react-icons/fa";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import { useGetAllHotelIHotelsQuery } from "../redux/api/hotelApi";
interface Option {
  value: string;
  label: string;
}
function HotelsListPage() {
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSubmit, register } = useForm<{ search: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllHotelIHotelsQuery(searchParams.toString());

  const handleSortChange = (selectedOption: Option | null) => {
    const sort = selectedOption!.value;
    searchParams.set("sortBy", sort);
    setSearchParams(searchParams);
  };

  const onSearchHandler = handleSubmit((data: { search: string }) => {
    if (!data.search)
    {
      return navigate("/hotels");
    }

    searchParams.set("search", data.search);
    setSearchParams(searchParams);
  });

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
        <div className="-mt-6">
          {/* SEARCH */}
          <div className="flex w-full p-6">
            <section className="flex flex-1 items-center justify-between gap-x-6 gap-y-4 rounded bg-black/5 p-6">
              <div className="w-full">
                <Select
                  onChange={handleSortChange}
                  options={[
                    { label: "recent first", value: "newest" },
                    { label: "oldest first", value: "oldest" },
                    {
                      label: "average Rating: high first",
                      value: "avgRating-desc",
                    },
                    {
                      label: "average Rating: low first",
                      value: "avgRating-asc",
                    },
                    { label: "hotelStar: high first", value: "hotelStar-desc" },
                    { label: "hotelStar: low first", value: "hotelStar-asc" },
                    {
                      label: "min price per night: high first",
                      value: "minPricePerNight-desc",
                    },
                    {
                      label: "min price per night: low first",
                      value: "minPricePerNight-asc",
                    },
                    { label: "a-z", value: "a-z" },
                    { label: "z-a", value: "z-a" },
                  ]}
                  placeholder="sort hotels"
                />
              </div>

              <form
                className="group relative flex items-center justify-center"
                onSubmit={onSearchHandler}
              >
                <div className="flex flex-row rounded bg-slate-200 shadow-lg">
                  <input
                    type="search"
                    disabled={isLoading}
                    autoFocus
                    className="rounded bg-inherit px-6 py-2 focus:outline-none disabled:cursor-not-allowed"
                    placeholder="Search"
                    {...register("search")}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="-ml-12 rounded px-5 text-black/20 disabled:cursor-not-allowed"
                  >
                    <FaSearch className="size-5" />
                  </button>
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
          ) :

            error ? (
              <div className="mx-auto w-[69.5vw]">
                <div className="mx-auto flex min-h-screen w-full justify-center">
                  <div className="mt-5 p-4 lg:mt-12">
                    <h1 className="text-2xl text-center">Something went wrong</h1>
                  </div>
                </div>
              </div>

            )
              : !data?.data.hotels.length ? (
                <div className="mx-auto w-[69.5vw]">
                  <div className="mx-auto flex min-h-screen w-full justify-center">
                    <div className="mt-5 p-4 lg:mt-12">
                      <h1 className="text-xl text-center">No hotels found</h1>
                    </div>
                  </div>
                </div>
              ) :


                (
                  <section className="min-h-[100vh] rounded-md border-l-2 border-r-2 py-4 shadow-lg">
                    {data.data.hotels?.map((hotel, i) => (
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
