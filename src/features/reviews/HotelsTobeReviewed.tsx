import { Card } from "@/components/ui/card";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useGetMyBookingsQuery } from "@/redux/api/userApi";

const HotelsTobeReviewd = () => {
  const { data: { data: reviews } = {}, isLoading, error } = useGetAllReviewsQuery()
  const { data: { data: { bookings } = {} } = {}, isLoading: loadingBookings, error: bookingLoadErr } = useGetMyBookingsQuery()
  const toBeviewedBookings = bookings?.filter(booking => reviews?.every(review => !(review.user === booking.user as unknown as string && review.hotel === booking.hotel as unknown as string)))
  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900">Hotels To be Reviewed</h2>
      {
        (bookingLoadErr || error) && <p className="text-red-500">Error loading data</p>
      }
      {(loadingBookings || isLoading) && <p className="text-gray-500">Loading...</p>
      }
      {toBeviewedBookings && toBeviewedBookings?.length > 0 ? (
        toBeviewedBookings?.map((booking) => (
          <Card key={booking._id} className="p-4 rounded-xl shadow-md bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Booking ID: {booking._id}</h3>
                <p className="text-sm text-gray-500">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Status: <span className="font-medium text-yellow-500">{booking.status}</span></p>
                <p className="text-sm text-gray-500">Total Price: ${booking.totalPrice}</p>
              </div>
              <p className="text-sm text-gray-400">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No pending bookings available.</p>
      )}
    </div>
  );
};

export default HotelsTobeReviewd;
