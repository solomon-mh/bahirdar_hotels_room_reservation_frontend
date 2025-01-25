import { useNavigate, useParams } from "react-router-dom";
import { IBooking } from "../../types/bookingTypes";
import BookingForm from "./BookingForm";
import { useCreateBookingMutation } from "../../redux/api/bookingApi";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";


export default function BookingPage() {
    const navigate = useNavigate();
    const { id, roomId } = useParams<{ id: string; roomId: string }>();
    const { user } = useAuthContext();
    const [bookRoom, { isLoading }] = useCreateBookingMutation();
    const handleBookingSubmit = (data: IBooking) => {
        bookRoom({
            room: roomId as string,
            user: user?._id as string,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            status: BookingStatus.PENDING
        }).unwrap().then((res) => {
            toast.success(res.message || "Room booked successfully");
            navigate("/hotels/" + id + "/rooms/" + roomId);
        }).catch(err => {
            if ('data' in err)
            {
                toast.error(err.data.message || "Something went to wrong please try again!!")
            }
            else
            {
                toast.error("Failed to book please try again!!")
            }
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Book a Room with ID: {roomId}</h1>
            <BookingForm isBooking={isLoading} onSubmit={handleBookingSubmit} />
        </div>
    );
}
