import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelByIdQuery } from "../../redux/api/hotelApi";
import { useClickOutside } from "../../components/lib/useClickOutSide";

const HotelDetailNavigation = () => {
    const { hotelId, roomId } = useParams() as { hotelId: string, roomId: string };
    const { data: { data: hotel } = {}, isLoading, error } = useGetHotelByIdQuery(hotelId as string);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const modalRef = useClickOutside<HTMLDivElement>(() => setDropdownOpen(false));
    const navigate = useNavigate();

    return (
        <div className="relative flex justify-between items-center w-full   gap-4">
            {/* Back Button */}
            <div className="flex gap-4 md:hidden items-center">
                <button
                    className="flex md:hidden items-center justify-center gap-2 text-sm sm:text-base text-gray-600 hover:text-black"
                    onClick={() => navigate("/hotels")}
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <h2 className="text-lg  block md:hidden sm:text-2xl">
                    {hotel?.hotel.name}
                    {isLoading && <span>Loading...</span>}
                    {error && <span className="text-red-500">Error: Failed to fetch hotel</span>}
                </h2>
            </div>
            {/* View Detail Button */}
            <div className="hidden md:flex flex-col sm:flex-row items-center justify-between w-full shadow-md p-4 bg-white rounded-md">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    {/* Back Button */}
                    <button
                        className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600 hover:text-black"
                        onClick={() => navigate("/hotels")}
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>

                    {/* View Detail Button */}
                    <button
                        className="flex items-center justify-center gap-2 text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                        onClick={() => navigate(`/hotels/${hotelId}`)}
                    >
                        View Detail
                    </button>

                    {/* See Rooms Button */}
                    <button
                        className="flex items-center justify-center gap-2 text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                        onClick={() => navigate(`/hotels/${hotelId}/rooms`)}
                    >
                        See Rooms
                    </button>
                </div>

                {/* Hotel Name & Book Now */}
                <div className="flex gap-4 items-center px-4 w-full sm:w-auto">
                    <h2 className="text-xl sm:text-2xl">
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

            {/* Mobile Dropdown Button */}
            <div className="sm:hidden">
                <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                    {/* Hamburger icon for mobile */}
                    <span className={`text-2xl ${isDropdownOpen ? 'transform rotate-90' : ''}`}>☰</span>
                </button>

                {/* Dropdown Menu for mobile */}
                {isDropdownOpen && (
                    <div ref={modalRef} className="absolute top-12 z-50 left-0 bg-white border shadow-lg w-full flex flex-col items-center gap-4 py-2">
                        <button
                            className="text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                            onClick={() => navigate(`/hotels/${hotelId}`)}
                        >
                            View Detail
                        </button>
                        <button
                            className="text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                            onClick={() => navigate(`/hotels/${hotelId}/rooms`)}
                        >
                            See Rooms
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 text-sm sm:text-base hover:underline text-accent-500/90 hover:text-accent-500"
                            onClick={() => navigate(`/hotels/${hotelId}/rooms${roomId ? `/${roomId}/book` : ""}`)}
                        >
                            Book Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelDetailNavigation;
