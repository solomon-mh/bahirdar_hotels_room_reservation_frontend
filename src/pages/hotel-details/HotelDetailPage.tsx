import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetHotelByIdQuery } from "../../redux/api/hotelApi";

const PublicHotelDetailPage = () => {
    const navigate = useNavigate();
    const { hotelId, roomId } = useParams() as { hotelId: string, roomId: string };
    const { data: { data: hotel } = {}, isLoading, error } = useGetHotelByIdQuery(hotelId as string)


    return (
        <div className="flex flex-col px-4 w-auto md:w-[90vw] sm:px-6 md:px-20 items-center justify-start gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row  items-center justify-between w-full shadow-md p-4 bg-white rounded-md">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                        className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600 hover:text-black"
                        onClick={() => navigate("/hotels")}
                    >
                        <ArrowLeft size={20} className="" />
                        <span>Back</span>
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                        onClick={() => navigate(`/hotels/${hotelId}`)}
                    >
                        View Detail
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                        onClick={() => navigate(`/hotels/${hotelId}/rooms`)}
                    >
                        See Rooms
                    </button>
                </div>
                <div className="flex  gap-4 items-center px-4">
                    <h2>
                        {hotel?.hotel.name}
                        {isLoading && <span>Loading...</span>}
                        {error && <span className="text-red-500">Error: Failed to fetch hotel</span>}
                    </h2>
                    <button
                        className="flex items-center justify-center gap-2 text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                        onClick={() => navigate(`/hotels/${hotelId}/rooms${roomId ? `/${roomId}/book` : ""}`)}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* Outlet Section */}
            <div className="flex w-full flex-col items-center md:px-2">
                <Outlet />
            </div>
        </div>
    );
};

export default PublicHotelDetailPage;
