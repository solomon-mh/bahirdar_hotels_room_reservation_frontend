import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelByIdQuery } from "../../redux/api/hotelApi";
import { useClickOutside } from "../../components/lib/useClickOutSide";

const HotelDetailNavigation = () => {
  const { hotelId, roomId } = useParams() as {
    hotelId: string;
    roomId: string;
  };
  const {
    data: { data: hotel } = {},
    isLoading,
    error,
  } = useGetHotelByIdQuery(hotelId as string);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() =>
    setDropdownOpen(false),
  );
  const navigate = useNavigate();

  return (
    <div className="relative flex w-full items-center justify-between gap-4">
      {/* Back Button */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          className="hover:text-black flex items-center justify-center gap-2 text-sm text-gray-600 sm:text-base md:hidden"
          onClick={() => navigate("/hotels")}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h2 className="block text-lg sm:text-2xl md:hidden">
          {hotel?.hotel.name}
          {isLoading && <span>Loading...</span>}
          {error && (
            <span className="text-red-500">Error: Failed to fetch hotel</span>
          )}
        </h2>
      </div>
      {/* View Detail Button */}
      <div className="hidden w-full flex-col items-center justify-between rounded-md bg-white p-4 sm:flex-row md:flex">
        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          {/* Back Button */}
          <button
            className="hover:text-black flex items-center justify-center gap-2 text-sm text-gray-600 sm:text-base"
            onClick={() => navigate("/hotels")}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          {/* View Detail Button */}
          <button
            className="flex items-center justify-center gap-2 text-sm text-accent-500/90 hover:text-accent-500 hover:underline sm:text-base"
            onClick={() => navigate(`/hotels/${hotelId}`)}
          >
            View Detail
          </button>

          {/* See Rooms Button */}
          <button
            className="flex items-center justify-center gap-2 text-sm text-accent-500/90 hover:text-accent-500 hover:underline sm:text-base"
            onClick={() => navigate(`/hotels/${hotelId}/rooms`)}
          >
            See Rooms
          </button>
        </div>

        {/* Hotel Name & Book Now */}
        <div className="flex w-full items-center gap-4 px-4 sm:w-auto">
          <h2 className="text-xl sm:text-2xl">
            {hotel?.hotel.name}
            {isLoading && <span>Loading...</span>}
            {error && (
              <span className="text-red-500">Error: Failed to fetch hotel</span>
            )}
          </h2>
          <button
            className="flex items-center justify-center gap-2 text-sm text-accent-500/90 hover:text-accent-500 hover:underline sm:text-base"
            onClick={() =>
              navigate(
                `/hotels/${hotelId}/rooms${roomId ? `/${roomId}/book` : ""}`,
              )
            }
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Button */}
      <div className="sm:hidden">
        <button
          className="hover:text-black text-gray-600"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {/* Hamburger icon for mobile */}
          <span
            className={`text-2xl ${isDropdownOpen ? "rotate-90 transform" : ""}`}
          >
            ☰
          </span>
        </button>

        {/* Dropdown Menu for mobile */}
        {isDropdownOpen && (
          <div
            ref={modalRef}
            className="absolute left-0 top-12 z-50 flex w-full flex-col items-center gap-4 border bg-white py-2 shadow-lg"
          >
            <button
              className="text-sm text-accent-500/90 hover:text-accent-500 hover:underline sm:text-base"
              onClick={() => navigate(`/hotels/${hotelId}`)}
            >
              View Detail
            </button>
            <button
              className="text-sm text-accent-500/90 hover:text-accent-500 hover:underline sm:text-base"
              onClick={() => navigate(`/hotels/${hotelId}/rooms`)}
            >
              See Rooms
            </button>
            <button
              className="flex items-center justify-center gap-2 text-sm text-accent-500/90 hover:text-accent-500 hover:underline sm:text-base"
              onClick={() =>
                navigate(
                  `/hotels/${hotelId}/rooms${roomId ? `/${roomId}/book` : ""}`,
                )
              }
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
