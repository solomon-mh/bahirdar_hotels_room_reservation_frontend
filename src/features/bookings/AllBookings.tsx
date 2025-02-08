import { useNavigate } from "react-router-dom";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { useGetAllBookingsQuery } from "../../redux/api/bookingApi";
const AllBookings = () => {

  const navigate = useNavigate();
  const bookingStatuses = Object.values(BookingStatus)
  const { data: { data: bookings } = {}, isLoading, error } = useGetAllBookingsQuery("");

  const getStatusButtonColor = (status: BookingStatus) => {
    switch (status)
    {
      case BookingStatus.PENDING:
        return "bg-yellow-400/90 hover:bg-yellow-400";
      case BookingStatus.CONFIRMED:
        return "bg-green-400/90 hover:bg-green-400";
      case BookingStatus.CANCELLED:
        return "bg-red-400/90 hover:bg-red-400";
      case BookingStatus.CHECKED_IN:
        return "bg-accent-400/90 hover:bg-accent-400";
      case BookingStatus.CHECKED_OUT:
        return "bg-slate-300/90 hover:bg-slate-300";
      default:
        return "bg-gray-400/90 hover:bg-gray-400";
    }
  };


  const getBgColor = (status: BookingStatus) => {
    switch (status)
    {
      case BookingStatus.PENDING:
        return "text-yellow-500/90 ";
      case BookingStatus.CONFIRMED:
        return "text-green-500/90 ";
      case BookingStatus.CANCELLED:
        return "text-red-500/90 ";
      case BookingStatus.CHECKED_IN:
        return "text-accent-500/90 ";
      case BookingStatus.CHECKED_OUT:
        return "text-slate-500/90";
      default:
        return "text-gray-500/90 ";
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-3xl font-bold text-slate-800">All Bookings</h2>
          <div className="flex gap-1 items-center justify-end">
            {bookingStatuses.map((status) => (
              <button
                key={status}
                className={`flex items-center justify-center px-4 py-2 rounded-sm text-[#333333] ${getStatusButtonColor(
                  status
                )}`}
              >
                {status.replace(/-/g, " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">

          {
            isLoading
              ?
              <LoadingPage />
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
                !bookings?.length
                  ?
                  <NotFoundPage>
                    <p>Bookings not found</p>
                  </NotFoundPage>
                  :
                  (
                    <div className="max-h-[70vh] overflow-y-auto overflow-x-auto">

              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Booking ID</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">User</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Phone</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Room</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Check-In</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Check-Out</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Status</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Total Price</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Action</th>
                  </tr>
                </thead>
                <tbody>
                          {bookings?.map((booking) => (
                    <tr key={booking._id}>
                              <td className="border  border-gray-200 px-4 py-2 text-gray-600">{booking?._id && booking?._id.slice(0, 5)}</td>
                              <td className="border border-gray-200 px-4 py-2 text-gray-600">{`${booking.user?.firstName} ${booking.user?.lastName}`}</td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-600">{booking.user.phoneNumber}</td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                Room {booking?.room?.roomNumber}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                {new Date(booking.checkIn).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                {new Date(booking.checkOut).toLocaleDateString()}
                      </td>
                      <td className={"border border-gray-200 px-4 py-2 text-gray-600 capitalize " + `${getBgColor(booking.status as BookingStatus)}`}>{booking.status}</td>
                              <td className="border border-gray-200 px-4 py-2 text-gray-600">${booking.totalPrice}</td>
                              <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                <button
                                  onClick={() => navigate(`/dashboard/bookings/${booking._id}`)}
                                  className="text-accent-500/90 hover:text-accent-500 hover:underline">View</button>
                              </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
                  )
          }
        </div>
      </div>
    </div>
  );
};

export default AllBookings;



















// import { Link, useSearchParams } from "react-router-dom";
// import Spinner from "../../ui/Spinner";
// import BookingTableBody from "./BookingTableBody";
// import BookingTableHeading from "./BookingTableHeading";
// import { useBookings } from "./useBookings";
// import { useState } from "react";

// function AllBookings({ hotelId = '' }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [active, setActive] = useState("");

//   // // HERE THE HOTEL IS IS NEEDED TO FIND ALL THE BOOKINGS OF ONE HOTEL
//   const { data: { data: { bookings } = {} } = {}, isLoading } = useBookings({
//     hotelId,
//   });

//   const handleClickStatus = (status: string) => {
//     searchParams.set("status", status);
//     setSearchParams(searchParams);
//     setActive(status);
//   };

//   return (
//     <div className="grid w-full grid-cols-1 bg-white">
//       <div className="flex items-center justify-between p-6">
//         <h1 className="p-4 uppercase">
//           <Link to="/dashboard/bookings">All Bookings</Link>
//         </h1>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div className="flex items-center justify-between gap-2">
//           <Link
//             onClick={() => setActive("all")}
//             to="/dashboard/bookings"
//             className="rounded bg-accent-500 px-3 text-sm text-white"
//           >
//             all
//           </Link>
//           <button
//             onClick={() => handleClickStatus("confirmed")}
//             disabled={active === "confirmed"}
//             className={`rounded border px-3 text-sm transition-all duration-300 hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:bg-green-700 disabled:text-white`}
//           >
//             confirmed
//           </button>
//           <button
//             onClick={() => handleClickStatus("pending")}
//             disabled={active === "pending"}
//             className="rounded border px-3 text-sm transition-all duration-300 hover:bg-orange-400 hover:text-white disabled:cursor-not-allowed disabled:bg-orange-400 disabled:text-white"
//           >
//             pending
//           </button>
//           <button
//             onClick={() => handleClickStatus("cancelled")}
//             disabled={active === "cancelled"}
//             className="rounded border px-3 text-sm transition-all duration-300 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:bg-red-500 disabled:text-white"
//           >
//             cancelled
//           </button>
//         </div>
//         <div></div>
//       </div>

//       <BookingTableHeading />
//       {/* <Table headers={headers} data={bookings} /> */}

//       {isLoading ? (
//         <Spinner />
//       ) : bookings?.length && bookings?.length > 0 ? (
//         bookings?.map((booking, i) => (
//           <BookingTableBody booking={booking} key={i} />
//         ))
//       ) : (
//         <div>There are not bookings found</div>
//       )}
//     </div>
//   );
// }

// export default AllBookings;
// /*
// {
//     status: 'success',
//     message: 'get all bookings',
//     numOfBookings: 1,
//     data: {
//       bookings: [
//         {
//           _id: '66921b10286016274ee101b0',
//           user: {
//             _id: '668ce28fa5b16ed846c21a22',
//             firstName: 'test',
//             lastName: 'TestF',
//             email: 'test@test.com',
//             role: 'user',
//             phoneNumber: '0908005801'
//           },
//           room: {
//             _id: '668ce6d9296708cdbae3865f',
//             roomNumber: '100',
//             roomType: 'single',
//             pricePerNight: 140,
//             id: '668ce6d9296708cdbae3865f'
//           },
//           checkInDate: '2024-07-10T08:58:40.000Z',
//           checkOutDate: '2024-07-13T08:58:40.000Z',
//           status: 'pending',
//           createdAt: '2024-07-13T06:13:36.243Z',
//           updatedAt: '2024-07-13T06:13:36.243Z',
//           hotel: '668ce408603914bd3b9e585b',
//           numOfNights: 3,
//           pricePerNight: 140,
//           totalPrice: 420,
//           id: '66921b10286016274ee101b0'
//         }
//       ]
//     }
//   }
//  */
