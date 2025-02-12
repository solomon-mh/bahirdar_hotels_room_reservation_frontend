import { ArrowLeft, Menu, X } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";
import { useGetHotelByIdQuery } from "../../redux/api/hotelApi";
import { useState } from "react";
import { useClickOutside } from "../../components/lib/useClickOutSide";


const HotelDetailPage = () => {

    const modalRef = useClickOutside<HTMLDivElement>(() => setShowModal(false))
    const [showModal, setShowModal] = useState(false)
    const { user } = useAuthContext()
    const { hotelId } = useParams<{ hotelId: string }>();
    const { data: { data: hotel } = {} } = useGetHotelByIdQuery(hotelId as string)
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
        ...(
            user?.role !== Role.CASHIER ?

                [{
            name: "Add Room",
            to: `/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/add-room`
                }]
                : []
        )
    ]
    return (
        <div className="md:w-[80vw] w-full md:mx-auto flex flex-col items-center">
            <div className="flex relative flex-col gap-3 items-center w-full">
                <div className="flex  items-center justify-between w-full px-3  shadow-md">
                    <div className="flex justify-start gap-2 px-4 py-3 items-center ">
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
                        <div className="hidden md:flex items-center gap-3">
                            {
                                navLinks.map(({ to, name }, index) => (
                                    <Link

                                        className={" hover:text-accent-500 hover:underline " + isActive(to)} key={index} to={to}>
                                        {
                                            name
                                        }
                                    </Link>

                                ))
                            }
                        </div>
                    </div>
                    <div className="flex justify-self-end items-center gap-2 justify-center text-accent-500 underline">
                        <a
                            href={`/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}`}
                            rel="noreferrer"
                        >
                            {hotel?.hotel.name}
                        </a>
                        <div className="flex md:hidden items-center gap-3">
                            <button>
                                <Menu size={24} onClick={() => setShowModal(!showModal)} />
                            </button>
                            {
                                showModal && (
                                    <div ref={modalRef} className="absolute w-full z-50 pt-12 right-0 left-0  flex flex-col gap-2top-0 mt-12 bg-white shadow-md p-4 rounded-md">
                                        <button className="top-3 right-3 text-accent-500 absolute" onClick={() => setShowModal(!showModal)}>
                                            <X size={24} />
                                        </button>
                                        {
                                            navLinks.map(({ to, name }, index) => (
                                                <Link
                                                    onClick={() => setShowModal(false)}
                                                    className={"  hover:bg-accent-500 hover:text-white hover:underline " + isActive(to)} key={index} to={to}>
                                                    {
                                                        name
                                                    }
                                                </Link>

                                            ))
                                        }
                                    </div>
                                )

                            }
                        </div>
                    </div>


                </div>
                <div className="flex w-full">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default HotelDetailPage
