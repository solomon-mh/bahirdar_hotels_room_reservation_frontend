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
        className="lg:hidden text-slate-100 fixed top-6 left-4 z-50 p-2 bg-accent-500 rounded-full "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-slate-100  transform transition-transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:flex lg:flex-col lg:min-h-screen lg:gap-2 lg:py-4`}
      >
        <Logo className=" px-4 py-3" />

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
      {isOpen && <div className="fixed inset-0 bg-[#454545]/50 z-30 lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}

export default SideBar;
