import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../ui/Logo";

interface Props {
  menus: { title: string; url: string; Icon: JSX.Element }[];
}

function SideBar({ menus }: Props) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="text-white fixed left-4 top-4 z-50 rounded-full bg-accent-500 p-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`text-white fixed inset-y-0 left-0 z-40 w-[260px] transform bg-slate-100 transition-transform md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:flex md:min-h-screen md:flex-col md:gap-2 md:py-4`}
      >
        <Logo className="text-white px-4 py-3" />

        <hr className="border-b-2 border-gray-700" />

        <nav className="mt-4 capitalize transition">
          <ul>
            {menus.map((menu, i) => (
              <li key={i}>
                <Link
                  className={
                    "flex items-center gap-3 rounded-sm px-5 py-2 hover:bg-accent-400 hover:text-slate-100 " +
                    ((pathname === "/dashboard" && pathname === menu.url) ||
                    (menu.url !== "/dashboard" && pathname.startsWith(menu.url))
                      ? " bg-accent-500 text-slate-100"
                      : "")
                  }
                  to={menu.url}
                  onClick={() => setIsOpen(false)} // Close on link click in mobile view
                >
                  <span
                    className={
                      "text-accent-500" +
                      ((pathname === "/dashboard" && pathname === menu.url) ||
                      (menu.url !== "/dashboard" &&
                        pathname.startsWith(menu.url))
                        ? " text-slate-100"
                        : "")
                    }
                  >
                    {menu.Icon}
                  </span>
                  <span>{menu.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay when sidebar is open in mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#454545]/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SideBar;
