import { ArrowLeft } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";


const HotelDetailPage = () => {

    const { hotelId } = useParams<{ hotelId: string }>();
    const { pathname } = useLocation()
    const navigate = useNavigate();
    const navLinks = [
        {
            name: "Hotel Detail",
            to: `/dashboard/hotels/${hotelId}`
        },
        {
            name: "Rooms",
            to: `/dashboard/hotels/${hotelId}/rooms`
        },
        {
            name: "Add Room",
            to: `/dashboard/hotels/${hotelId}/add-room`
        },
    ]
    return (
        <div className="w-[80vw] mx-auto flex flex-col items-center">
            <div className="flex flex-col gap-3 items-center w-full">
                <div className="flex gap-2 px-4 py-3 shadow-md items-center w-full">
                    <button
                        onClick={() => {
                            const to: string[] = pathname.split("/") as unknown as string[]
                            to.pop()
                            navigate(to.join("/"))
                        }}
                        className="flex items-center gap-2 hover:text-accent-500"
                    >
                        <ArrowLeft size={24} /> <span>Back</span>
                    </button>
                    {
                        navLinks.map(({ to, name }, index) => (
                            <Link className="text-slate-700 hover:text-accent-500 hover:underline" key={index} to={to}>
                                {
                                    name
                                }
                            </Link>
                        ))
                    }
                </div>
                <div className="flex w-full">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default HotelDetailPage
