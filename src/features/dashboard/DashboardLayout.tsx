import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import DashboardHeader from "./DashboardHeader";
import { HiOutlineHome, HiBuildingLibrary, HiOutlineCalendarDays, HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineBookmarkAdded, MdSettings } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { IUser } from "../../types/userTypes";

// Menu items for admin role
const adminMenus = [
  { title: "Home", url: "/dashboard", Icon: <HiOutlineHome size={20} /> },
  { title: "Hotels", url: "/dashboard/hotels", Icon: <HiBuildingLibrary size={20} /> },
  { title: "Bookings", url: "/dashboard/bookings", Icon: <HiOutlineCalendarDays size={20} /> },
  { title: "Users", url: "/dashboard/users", Icon: <HiOutlineUsers size={20} /> },
];

// Menu items for manager role (dynamic based on user hotel information)
function getManagerMenus(user: IUser | null) {
  return [
    { title: "Home", url: "/dashboard", Icon: <HiOutlineHome size={20} /> },
    { title: "Rooms", url: `/dashboard/${user?.hotel?._id}/rooms`, Icon: <IoBedSharp size={20} /> },
    { title: "Bookings", url: `/dashboard/${user?.hotel?._id}/bookings`, Icon: <MdOutlineBookmarkAdded size={20} /> },
    { title: "Users", url: "/dashboard/users", Icon: <HiOutlineUsers size={20} /> },
    { title: "Settings", url: "/dashboard/settings", Icon: <MdSettings size={20} /> },
  ];
}

function DashboardLayout() {
  const navigate = useNavigate();
  const { role, isLoggedIn, user } = useAuthContext(); // Destructuring from AuthContext

  // Redirect to login page if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn)
    {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // Select menu items based on role
  const menus = role === "admin" ? adminMenus : role === "manager" ? getManagerMenus(user) : [];

  return (
    <div className="mx-auto flex gap-2 max-w-[120rem] bg-black">
      {/* Sidebar rendering based on role */}
      {menus.length > 0 && <SideBar menus={menus} />}

      {/* Main content area */}
      <div className="flex min-h-screen gap-2 w-screen lg:w-[calc(100vw-260px)] flex-col bg-slate-50 text-gray-700">
        <DashboardHeader />
        <main className="overflow-auto">
          {/* Render the content dynamically based on the route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
