import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import DashboardHeader from "./DashboardHeader";

import {
  HiOutlineHome,
  HiBuildingLibrary,
  HiOutlineCalendarDays,
  HiOutlineUsers,
} from "react-icons/hi2";
import { MdOutlineBookmarkAdded, MdSettings } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const adminMenus = [
  {
    title: "Home",
    url: "/dashboard",
    Icon: <HiOutlineHome size={20} />,
  },
  {
    title: "Hotels",
    url: "/dashboard/hotels",
    Icon: <HiBuildingLibrary size={20} />,
  },
  {
    title: "Bookings",
    url: "/dashboard/bookings",
    Icon: <HiOutlineCalendarDays size={20} />,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    Icon: <HiOutlineUsers size={20} />,
  },
  {
    title: "identity verification",
    url: "/dashboard/identity-verification-requests",
    Icon: <HiOutlineUsers size={20} />,
  },
];

function DashboardLayout() {
  const navigate = useNavigate();
  const { role, isLoggedIn } = useAuthContext();

  const { user } = useAuthContext();
  const managerMenus = [
    {
      title: "Home",
      url: "/dashboard",
      Icon: <HiOutlineHome size={20} />,
    },
    {
      title: "Rooms",
      url: `/dashboard/${user?.hotel?._id}/rooms`,
      Icon: <IoBedSharp size={20} />,
    },
    {
      title: "Bookings",
      url: `/dashboard/${user?.hotel?._id}/bookings`,
      Icon: <MdOutlineBookmarkAdded size={20} />,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      Icon: <HiOutlineUsers size={20} />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      Icon: <MdSettings size={20} />,
    },
  ];

  useEffect(() => {
    if (!isLoggedIn)
    {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-black mx-auto flex max-w-[120rem] gap-2">
      {role === "admin" ? (
        <SideBar menus={adminMenus} />
      ) : role === "manager" ? (
        <SideBar menus={managerMenus} />
      ) : null}
      <div className="bg-slate-50 flex min-h-screen w-screen flex-col gap-2 text-gray-700 md:w-[calc(100vw-260px)]">
        <DashboardHeader />
        <main className="overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
