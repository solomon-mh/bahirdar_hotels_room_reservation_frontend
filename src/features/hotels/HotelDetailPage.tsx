import { Outlet, useParams } from "react-router-dom";


const HotelDetailPage = () => {

    const { id } = useParams<{ id: string }>();
    const navLinks = [
        {
            name: "Hotel Detail",
            to: "/dashboard/hotels/" + id
        },
        {
            name: "Rooms",
            to: id + "/rooms"
        },
        {
            name: "Add Room",
            to: id + "/add-room"
        },
    ]
    return (
        <div className="w-[80vw] mx-auto flex flex-col items-center">
            <div className="flex flex-col items-center w-full">
                <div className="flex">
                    {
                        navLinks.map((link, index) => (
                            <a key={index} href={link.to} className="p-4 bg-white shadow-md rounded-lg mx-2">{link.name}</a>
                        ))
                    }
                </div>
                <div className="flex">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default HotelDetailPage
