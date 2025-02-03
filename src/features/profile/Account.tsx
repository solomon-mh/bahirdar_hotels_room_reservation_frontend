import { Link, Outlet, useLocation } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { MdOutlineBookmarkAdded } from "react-icons/md";

const Account = () => {
  const { pathname } = useLocation();

  return (
    <div className="m-4 mx-auto flex max-h-[90rem] min-h-screen w-[90vw] max-w-[90rem] gap-2 rounded-xl border-2 shadow-lg">
      {/* SIDE BAR */}
      <ul className="w-[20%] space-y-2 flex flex-col gap-0 rounded-2xl border-r-2 p-4 text-gray-700 shadow-xl">
        <li >
          <Link
            to="profile"
            className={`flex w-full items-center gap-4 rounded-md px-4 py-2 text-lg shadow-lg transition-all duration-200 ${pathname === "/account/profile" ? "translate-x-2 font-bold text-accent-500" : "hover:translate-x-2 hover:text-accent-500/90"}`}
          >
            <VscAccount size={"24px"} />
            My Profile
          </Link>
        </li>
        <li >
          <Link
            to="settings"
            className={`flex w-full items-center gap-4 rounded-md px-4 py-2 text-lg shadow-lg transition-all duration-200 ${pathname === "/account/settings" ? "translate-x-2 font-bold text-accent-500" : "hover:translate-x-2 hover:text-accent-500/90"}`}
          >
            <FiSettings size="24px" />
            Settings
          </Link>
        </li>
        <li>
          <Link
            to="bookings"
            className={`mb-5 flex w-full items-center gap-4 rounded-md px-4 py-2 text-lg shadow-lg transition-all duration-200 ${pathname === "/account/bookings" ? "translate-x-2 font-bold text-accent-500" : "hover:translate-x-2 hover:text-accent-500/90"}`}
          >
            <MdOutlineBookmarkAdded size="24px" />
            My Bookings
          </Link>
        </li>
      </ul>

      {/* BODY | OUTLET */}
      <div className="flex-1 rounded-lg p-2 shadow-xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
