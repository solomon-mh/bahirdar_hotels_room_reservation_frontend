import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const UserPage = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const navilinks = [
        {
            title: "User Detail",
            href: "/dashboard/users/" + userId,
        },
        {
            title: "User Bookings",
            href: "/dashboard/users/" + userId + "/bookings",
        },
        {
            title: "User Reviews",
            href: "/dashboard/users/:userId/reviews",
        }
    ]

    return (
        <div className="flex gap-4 w-full p-6 flex-col px-10">
            <div className="flex w-full items-center p-2 gap-3 shadow-md shadow-slate-200">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <div className="flex items-center gap-2">
                    {navilinks.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(link.href)}
                            className="text-slate-800 hover:underline hover:text-accent-500"
                        >
                            {link.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex">
                <Outlet />
            </div>
        </div>
    );
};

export default UserPage;
