import { useGetMyBookingsQuery } from "@/redux/api/userApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { createLabel } from "@/utils/text";
import { getBookingStatusTextColor } from "../bookings/color-utils";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {

  const navigate = useNavigate()

  const { data: { data: { bookings } = {} } = {}, isLoading, error } = useGetMyBookingsQuery()


  if (isLoading)
  {
    return (
      <LoadingPage />
    )
  }

  if (error)
  {
    return (
      <NotFoundPage>
        <p className="text-red-400">Something went wrong. Please try again later.</p>
        <pre>
          {
            JSON.stringify(error, null, 2)
          }
        </pre>
      </NotFoundPage>
    )
  }

  if (!bookings?.length)
  {
    return (
      <NotFoundPage>
        <p className="text-red-400">No bookings found.</p>
      </NotFoundPage>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-slate-800">My  Bookings</h2>
      <Table className="w-full border-collapse border border-gray-300">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="border border-gray-300 p-2">Check-In</TableHead>
            <TableHead className="border border-gray-300 p-2">Check-Out</TableHead>
            <TableHead className="border border-gray-300 p-2">Nights</TableHead>
            <TableHead className="border border-gray-300 p-2">Total Price</TableHead>
            <TableHead className="border border-gray-300 p-2">Status</TableHead>
            <TableHead className="border border-gray-300 p-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id} className="border border-gray-300">
              <TableCell className="border border-gray-300 p-2">
                {new Date(booking.checkIn).toLocaleDateString()}
              </TableCell>
              <TableCell className="border border-gray-300 p-2">
                {new Date(booking.checkOut).toLocaleDateString()}
              </TableCell>
              <TableCell className="border border-gray-300 p-2">{booking.numOfNights} night{booking?.numOfNights && booking.numOfNights > 1 && "s"} </TableCell>
              <TableCell className="border border-gray-300 p-2">${booking.totalPrice}</TableCell>
              <TableCell className={`border border-gray-300 p-2 capitalize ${getBookingStatusTextColor(booking.status)}`}>{createLabel(booking.status)}</TableCell>
              <TableCell className="border border-gray-300 p-2">
                <button
                  onClick={() => navigate(`/account/bookings/${booking._id}`)}
                  className="py-2 px-3 text-accent-500 hover:underline"
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBookings;
