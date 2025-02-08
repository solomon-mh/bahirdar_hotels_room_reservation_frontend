import { ArrowLeft } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";


const HotelDetailPage = () => {

    const { user } = useAuthContext()
    const { hotelId } = useParams<{ hotelId: string }>();
    const { pathname } = useLocation()
    const navigate = useNavigate();


    const isActive = (path: string) => {
        if (pathname === `/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}`)

            return pathname === path ? "text-accent-500 " : "text-slate-700"
        else
            return path.includes(pathname) ? "text-accent-500 " : "text-slate-700"
    }

    const navLinks = [
        {
            name: "Hotel Detail",
            to: `/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}`
        },
        {
            name: "Rooms",
            to: `/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/rooms`
        },
        {
            name: "Bookings",
            to: `/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/bookings`
        },
        {
            name: "Add Room",
            to: `/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/add-room`
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
                            <Link className={" hover:text-accent-500 hover:underline " + isActive(to)} key={index} to={to}>
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
