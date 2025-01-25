import { useNavigate, useParams } from "react-router-dom";
import { useGetRoomByIdQuery } from "../../redux/api/rooms";
import LoadingPage from "../../pages/utils/LoadingPage";
import { ArrowLeft, Pen } from "lucide-react";
import ImageSlider from "../../components/Slider";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";

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
    const { user } = useAuthContext()


    const { hotelId, roomId } = useParams();
    const { data: { data: room } = {}, isLoading, error } = useGetRoomByIdQuery(roomId as string);

    const handleBooking = () => {
        if (!room?._id) return;
        navigate("/hotels/" + hotelId + "/rooms/" + roomId + "/book"); // Example route
    };

    return (
        <div className="min-h-screen w-[80vw] bg-gray-100 p-6">

            <div className="flex items-center py-4 pl-10 md:pl-20 ">
                <button
                    onClick={() => {
                        if (user?.role === Role.MANAGER || user?.role === Role.ADMIN)
                        {
                            navigate("/dashboard/rooms");
                        }
                        else
                        {
                            navigate("/hotels/" + hotelId + "/rooms");
                        }
                    }}
                    className=" py-2 px-4 rounded-lg  transition duration-200"
                >
                    <ArrowLeft size={24} />
                </button>
                <h3>
                    Room Details
                </h3>
            </div>


            {
                isLoading
                    ?
                    (
                        <LoadingPage />
                    )
                    :
                    error
                        ?
                        (
                            <div className="text-center text-red-500">
                                <h1>Error fetching room data</h1>
                                <p>{JSON.stringify(error, null, 2)}</p>
                            </div>
                        )
                        :
                        !room
                            ?
                            (
                                <div className="text-center text-red-500">
                                    <h1>Room not found</h1>
                                </div>
                            )
                            :

                            <div className="max-w-5xl relative mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                                {
                                    user?.role === Role.MANAGER || user?.role === Role.ADMIN
                                        ?
                                        <button
                                            onClick={() => navigate(`/dashboard/rooms/edit/${room._id}`)}
                                            className="absolute top-4 right-4 bg-accent-500/90 text-slate-100 py-2 px-4 rounded-lg hover:bg-accent-500 transition duration-200"
                                        >
                                            <Pen size={20} />
                                        </button>
                                        :
                                        null
                                }
                                <img
                                    src={room?.images[0] || demoRoom.image}
                                    alt={`Room ${room?.roomNumber || demoRoom.roomNumber}`}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h1 className="text-2xl font-bold">
                                        Room {room?.roomNumber} - {room?.roomType.toUpperCase()}
                                    </h1>
                                    <p className="text-gray-700 mt-2">{room?.description}</p>
                                    <p className="text-gray-500 mt-1">
                                        <strong>Hotel:</strong> {room.hotel}
                                    </p>
                                    <div className="mt-4">
                                        <span className="text-lg font-bold text-accent-500">
                                            ${room.pricePerNight}/night
                                        </span>
                                        <span
                                            className={`ml-4 px-3 py-1 text-xs rounded-full ${room.isAvailable
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
                                        {
                                            room.images.length > 1
                                                ?
                                                <ImageSlider images={room.images} />
                                                :
                                                <img
                                                    src={room.images[0] || demoRoom.image}
                                                    alt={`Room ${room.roomNumber}`}
                                                    className="w-full h-64 object-cover rounded-md"
                                                />
                                        }
                                    </div>
                                    <button
                                        onClick={handleBooking}
                                        className="mt-6 w-full bg-accent-500/90 text-slate-100 py-2 px-4 rounded-lg hover:bg-accent-500 transition duration-200"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
            }
        </div>
    );
};

export default RoomDetail;
