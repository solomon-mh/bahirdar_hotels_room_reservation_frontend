import { Outlet } from "react-router-dom";
import HotelDetailNavigation from "./HotelNavBar";
const PublicHotelDetailPage = () => {

    return (
        <div className="flex flex-col px-4 w-auto md:w-[90vw] sm:px-6 md:px-20 items-center justify-start gap-6 p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full shadow-md p-4 bg-white rounded-md">
                <HotelDetailNavigation
                />

                {/* Hotel Name & Book Now */}

            </div>

            {/* Outlet Section */}
            <div className="flex w-full flex-col items-center md:px-2 mt-6">
                <Outlet />
            </div>
        </div>
    );
};

export default PublicHotelDetailPage;
