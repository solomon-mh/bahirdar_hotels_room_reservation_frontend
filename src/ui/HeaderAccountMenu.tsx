import { VscAccount } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { useLogoutMutation } from "../redux/api/authApi";
import { toast } from "react-toastify";

const links = [
  {
    title: "Profile",
    icon: <VscAccount size={"20px"} />,
    to: "/account/profile",
  },
  {
    title: "Settings",
    icon: <FiSettings size="20px" />,
    to: "/account/settings",
  },
  {
    title: "My Bookings",
    icon: <MdOutlineBookmarkAdded size="20px" />,
    to: "/account/bookings",
  },
  {
    title: "Dashboard",
    icon: <LuLayoutDashboard size="20px" />,
    to: "/dashboard",
  },
  {
    title: "Sign Out",
    icon: <IoIosLogOut size="20px" />,
    to: "/",
  },
];

function HeaderAccountMenu() {
  const { role, handleOpenModal } = useAuthContext();
  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <ul className="flex flex-col bg-slate-100">
      {links.map((link) => {
        if (link.title === "Sign Out") {
          return (
            <li key={link.title}>
              <button
                disabled={isLoading}
                onClick={() => {
                  logout().unwrap().then(() => {
                    window.location.href = "/";

                  }).catch((err) => {
                    if ('data' in err)
                    {
                      toast.error(err.data.message || "Something went wrong Please try again");
                    }
                    else
                    {
                      toast.error("An error occurred please try again");
                    }
                  });
                }}
                className="mt-2 flex  w-full items-center justify-start gap-2 rounded-md px-3 py-2 font-bold transition duration-300 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {link.icon}
                {link.title}
              </button>
            </li>
          );
        }

        if (link.title === "Dashboard") {
          if (role !== "admin" && role !== "manager") {
            return null;
          }
        }

        return (
          <li
            key={link.title}
            className="rounded-md transition duration-300 hover:cursor-pointer hover:bg-slate-200"
          >
            {
              <Link
                to={link.to}
                onClick={() => handleOpenModal()}
                className="flex items-center justify-start gap-2 p-3 py-2"
              >
                {link.icon}
                <p>{link.title}</p>
              </Link>
            }
          </li>
        );
      })}
    </ul>
  );
}

export default HeaderAccountMenu;
