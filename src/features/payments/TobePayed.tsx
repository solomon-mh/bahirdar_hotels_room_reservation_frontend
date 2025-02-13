import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { Role } from "@/enums/roleEnum";
import { useAuthContext } from "@/context/AuthContext";
import { useGetAllHotelsQuery } from "@/redux/api/hotelApi";

function ToBePayed() {

    const { user } = useAuthContext();
    const { data } = useGetAllBookingsQuery("");
    const { data: bookings } = data || {};
    const { data: { data: hotels } = {}, isLoading, error } = useGetAllHotelsQuery("", {
        skip: user?.role !== Role.ADMIN || !bookings?.length,
    })

    const tobePayied = hotels?.map((hotel) => {
        const hotelBookings = bookings?.filter((booking) => booking.isPaid && booking.hotel?._id === hotel._id);
        let checkindDate = new Date();
        hotelBookings?.forEach(booking => {
            const checkin = new Date(booking.checkIn);
            if (checkin < checkindDate)
            {
                checkindDate = checkin;
            }
        });

        const totalAmount = hotelBookings?.filter(booking => booking.totalPrice).reduce((acc, booking) => acc + (booking?.totalPrice || 0), 0);
        return { hotel, date: checkindDate, totalAmount };
    })



    return (
        <div className="w-full bg-white h-[80vh] text-gray-600 shadow-md">
            {/* Header Section */}
            <div className="relative flex gap-2 items-center justify-between p-3 md:p-6">
                <h1 className="p-4 hidden md:inline text-sm md:text-base uppercase">
                    <Link to="/dashboard/hotels">Paymnets to be payed</Link>
                </h1>

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
                            <TableHead>Name</TableHead>
                            <TableHead>Hotel Rating</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Reviews</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Date</TableHead>
                        </TableHeader>
                        <TableBody>
                            {tobePayied?.filter(payment => payment?.totalAmount).map((payment) => (
                                <TableRow key={payment.hotel._id}>
                                    <TableCell>{payment.hotel.name}</TableCell>
                                    <TableCell>{`${payment.hotel.hotelStar} ⭐ Hotel`}</TableCell>
                                    <TableCell>
                                        {payment.hotel.address?.city}
                                        {payment.hotel.address?.subcity}
                                        {payment.hotel.address?.woreda}
                                        {payment.hotel.address?.street}
                                    </TableCell>
                                    <TableCell>
                                        {payment.hotel.numOfRatings > 0
                                            ? `${payment.hotel.numOfRatings} Reviews`
                                            : "0 Reviews"}
                                    </TableCell>
                                    <TableCell>{payment.totalAmount} </TableCell>
                                    <TableCell>
                                        {payment.date.toLocaleDateString()}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table >
                )
                }
            </div >
        </div >
    );
}

export default ToBePayed;
