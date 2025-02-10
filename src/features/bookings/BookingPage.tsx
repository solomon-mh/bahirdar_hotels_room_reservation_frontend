import { useNavigate, useParams } from "react-router-dom";
import { IBooking } from "../../types/bookingTypes";
import BookingForm from "./BookingForm";
import { useCreateBookingMutation } from "../../redux/api/bookingApi";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useGetRoomByIdQuery } from "../../redux/api/roomsApi";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useGetHotelByIdQuery } from "../../redux/api/hotelApi";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";

export default function BookingPage() {
    const navigate = useNavigate();
    const { roomId, hotelId } = useParams<{ hotelId: string; roomId: string }>();
    const { user } = useAuthContext();
    const [booking, setBooking] = useState<IBooking | null>(null)
    const [bookRoom, { isLoading }] = useCreateBookingMutation();
    const {
        data: { data: hotel } = {},
        isLoading: fetchingHotel,
        error: hotelFetchingError,
    } = useGetHotelByIdQuery(hotelId as string);

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
                if (res.data)
                    setBooking(res.data)
                else
                {
                    toast.error("Cann't get booking id")
                }
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

    if (fetchingRoom)
    {
        return (
            <LoadingPage />
        )
    }

    if (roomFetchingError)
    {
        return (
            <NotFoundPage>
                <pre>{JSON.stringify(roomFetchingError, null, 2)}</pre>
            </NotFoundPage>
        )
    }

    if (!room)
    {
        return (
            <NotFoundPage>
                <p>Room not found</p>
            </NotFoundPage>
        )
    }

    return (
        <div className="p-6 flex w-full overflow-x-hidden flex-col gap-4">
            <div className="flex items-center px-4 w-full ml-0  md:ml-24 justify-between  shadow-md"  >
                <div className="flex">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 bg-gray-100 p-2 rounded-md"
                    >
                        <span className="material-icons">
                            <ArrowLeft />
                        </span>
                    </button>
                    <span className="hidden text-2xl md:inline">Book a Room  number: {room?.roomNumber} </span>
                </div>
                <h1 className="md:text-2xl text-xl   flex items-center font-bold text-slate-700">
                    <span className="inline md:hidden">
                        Book a Room
                    </span>
                    {fetchingHotel ? (
                        "Loading..."
                    ) : (
                        <a
                            href={`/hotels/${hotelId}`}
                                className="text-accent-500 hidden md:inline underline cursor-pointer"
                            >
                                {hotel?.hotel.name}
                            </a>
                    )}
                    {hotelFetchingError && (
                        <span className="text-red-500">Failed to fetch hotel</span>
                    )}
                </h1>
            </div>

            <div className="flex w-full gap-6 flex-col md:flex-row md:items-center items-stretch">
                {/* Booking Form Section */}
                <div className="flex flex-col md:flex-row md:items-center items-stretch gap-4 w-full ">
                    <BookingForm
                        room={room}
                        isBooking={isLoading}
                        onSubmit={handleBookingSubmit}
                    />
                    {booking && (
                        <div className="flex items-center gap-10 justify-between w-full px-4 py-2">
                            <div className="flex-[1] flex flex-col gap-2">
                                <h2 className="text-xl font-bold">Booking Summary</h2>
                                <div className="flex justify-between">
                                    <p>Price per night:</p>
                                    <p>${room?.pricePerNight}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Number of nights:</p>
                                    <p>{booking?.numOfNights}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total Price:</p>
                                    <p>${booking?.totalPrice}</p>
                                </div>
                            </div>
                            <div className="flex-[2] flex flex-col items-center justify-end gap-2">
                                <button
                                    className="w-[80%] px-4 py-2 text-slate-100 bg-accent-500  rounded-md hover:bg-accent-500-dark"
                                    onClick={() =>
                                        navigate(`/hotels/${hotelId}/rooms/${roomId}/${booking?._id}/pay`)
                                    }
                                >
                                    Continue with Chapa
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Room Details Section */}
                <div className="w-full md:w-[40%]">
                    {fetchingRoom ? (
                        <p>Loading...</p>
                    ) : roomFetchingError ? (
                        <p>
                            <pre>{JSON.stringify(roomFetchingError, null, 2)}</pre>
                        </p>
                    ) : (
                        <div className="rounded border p-4 shadow-sm">
                            <h2 className="mb-2 text-xl font-bold">Room Details</h2>
                                    <div className="flex flex-col gap-2 p-2">
                                        <div className="flex items-stretch justify-stretch">
                                    <img
                                        src={room?.images[0]}
                                        alt="Room"
                                                className="mb-2 h-36 w-full object-cover"
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
                                                <strong>Facilities:</strong> {room?.roomFacilities.join(", ")}
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
