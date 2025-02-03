import { useNavigate, useParams } from "react-router-dom";
import {
    useDeleteRoomMutation,
    useGetRoomByIdQuery,
} from "../../redux/api/roomsApi";
import LoadingPage from "../../pages/utils/LoadingPage";
import { ArrowLeft } from "lucide-react";
import ImageSlider from "../../components/Slider";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";
import DeleteFeature, {
    FeatureDeleteActionType,
} from "../../components/DeleteDialog";
import { MdEdit } from "react-icons/md";

// Sample room data (replace this with your dynamic data source)
const demoRoom = {
    _id: 1,
    roomNumber: 100,
    roomType: "single",
    pricePerNight: 240,
    isAvailable: "true",
    capacity: "5",
    description: "A single bed room",
    image: "/hotel-images/img-2.jpg",
    hotel: "ABC International Hotel",
    amenities: ["TV", "WI-FI"],
};

const RoomDetail = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const { hotelId, roomId } = useParams();
    const {
        data: { data: room } = {},
        isLoading,
        error,
    } = useGetRoomByIdQuery(roomId as string);

    const handleBooking = () => {
        if (!room?._id) return;
        navigate("/hotels/" + hotelId + "/rooms/" + roomId + "/book"); // Example route
    };

    return (
        <div className="flex min-h-screen w-[80vw] flex-col gap-4 bg-gray-100 p-6">
            <div className="flex items-center gap-2 p-2 shadow-lg shadow-slate-200">
                {!(user?.role === Role.MANAGER || user?.role === Role.ADMIN) && (
                    <button
                        onClick={() => {
                            if (user?.role === Role.MANAGER || user?.role === Role.ADMIN)
                            {
                                navigate("/dashboard/rooms");
                            } else
                            {
                                navigate("/hotels/" + hotelId + "/rooms");
                            }
                        }}
                        className="rounded-lg bg-slate-200 px-4 py-1 transition duration-200"
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}
                <h3>Room Details</h3>
            </div>

            {isLoading ? (
                <LoadingPage />
            ) : error ? (
                <div className="text-center text-red-500">
                    <h1>Error fetching room data</h1>
                    <p>{JSON.stringify(error, null, 2)}</p>
                </div>
                ) : !room ? (
                    <div className="text-center text-red-500">
                        <h1>Room not found</h1>
                    </div>
                    ) : (
                        <div className="bg-white relative mx-auto w-full overflow-hidden rounded-lg shadow-md">
                            {user?.role === Role.MANAGER || user?.role === Role.ADMIN ? (
                                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-sm bg-slate-100 p-2 shadow-md">
                                    <button
                                        onClick={() => navigate(`/dashboard/rooms/edit/${room._id}`)}
                                            className="rounded-lg px-4 py-2 transition duration-200 hover:bg-accent-500 hover:text-slate-100"
                                        >
                                            <MdEdit size={20} />
                                        </button>
                                        <DeleteFeature
                                            feature="room"
                                            featureId={roomId as string}
                                            useDelete={
                                                useDeleteRoomMutation as unknown as FeatureDeleteActionType
                                            }
                                        />
                                    </div>
                                ) : null}
                                <img
                                    src={room?.images[0] || demoRoom.image}
                                    alt={`Room ${room?.roomNumber || demoRoom.roomNumber}`}
                                    className="h-64 w-full object-cover"
                                />
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">
                                        Room {room?.roomNumber} - {room?.roomType.toUpperCase()}
                                    </h1>
                                    <p className="mt-2 text-gray-700">{room?.description}</p>
                                    <p className="mt-1 text-gray-500">
                                        <strong>Hotel:</strong> {room.hotel}
                                    </p>
                                    <div className="mt-4">
                                        <span className="text-lg font-bold text-accent-500">
                                            ${room.pricePerNight}/night
                                        </span>
                                        <span
                                            className={`ml-4 rounded-full px-3 py-1 text-xs ${room.isAvailable
                                                ? "bg-green-100 text-green-500"
                                                : "bg-red-100 text-red-500"
                                                }`}
                                        >
                                            {room.isAvailable ? "Available" : "Unavailable"}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600">
                                        <strong>Capacity:</strong> {room.capacity} persons
                                    </p>
                                    <div className="mt-2">
                                        <strong>Amenities:</strong>{" "}
                                        <span>
                                            {room.roomFacilities.map((amenity, index) => (
                                                <span key={index} className="text-accent-500/90">
                                                    {amenity}
                                                    {index !== room.roomFacilities.length - 1 && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        {room.images.length > 1 ? (
                                            <ImageSlider images={room.images} />
                                        ) : (
                                            <img
                                                src={room.images[0] || demoRoom.image}
                                                alt={`Room ${room.roomNumber}`}
                                                    className="h-64 w-full rounded-md object-cover"
                                                />
                                        )}
                                    </div>
                                    <button
                                        onClick={handleBooking}
                                        className="mt-6 w-full rounded-lg bg-accent-500/90 px-4 py-2 text-slate-100 transition duration-200 hover:bg-accent-500"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
            )}
        </div>
    );
};

export default RoomDetail;
