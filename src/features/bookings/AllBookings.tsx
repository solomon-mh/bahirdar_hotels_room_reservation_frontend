import { useNavigate, useSearchParams } from "react-router-dom";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { useGetAllBookingsQuery } from "../../redux/api/bookingApi";
import { useState } from "react";
import { CustomPagination } from "../../components/Pagination";
import { useClickOutside } from "../../components/lib/useClickOutSide";
import { Menu, X } from "lucide-react";
import { getBookingStatusBgColor, getBookingStatusTextColor } from "./color-utils";

const AllBookings = () => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => setOpenDropdown(false));
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const bookingStatuses = Object.values(BookingStatus);
  const {
    data: { data: bookings, pagination } = {},
    isLoading,
    error,
  } = useGetAllBookingsQuery(searchParams.toString() as string, {
    refetchOnMountOrArgChange: true
  });





  return (
    <div className="min-h-screen w-full relative bg-gray-100 md:px-6 py-10">
      <div className="bg-white md:mx-auto w-full md:max-w-7xl overflow-hidden rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-3xl font-bold text-slate-800">All Bookings</h2>
          <div className="hidden md:flex w-full items-center justify-end gap-1 md:w-auto">
            {bookingStatuses.map((status) => (
              <button
                onClick={() => {
                  searchParams.set("status", status);
                  setSearchParams(searchParams);
                }}
                key={status}
                className={`flex items-center justify-center rounded-sm px-4 py-2 text-[#333333] ${getBookingStatusBgColor(status)}`}
              >
                {status.replace(/-/g, " ").toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setOpenDropdown(prev => !prev)}
              className="flex items-center justify-center rounded-sm px-4 py-2 text-accent-500 bg-gray-200">
              {
                openDropdown ? <X /> : <Menu />
              }
            </button>
            {openDropdown && (
              <div ref={modalRef} className=" absolute top-24 px-3 left-0 right-0 bg-slate-100 shadow-md flex flex-col w-[94%] items-stretch justify-end gap-1 md:w-auto">
                {bookingStatuses.map((status) => (
                  <button
                    onClick={() => {
                      setSearchParams({ status });
                      setOpenDropdown(false);
                    }}
                    key={status}
                    className={`flex items-center justify-center rounded-sm px-4 py-2 text-[#333333] ${getBookingStatusBgColor(status)}`}
                  >
                    {status.replace(/-/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>)}
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
                                `${getBookingStatusTextColor(booking.status as BookingStatus)}`
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
