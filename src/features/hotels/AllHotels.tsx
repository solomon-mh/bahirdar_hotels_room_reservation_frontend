import { Link, useSearchParams } from "react-router-dom";
import Search from "../../ui/Search";
import { hotelApi, HotelTags, useGetAllHotelsQuery } from "../../redux/api/hotelApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { GoDash } from "react-icons/go";
import { useEffect } from "react";
import AllHotelsNavBar from "./NavBar";

function AllHotels() {

  const [searchParams] = useSearchParams();

  const { data: { data: hotels } = {}, isLoading, error } = useGetAllHotelsQuery(searchParams.toString());


  useEffect(() => {
    if (searchParams)
    {
      hotelApi.util.invalidateTags([HotelTags.HOTELS]);
    }
  }, [searchParams])



  return (
    <div className="w-full bg-white h-[80vh] text-gray-600 shadow-md">
      {/* Header Section */}
      <div className="relative flex gap-2 items-center justify-between p-3 md:p-6">
        <h1 className="p-4 hidden md:inline text-sm md:text-base uppercase">
          <Link to="/dashboard/hotels">All Hotels</Link>
        </h1>

        {/* Search */}
        <Search />

        {/* Filter Section */}
        <AllHotelsNavBar />
      </div>

      {/* Hotels Table Section */}
      <div className="flex w-full shadow-md px-4 h-fit max-[80vh]">
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <NotFoundPage>
              <pre>
                {JSON.stringify(error, null, 2)}
              </pre>
            </NotFoundPage>
          ) : !hotels?.length ? (
            <NotFoundPage>
              <span>Hotels not found</span>
            </NotFoundPage>
            ) : (
              <Table className="shadow-md">
                <TableHeader className="shadow-md border py-2">
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>HotelRating</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Rooms</TableHead>
                    <TableHead>Price / Night</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>AvgRatings</TableHead>
                    <TableHead>Facilities</TableHead>
                    <TableHead>Action</TableHead>
                  </TableHeader>
                  <TableBody>
                    {hotels.map((hotel) => (
                      <TableRow key={hotel._id}>
                        <TableCell>
                          <img
                            className="h-10 w-full object-cover"
                            src={hotel.imageCover}
                            alt="Hotel"
                          />
                        </TableCell>
                        <TableCell>{hotel.name}</TableCell>
                        <TableCell>{`${hotel.hotelStar} ⭐ Hotel`}</TableCell>
                        <TableCell>{hotel.address.city}</TableCell>
                        <TableCell>
                          {hotel.numOfRooms > 0 ? `${hotel.numOfRooms} Rooms` : <GoDash />}
                        </TableCell>
                        <TableCell>{hotel.minPricePerNight || <GoDash />}</TableCell>
                        <TableCell>
                          {hotel.numOfRatings > 0
                            ? `${hotel.numOfRatings} Reviews`
                            : "0 Reviews"}
                        </TableCell>
                        <TableCell>{hotel.avgRating} ⭐</TableCell>
                        <TableCell>
                          {hotel.facilities && hotel.facilities.slice(0, 3).join(", ")}
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/dashboard/hotels/${hotel._id}`}
                            className="rounded  bg-accent-500 p-2 font-semibold text-white"
                          >
                            Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
        )}
      </div>
    </div>
  );
}

export default AllHotels;
