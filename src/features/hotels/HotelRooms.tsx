import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { useGetHotelRoomsQuery } from "../../redux/api/hotelApi";

const RoomList = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId: string }>();
  const { data, isLoading, error } = useGetHotelRoomsQuery(hotelId as string, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const rooms = data?.data?.rooms || [];

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-center text-2xl font-bold">Hotel Rooms</h1>
      </div>

      {isLoading ? (
        <LoadingPage />
      ) : error ? (
        <NotFoundPage>
          <p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </p>
        </NotFoundPage>
      ) : !rooms?.length ? (
        <NotFoundPage>
          <p className="text-slate-700">No rooms found</p>
        </NotFoundPage>
      ) : (
        <div className="sm:grid-cols- grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="flex transform flex-col justify-between overflow-hidden rounded-lg bg-white shadow-lg shadow-slate-200 transition-transform duration-300 hover:scale-105"
            >
              <div>
                <img
                  src={
                    room.images.length
                      ? room.images[0]
                      : "/hotel-images/img-2.jpg"
                  }
                  alt={`Room ${room.roomNumber}`}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    Room {room.roomNumber} - {room.roomType.toUpperCase()}
                  </h2>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-accent-500">
                      ${room.pricePerNight}/night
                    </span>
                    <span
                      className={`rounded-lg bg-green-100 px-2 py-1 text-xs text-green-500`}
                    >
                      {"Available"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Capacity: {room.capacity} persons
                  </div>
                  <div className="mt-2 flex justify-center gap-2 text-sm">
                    <strong>Amenities:</strong>
                    <span className="text-gray-700">
                      {room.roomFacilities.length > 3
                        ? room.roomFacilities.slice(0, 3).join(", ") + "..."
                        : room.roomFacilities.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-between p-4">
                <button
                  onClick={() => {
                    navigate(`/hotels/${room.hotel}/rooms/${room._id}`);
                  }}
                  className="rounded px-4 py-2 text-accent-500 transition hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    if (room.hotel && room._id)
                      navigate(
                        "/hotels/" +
                          room.hotel +
                          "/rooms/" +
                          room._id +
                          "/book",
                      );
                  }}
                  className="rounded bg-accent-500/90 px-4 py-2 text-slate-100 transition hover:bg-accent-500"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
