import { Link, useSearchParams } from "react-router-dom";
import Search from "../../ui/Search";
import SortBy from "../../ui/SortBy";
import { hotelApi, HotelTags, useGetAllHotelsQuery } from "../../redux/api/hotelApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { GoDash } from "react-icons/go";
import { HotelSortEnum } from "../../enums/hotelSortEnum";
import { createLabel } from "../../utils/text";
import { useEffect } from "react";

function AllHotels() {

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: { data: hotels } = {}, isLoading, error } = useGetAllHotelsQuery(searchParams.toString());


  useEffect(() => {
    if (searchParams)
    {
      hotelApi.util.invalidateTags([HotelTags.HOTELS]);
    }
  }, [searchParams])
  const sortOptions = Object.values(HotelSortEnum)

  const handleStarsChange = (e: { preventDefault: () => void; target: { value: string; }; }) => {
    e.preventDefault();
    const star = e.target.value;
    searchParams.set("hotelStar", star);
    setSearchParams(searchParams);
  };

  const handleSortChange = (e: { preventDefault: () => void; target: { value: string; }; }) => {
    e.preventDefault();
    const sort = e.target.value;
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full bg-white h-[80vh]  text-gray-600 shadow-md">
      <div className="flex items-center  justify-between p-6">
        <h1 className="p-4 uppercase">
          <Link to="/dashboard/hotels">All Hotels</Link>
        </h1>

        {/* SEARCH  */}
        <Search />

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
            options={sortOptions.map((sort) => ({
              label: createLabel(sort),
              value: sort,
            }))}
          />
        </div>

        <Link
          to={"/dashboard/add-hotel"}
          className="mr-2 cursor-pointer rounded-md text-slate-100 bg-accent-500 px-4 py-[6px] text-lg text-white transition-all duration-200 hover:scale-105"
        >
          Add Hotel
        </Link>
      </div>

      <div className="flex w-full shadow-md  px-4 h-fit max-[80vh] ">
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
                <Table className="shadow-md">
                  <TableHeader className="shadow-md border py-2">
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
                          <TableCell >
                            {hotel.minPricePerNight || <GoDash className="" />}
                          </TableCell>
                          <TableCell>
                            {/* NOTE: NUM OF RATINGS IS ALSO EQUAL TO NUM OF REVIEWS IN OUR CASE */}
                            {hotel.numOfRatings > 0
                              ? `${hotel.numOfRatings} Reviews`
                              : "0 Reviews"}
                          </TableCell>
                          <TableCell>{hotel.avgRating} ⭐</TableCell>
                          <TableCell >
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
