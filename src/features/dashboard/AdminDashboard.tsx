import HotelCard from "../hotels/HotelCard";
import { Link } from "react-router-dom";
import RecentUsers from "../users/RecentUsers";
import BookingPieChart from "../stats/BookingPieChart";
import AreaChartBox from "../stats/AreaChartBox";
import BarChartBox from "../stats/BarChartBox";
import LineChartBox from "../stats/LineChartBox";
import {
  barChartBookingData,
  barChartBoxVisit,
  bookingRevenueData,
  hotelUserBookingMonthlyStatusData,
  lineChartData,
} from "../../data/stat-data";
import { useGetAllHotelsQuery } from "@/redux/api/hotelApi";
import LoadingPage from "@/pages/utils/LoadingPage";
import NotFoundPage from "@/pages/utils/NotFoundPage";

function AdminDashboard() {
  const {
    data: { data: hotels } = {},
    isLoading,
    error,
  } = useGetAllHotelsQuery("");
  console.log(hotels);

  const { numUsers = 23, numBookings = 38, numReviews = 123 } = {};

  const countData = [
    {
      title: "Hotels",
      number: hotels?.length ?? 0,
      Icon: <img src="/icons/hotels.png" alt="hotels" className="h-16 w-16" />,
    },
    {
      title: "Users",
      number: numUsers,
      Icon: (
        <img src="/icons/customers.png" alt="users" className="h-16 w-16" />
      ),
    },
    {
      title: "Bookings",
      number: numBookings,
      Icon: (
        <img src="/icons/bookings.png" alt="bookings" className="h-16 w-16" />
      ),
    },
    {
      title: "Reviews",
      number: numReviews,
      Icon: (
        <img src="/icons/reviews1.png" alt="reviews" className="h-16 w-16" />
      ),
    },
  ];

  return (
    <div className="w-full">
      <section className="m-3 mb-8 grid grid-cols-1 justify-between gap-4 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
        {countData.map(({ title, Icon, number }, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-between rounded p-4 text-slate-800 shadow-xl md:px-6"
          >
            {Icon}
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-xl font-semibold text-accent-500 md:text-2xl">
                {number}
              </span>
              <h3 className="text-sm italic">{title}</h3>
            </div>
          </div>
        ))}
      </section>

      <section className="m-3 my-6 flex w-full flex-col justify-between bg-white p-4">
        <RecentUsers />
      </section>

      <section className="m-3 my-6 flex h-[500px] justify-between bg-white p-8">
        <BookingPieChart />
        <AreaChartBox
          title="Monthly Registered Number of Hotels and Users "
          data={hotelUserBookingMonthlyStatusData}
          dataKeys={["users", "hotels"]}
          colors={["#160ce4", "#15c458"]}
        />
      </section>

      <section className="flex justify-between">
        <div className="m-3 my-6 h-96 w-full bg-white p-6 py-6">
          <BarChartBox data={barChartBoxVisit} />
        </div>
        <div className="m-3 my-6 h-96 w-full bg-white p-6 py-6">
          <BarChartBox data={barChartBookingData} />
        </div>
      </section>
      <section className="m-3 my-6 flex h-[500px] bg-white p-6">
        <AreaChartBox
          title="All Hotels Revenue Analysis"
          data={bookingRevenueData}
          dataKeys={["revenue"]}
          colors={["#15c458"]}
        />
      </section>
      <section className="mx-3 my-6 flex h-[400px] bg-white p-6">
        <LineChartBox data={lineChartData} />
      </section>
      <section className="my-6 flex flex-col">
        <div className="flex justify-between bg-white p-4">
          <h2 className="text-2xl font-bold uppercase">
            Recently added Hotels
          </h2>
          <Link
            to="/dashboard/hotels"
            className="flex items-center rounded-md bg-accent-500/95 px-2 py-1 text-sm text-white transition-all duration-200 hover:scale-105 hover:bg-accent-500"
          >
            See more &gt;&gt;
          </Link>
        </div>
        <div className="relative grid md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <LoadingPage />
          ) : error ? (
            <NotFoundPage>
              <h1 className="text-center text-2xl font-semibold text-gray-500">
                {(error as { data: { message: string } }).data.message ||
                  "Failed to fetch data"}
              </h1>
            </NotFoundPage>
          ) : !hotels?.length ? (
            <NotFoundPage>
              <span>Hotels not found</span>
            </NotFoundPage>
          ) : (
            (hotels.length > 4 ? hotels.slice(0, 4) : hotels).map(
              (hotel, i) => (
                <HotelCard
                  key={i}
                  hotelPhoto={hotel.imageCover}
                  hotelName={hotel.name}
                  availableRooms={hotel.numOfRooms}
                  pricePerDay={hotel.minPricePerNight}
                />
              ),
            )
          )}
        </div>
      </section>

      <section>
        {/* <BookingTable bookings={RecentBooks} bookingHeaders={bookingHeaders} /> */}
      </section>
    </div>
  );
}

export default AdminDashboard;
