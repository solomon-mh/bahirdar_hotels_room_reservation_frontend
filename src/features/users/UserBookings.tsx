import { CustomPagination } from "@/components/Pagination"
import { BookingStatus } from "@/enums/bookingStatusEnum"
import LoadingPage from "@/pages/utils/LoadingPage"
import NotFoundPage from "@/pages/utils/NotFoundPage"
import { useGetUserBookingsByUserIdQuery } from "@/redux/api/bookingApi"
import { createLabel } from "@/utils/text"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getBookingStatusTextColor } from "../bookings/color-utils"

const UserBookings = () => {

    const navigate = useNavigate()
    const { userId } = useParams<{ userId: string }>()
    const [seachParams, setSearchParams] = useSearchParams()
    const { data: { data: bookings, pagination } = {}, isLoading, error } = useGetUserBookingsByUserIdQuery({
        userId: userId as string,
        params: seachParams.toString()
    }, {
        refetchOnMountOrArgChange: true
    })


    return (
        <div className="py-8 bg-white w-full flex flex-col ">
            <div className="flex items-center justify-between">
                <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                    Booking History
                </h3>
                <div className="flex items-center gap-2">
                    {
                        Object.values(BookingStatus).map((status) => (
                            <button
                                key={status}
                                disabled={isLoading}
                                onClick={() => {
                                    seachParams.set("status", status)
                                    setSearchParams(seachParams)
                                }}
                                className={`px-4 py-2 text-sm font-semibold text-accent rounded-lg ${seachParams.get('status') === status ? "bg-accent-500 text-white" : "bg-gray-200"} ${isLoading && 'cursor-wait'}`}
                            >
                                {createLabel(status)}
                            </button>
                        ))
                    }
                </div>
            </div>

            {
                isLoading
                    ?
                    <LoadingPage />
                    :
                    error
                        ?
                        <NotFoundPage>
                            <pre>{JSON.stringify(error, null, 2)}</pre>
                        </NotFoundPage>
                        :
                        !bookings?.length
                            ?
                            < NotFoundPage >
                                <p>No booking history available.</p>
                            </NotFoundPage>
                            :
                            bookings.length > 0 ? (
                                <div className="max-h-[40vh] overflow-y-auto">
                                    <table className="w-full table-auto border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                    Booking ID
                                                </th>
                                                <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">
                                                    Payment Status
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
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <tr key={booking._id}>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                        {booking._id}
                                                    </td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                        {
                                                            booking.isPaid
                                                                ? <span className="text-green-500">Paid</span>
                                                                : <span className="text-red-500">Not Paid</span>
                                                        }
                                                    </td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                        {new Date(booking.checkIn).toLocaleDateString()}
                                                    </td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                        {new Date(booking.checkOut).toLocaleDateString()}
                                                    </td>
                                                    <td className={`border border-gray-200 px-4 py-2 capitalize ${getBookingStatusTextColor(booking.status)}`}>
                                                        {createLabel(booking.status)}
                                                    </td>
                                                    <td className="border border-gray-200 px-4 py-2 text-gray-600">
                                                        <button
                                                            className="text-accent-500 hover:underline"
                                                            onClick={() => {
                                                                navigate(`/dashboard/users/${userId}/bookings/${booking._id}`)
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {pagination && <CustomPagination
                                        totalPages={pagination.totalPages}
                                        page={pagination.page}
                                        onPageChange={() => {
                                            console.log("page changed")
                                        }}
                                    />}
                                </div>
                            ) : (
                                <p className="text-gray-600">No booking history available.</p>
                            )
            }
        </div >
    )
}

export default UserBookings
