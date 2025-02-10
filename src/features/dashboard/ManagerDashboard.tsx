import {
  MdOutlineBedroomChild,
  MdOutlineFreeCancellation,
  MdOutlineManageSearch,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { Link } from "react-router-dom";

import BookingCard from "../bookings/BookingCard";
import { useAuthContext } from "../../context/AuthContext";
import CustomLabeledPieChart from "../stats/CustomLabeledPieChart";
import AreaChartBox from "../stats/AreaChartBox";
import {
  barChartBookingData,
  barChartBoxVisit,
  bookingRevenueData,
  hotelUserBookingMonthlyStatusData,
  lineChartData,
} from "../../data/stat-data";
import BarChartBox from "../stats/BarChartBox";
import LineChartBox from "../stats/LineChartBox";
import MaxWidthWrapper from "../../ui/MaxWidthWrapper";

const RecentlyBookedRooms = [
  {
    photo: "/rooms/room1.jpeg",
    roomNumber: "001 ",
    pricePerNight: 542,
    type: "single",
  },
  {
    photo: "/rooms/room2.jpeg",
    roomNumber: "002",
    pricePerNight: 542,
    type: "double",
  },
  {
    photo: "/rooms/room3.jpeg",
    roomNumber: "003",
    pricePerNight: 542,
    type: "single",
  },
  {
    photo: "/rooms/room4.jpeg",
    roomNumber: "004",
    pricePerNight: 542,
    type: "triple",
  },
];

function ManagerDashboard() {
  const { currentHotel } = useAuthContext();

  if (currentHotel) return null;

  const { numBookings, numReviews, numRooms, numUsers } = {
    numBookings: 23,
    numReviews: 21,
    numRooms: 3,
    numUsers: 9
  };

  const managerStats = [
    {
      icon: <MdOutlineBedroomChild className="size-12" />,
      title: "Rooms",
      number: numRooms,
    },
    {
      icon: <MdOutlineManageSearch className="size-12" />,
      title: "Bookings",
      number: numBookings,
    },
    {
      icon: <MdOutlineShoppingCartCheckout className="size-12" />,
      title: "Users",
      number: numUsers,
    },
    {
      icon: <MdOutlineFreeCancellation className="size-12" />,
      title: "Reviews",
      number: numReviews,
    },
  ];

  return (
    <>
      <div className="flex w-[80vw]   flex-col gap-5 overflow-hidden">
        <div className="border-black/7   w-full border bg-black/5">
          <section className="m-3  mb-8 grid w-full grid-cols-1 gap-4   gap-x-3 sm:grid-cols-2  lg:grid-cols-4 lg:gap-x-4">
            {managerStats.map(({ title, icon, number }, i) => (
              <div
                key={i}
                className="flex  items-center  px-6 h-[7rem] shadow-slate-300 w-full md:w-[17rem]  justify-between rounded bg-gradient-to-br p-4 text-slate-800 shadow-md"
              >
                <div className="flex">
                  {icon}
                </div>
                <div className="flex flex-col items-center justify-between">
                  <span className="text-xl font-semibold md:text-2xl">
                    {number}
                  </span>
                  <h3 className="text-sm">{title}</h3>
                </div>
              </div>
            ))}
          </section>
        </div>

        <MaxWidthWrapper className="border-black/7 w-full border bg-black/5">
          <section className="h-96 w-full">
            <CustomLabeledPieChart />
          </section>
        </MaxWidthWrapper>

        <MaxWidthWrapper className="border-black/7 w-full border bg-black/5">
          <section className="flex justify-between">
            <div className="m-3 my-6 h-96 w-full p-6 py-6">
              <BarChartBox data={barChartBoxVisit} />
            </div>
            <div className="m-3 my-6 h-96 w-full p-6 py-6">
              <BarChartBox data={barChartBookingData} />
            </div>
          </section>
        </MaxWidthWrapper>

        <section className="m-3 my-6 flex h-[500px] p-8">
          <AreaChartBox
            title="Monthly Registered Number of Hotels and Users "
            data={hotelUserBookingMonthlyStatusData}
            dataKeys={["users", "hotels"]}
            colors={["#160ce4", "#15c458"]}
          />
        </section>

        <section className="m-3 my-6 flex h-[500px] p-6">
          <AreaChartBox
            title="Revenue Analysis"
            data={bookingRevenueData}
            dataKeys={["revenue"]}
            colors={["#15c458"]}
          />
        </section>

        <section className="mx-3 my-6 flex h-[400px] p-6">
          <LineChartBox
            data={lineChartData}
            title={"Total Number of Registered Users and Bookings over Time"}
          />
        </section>

        <section className="my-6 flex flex-col">
          <div className="flex justify-between p-4">
            <h2 className="text-2xl font-bold uppercase">
              Recently Booked Rooms
            </h2>
            <Link
              to="/dashboard/bookings"
              className="flex items-center rounded-full bg-accent-500 px-2 py-1 text-sm text-white transition-all duration-200 hover:scale-105"
            >
              See more &gt;&gt;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4">
            {RecentlyBookedRooms.map((room, i) => (
              <BookingCard key={i} {...room} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between p-4">
            <h2 className="text-2xl font-bold uppercase">Recent Users</h2>
            <Link
              to="/dashboard/users"
              className="flex items-center rounded-full bg-accent-500 px-2 py-1 text-sm text-white transition-all duration-200 hover:scale-105"
            >
              See more &gt;&gt;
            </Link>
          </div>
          {/* <BookingTable bookings={RecentBooks} bookingHeaders={bookingHeaders} /> */}
        </section>
      </div>
      {/* {Array.isArray(hotel.rooms) && hotel?.hotel.rooms.length < 1 && <ModalAddRoom hotel={hotel.hotel} />} */}
    </>
  );
}

export default ManagerDashboard;
