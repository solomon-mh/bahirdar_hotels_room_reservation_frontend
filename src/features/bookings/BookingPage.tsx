import { useNavigate, useParams } from "react-router-dom";
import { IBooking } from "../../types/bookingTypes";
import BookingForm from "./BookingForm";
import { useCreateBookingMutation } from "../../redux/api/bookingApi";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useGetRoomByIdQuery } from "../../redux/api/rooms";
import { ArrowLeft } from "lucide-react";
import SubHeader from "../../components/SubHeader";

export default function BookingPage() {
    const navigate = useNavigate();
    const { roomId } = useParams<{ id: string; roomId: string }>();
    const { user } = useAuthContext();
    const [bookRoom, { isLoading }] = useCreateBookingMutation();
    const {
        data: { data: room } = {},
        isLoading: fetchingRoom,
        error: roomFetchingError,
    } = useGetRoomByIdQuery(roomId as string);
    const handleBookingSubmit = (data: IBooking) => {
        bookRoom({
            room: roomId as string,
            user: user?._id as string,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            status: BookingStatus.PENDING,
        })
            .unwrap()
            .then((res) => {
            toast.success(res.message || "Room booked successfully");
                navigate(-1);
            })
            .catch((err) => {
                if ("data" in err)
                {
                    toast.error(
                        err.data.message || "Something went to wrong please try again!!",
                    );
                } else
                {
                    toast.error("Failed to book please try again!!");
                }
            });
    };

    return (
        <div className="p-6 flex flex-col gap-4">

            <SubHeader>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 bg-gray-100 p-2 rounded-md"
                >
                    <span className="material-icons">
                        <ArrowLeft />
                    </span>
                </button>
                <h1 className=" text-2xl font-bold text-slate-700">Book a Room with ID: {roomId}</h1>
            </SubHeader>
            <div className="flex">
                <BookingForm isBooking={isLoading} onSubmit={handleBookingSubmit} />
                <div className="div w-72">
                    {fetchingRoom ? (
                        <p>Loading...</p>
                    ) : roomFetchingError ? (
                        <p>
                            <pre>{JSON.stringify(roomFetchingError, null, 2)}</pre>
                        </p>
                    ) : (
                        <div className="rounded border p-4 shadow-sm">
                            <h2 className="mb-2 text-xl font-bold">Room Details</h2>
                            <div className="flex flex-col gap-2 p-2 ">
                                <div className="flex">
                                    <img
                                        src={room?.images[0]}
                                        alt="Room"
                                        className="mb-2 h-36 object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p>
                                        <strong>Room Number:</strong> {room?.roomNumber}
                                    </p>
                                    <p>
                                        <strong>Type:</strong> {room?.roomType}
                                    </p>
                                    <p>
                                        <strong>Capacity:</strong> {room?.capacity} people
                                    </p>
                                    <p>
                                        <strong>Price per Night:</strong> ${room?.pricePerNight}
                                    </p>
                                    <p>
                                        <strong>Description:</strong> {room?.description}
                                    </p>
                                    <p>
                                        <strong>Facilities:</strong>{" "}
                                        {room?.roomFacilities.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
