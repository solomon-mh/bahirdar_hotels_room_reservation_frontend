import { useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { useGetAllRoomsQuery } from "../../redux/api/roomsApi";


const RoomList = () => {
    const navigate = useNavigate();
    const { data: { data: rooms } = {}, isLoading, error } = useGetAllRoomsQuery("")
    return (
        <div className="p-4 bg-gray-100 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-center mb-6">Hotel Rooms</h1>
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
                            <NotFoundPage>
                                <p>
                                    <pre>
                                        {
                                            JSON.stringify(error, null, 2)
                                        }
                                    </pre>
                                </p>
                            </NotFoundPage>
                        )

                        :
                        !rooms?.length
                            ?
                            <NotFoundPage>
                                <p className="text-slate-700">No rooms found</p>
                            </NotFoundPage>
                            :

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {rooms.map((room) => (
                                    <div
                                        key={room._id}
                                        className="bg-white shadow-lg shadow-slate-200 flex flex-col justify-between rounded-lg overflow-hidden"
                                    >
                                        <div>

                                            <img
                                                src={room.images.length ? room.images[0] : "/hotel-images/img-2.jpg"}
                                                alt={`Room ${room.roomNumber}`}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <h2 className="text-lg font-semibold">
                                                    Room {room.roomNumber} - {room.roomType.toUpperCase()}
                                                </h2>
                                                {/* <p className="text-gray-600">{room.description}</p> */}
                                                <p className="text-sm text-gray-500">
                                                    Hotel: {room.hotel}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-accent-500 font-bold">
                                                        ${room.pricePerNight}/night
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${!room.isAvailable
                                                            ? "bg-green-100 text-green-500"
                                                            : "bg-red-100 text-red-500"
                                                            }`}
                                                    >
                                                        {room.isAvailable ? "Available" : "Unavailable"}
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-sm text-gray-600">
                                                    Capacity: {room.capacity} persons
                                                </div>
                                                <div className="mt-2 flex flex-row text-sm">
                                                    <div className="flex  justify-center gap-2">
                                                        <strong>Amenities:</strong>{" "}
                                                        <span className="text-gray-700">
                                                            {room.roomFacilities.join(", ")}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex  p-4 ">
                                            <button
                                                onClick={() => {
                                                    navigate(`/hotels/${room.hotel}/rooms/${room._id}`)
                                                }
                                                }

                                                className="  px-4 py-2 rounded text-accent-500 hover:underline transition"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (room.hotel && room._id)
                                                        navigate("/hotels/" + room.hotel + "/rooms/" + room?._id + "/book"); // Example route
                                                }}
                                                className="bg-accent-500/90 text-slate-100 px-4 py-2 rounded hover:bg-accent-500 transition"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
            }
        </div>
    );
};

export default RoomList;
