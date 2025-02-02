import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Search from "../../ui/Search";
import SortBy from "../../ui/SortBy";
import { useGetAllHotelsQuery } from "../../redux/api/hotelApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { GoDash } from "react-icons/go";

function AllHotels() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: { data: { hotels } = {} } = {}, isLoading, error } = useGetAllHotelsQuery("");

  const onSearchHandler = handleSubmit((data) => {
    if (!data?.search)
    {
      return navigate("/dashboard/hotels");
    }
    searchParams.set("search", data.search);
    setSearchParams(searchParams);
  });

  const handleStarsChange = (e: { preventDefault: () => void; target: { value: string; }; }) => {
    e.preventDefault();
    const star = e.target.value;
    searchParams.set("hotelStar", star);
    setSearchParams(searchParams);
  };

  const handleSortChange = (e: { preventDefault: () => void; target: { value: string; }; }) => {
    e.preventDefault();
    const sort = e.target.value;
    searchParams.set("sortBy", sort);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full bg-white h-[80vh] text-gray-600 shadow-md">
      <div className="flex items-center bg-slate-200/70 justify-between p-6">
        <h1 className="p-4 uppercase">
          <Link to="/dashboard/hotels">All Hotels</Link>
        </h1>

        {/* SEARCH  */}
        <Search
          isLoading={isLoading}
          onSearchHandler={onSearchHandler}
          register={register}
        />

        {/* FILTER */}

        <div className="flex items-center justify-between gap-2">
          {/* SORT BY HOTEL STAR */}
          <SortBy
            handleChange={handleStarsChange}
            options={[
              { label: "hotel star", value: "" },
              { label: "1 star", value: "1" },
              { label: "2 star", value: "2" },
              { label: "3 star", value: "3" },
              { label: "4 star", value: "4" },
              { label: "5 star", value: "5" },
            ]}
          />

          {/* OTHER SORTING   */}
          <SortBy
            handleChange={handleSortChange}
            options={[
              { label: "sort by", value: "" },
              {
                label: "price per night (high first)",
                value: "pricePerNight-desc",
              },
              {
                label: "price per night (low first)",
                value: "pricePerNight-asc",
              },
              { label: "avgRating (high first)", value: "avgRating-desc" },
              { label: "low avgRating (low first)", value: "avgRating-asc" },
              { label: "recent first", value: "newest" },
              { label: "oldest first", value: "oldest" },
              { label: "a-z", value: "a-z" },
              { label: "z-a", value: "z-a" },
            ]}
          />
        </div>

        <Link
          to={"/dashboard/add-hotel"}
          className="mr-2 cursor-pointer rounded-md text-slate-100 bg-accent-500 px-4 py-[6px] text-lg text-white transition-all duration-200 hover:scale-105"
        >
          Add Hotel
        </Link>
      </div>

      <div className="flex w-full px-4 h-full bg-slate-200/50">
        {
          isLoading
            ?
            (
              <LoadingPage />
            )
            :
            error
              ?
              <NotFoundPage>
                <pre>
                  {
                    JSON.stringify(error, null, 2)
                  }
                </pre>
              </NotFoundPage>
              :
              !hotels?.length
                ?
                <NotFoundPage>
                  <span>Hotels not found</span>
                </NotFoundPage>
                :
                <Table>
                  <TableHeader className=" bg-slate-200/60">
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>HotelRating</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Rooms</TableHead>
                    <TableHead>price / night</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>AvgRatings</TableHead>
                    <TableHead>Facilities</TableHead>
                    <TableHead>Action</TableHead>
                  </TableHeader>
                  <TableBody>
                    {
                      hotels.map(hotel => (
                        <TableRow>
                          <TableCell>
                            <img
                              className="h-10 w-full object-cover"
                              src={hotel.imageCover}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{hotel.name}</TableCell>
                          <TableCell>{`${hotel.hotelStar} ⭐ Hotel`}</TableCell>
                          <TableCell>{hotel.address.city}</TableCell>
                          <TableCell>
                            {hotel.numOfRooms > 0 ? `${hotel.numOfRooms} Rooms` : <GoDash />}
                          </TableCell>
                          <TableCell className="flex">
                            {hotel.minPricePerNight || <GoDash className="" />}
                          </TableCell>
                          <TableCell>
                            {/* NOTE: NUM OF RATINGS IS ALSO EQUAL TO NUM OF REVIEWS IN OUR CASE */}
                            {hotel.numOfRatings > 0
                              ? `${hotel.numOfRatings} Reviews`
                              : "0 Reviews"}
                          </TableCell>
                          <TableCell>{hotel.avgRating} ⭐</TableCell>
                          <TableCell className="flex">
                            {hotel.facilities && hotel.facilities.slice(0, 3).join(", ")}
                          </TableCell>
                          <TableCell className="">
                            <Link
                              to={`/dashboard/hotels/${hotel._id}`}
                              className="rounded text-slate-100 bg-accent-500 p-2 font-semibold text-white"
                            >
                              Details
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>

        }
      </div>
    </div>
  );
}

export default AllHotels;
