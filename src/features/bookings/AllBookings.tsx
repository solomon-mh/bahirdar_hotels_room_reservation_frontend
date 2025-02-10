import { useNavigate, useSearchParams } from "react-router-dom";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { bookingApi, BookingTags, useGetAllBookingsQuery } from "../../redux/api/bookingApi";
import { useEffect } from "react";
import { CustomPagination } from "../../components/Pagination";

const AllBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const bookingStatuses = Object.values(BookingStatus);
  const {
    data: { data: bookings, pagination } = {},
    isLoading,
    error,
  } = useGetAllBookingsQuery(searchParams.toString() as string);



  useEffect(() => {
    if (!searchParams.get("status"))
    {
      setSearchParams({ status: BookingStatus.PENDING });
    }
    else
    {
      setSearchParams(searchParams);
      bookingApi.util.invalidateTags([BookingTags.BOOKINGS]);
    }
  }, [searchParams, setSearchParams]);
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
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="bg-white mx-auto max-w-7xl overflow-hidden rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-3xl font-bold text-slate-800">All Bookings</h2>
          <div className="flex items-center justify-end gap-1">
            {bookingStatuses.map((status) => (
              <button
                key={status}
                className={`flex items-center justify-center rounded-sm px-4 py-2 text-[#333333] ${getStatusButtonColor(
                  status,
                )}`}
                onClick={() => {
                  setSearchParams({ status });
                }}
              >
                {status.replace(/-/g, " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <LoadingPage />
          ) : error ? (
            <NotFoundPage>
                <pre>{JSON.stringify(error, null, 2)}</pre>
              </NotFoundPage>
            ) : !bookings?.length ? (
              <NotFoundPage>
                <p>Bookings not found</p>
              </NotFoundPage>
              ) : (
                <div className="max-h-[70vh] overflow-x-auto overflow-y-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            Booking ID
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            User
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            Phone
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            Room
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            Check-In
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            Check-Out
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            Status
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                            Action
                          </th>
                  </tr>
                </thead>
                <tbody>
                        {bookings?.map((booking) => (
                    <tr key={booking._id}>
                            <td className="border border-gray-200 px-4 py-2 text-gray-600">
                              {booking?._id && booking?._id.slice(0, 5)}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-600">{`${booking.user?.firstName} ${booking.user?.lastName}`}</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-600">
                              {booking.user.phoneNumber}
                            </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-600">
                              Room {booking?.room?.roomNumber}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-600">
                              {new Date(booking.checkIn).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-600">
                              {new Date(booking.checkOut).toLocaleDateString()}
                      </td>
                            <td
                              className={
                                "border border-gray-200 px-4 py-2 capitalize text-gray-600 " +
                                `${getBgColor(booking.status as BookingStatus)}`
                              }
                            >
                              {booking.status}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-600">
                              <button
                                onClick={() =>
                                  navigate(`/dashboard/bookings/${booking._id}`)
                                }
                                className="text-accent-500/90 hover:text-accent-500 hover:underline"
                              >
                                View
                              </button>
                            </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                    {pagination && (
                      <CustomPagination
                        totalPages={pagination.totalPages}
                        page={pagination?.page}
                        onPageChange={(page) => {
                          searchParams.set("page", page.toString());

                        }}
                      />
                    )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
