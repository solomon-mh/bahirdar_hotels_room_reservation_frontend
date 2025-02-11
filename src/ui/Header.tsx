import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaArrowRight, FaBars } from "react-icons/fa6";
import HeaderAccount from "./HeaderAccount";
import { useAuthContext } from "../context/AuthContext";
import Logo from "./Logo";
import { cn } from "../utils/cn";
import { Role } from "../enums/roleEnum";
import { FaTimes } from "react-icons/fa";
import { useClickOutside } from "../components/lib/useClickOutSide";
import { dataAccountSidebar } from "@/features/profile/Account";
import { useLogoutMutation } from "@/redux/api/authApi";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";

function Header() {

  const [logout, { isLoading }] = useLogoutMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => setMenuOpen(false));
  const { isLoggedIn, user } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <section className="z-50 mx-auto w-full  bg-accent-50 drop-shadow-md shadow-accent-300 border-b px-4 md:px-12">
      <header className="mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <Logo />

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden z-50 text-accent-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <ul className=" gap-2 hidden md:flex">

          {
            user?.role === Role.USER && (
              <>
                <li className={cn(
                  " w-full   hover:bg-accent-500  hover:text-white rounded px-3 py-2",
                  pathname === '/hotels' && "text-slate-100 bg-accent-500"
                )}>
                  <Link
                    to="/hotels"
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded px-3 py-2",
                      pathname === "/hotels" && "text-slate-100 bg-accent-500"
                    )}
                  >
                    Hotels
                  </Link>
                </li>
                <li className={cn(
                  " w-full   hover:bg-accent-500  hover:text-white rounded px-3 py-2",
                  pathname === '/about' && "text-slate-100 bg-accent-500"
                )}>
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded px-3 py-2",
                      pathname === "/about" && "text-slate-100 bg-accent-500"
                    )}
                  >
                    About
                  </Link>
                </li>
              </>
            )
          }
          <li className="hidden md:inline">
            <HeaderAccount />
          </li>
        </ul>
        <div className={cn("flex fixed top-0 left-4 bottom-0 right-0 w-full h-[100vh] bg-slate-900 bg-opacity-50 z-40 md:hidden", menuOpen ? "block" : "hidden")}>
          <nav
            ref={modalRef}
            className={cn(
              "absolute top-0 py-6 h-[100vh] right-0 w-[80%] bg-slate-100 shadow-md md:static md:shadow-none flex md:hidden",
              menuOpen ? "block" : "hidden"
            )}
          >
            <ul className="flex flex-col items-center gap-1 w-full  py-4 px-2 md:flex-row md:p-0">
              {
                isLoggedIn && dataAccountSidebar.map((link) => {
                  return (
                    <li
                      className={cn(
                        "block w-full md:hidden  hover:bg-accent-500  hover:text-white rounded px-3 py-2",
                        pathname === link.pathname && "text-slate-100 bg-accent-500"
                      )}
                      key={link.to}>
                      <Link
                        onClick={() => setMenuOpen(false)}
                        to={link.pathname}
                        className={cn(
                          "rounded px-3 py-2",
                          pathname === link.pathname && "text-slate-100 bg-accent-500"
                        )}
                      >
                        {link.text}
                      </Link>
                    </li>
                  );
                })
              }
              <li className={cn(
                "block w-full md:hidden  hover:bg-accent-500  hover:text-white rounded px-3 py-2",
                pathname === '/hotels' && "text-slate-100 bg-accent-500"
              )}>
                <Link
                  to="/hotels"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded px-3 py-2",
                    pathname === "/hotels" && "text-slate-100 bg-accent-500"
                  )}
                >
                  Hotels
                </Link>
              </li>
              <li className={cn(
                "block w-full md:hidden  hover:bg-accent-500  hover:text-white rounded px-3 py-2",
                pathname === '/about' && "text-slate-100 bg-accent-500"
              )}>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded px-3 py-2",
                    pathname === "/about" && "text-slate-100 bg-accent-500"
                  )}
                >
                  About
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  {(user!.role === Role.ADMIN || user!.role === Role.MANAGER) && (
                    <li
                      className={cn(
                        "block w-full md:hidden  hover:bg-accent-500  hover:text-white rounded px-3 py-2",
                        pathname === '/dashboard' && "text-slate-100 bg-accent-500"
                      )}
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                        <FaArrowRight />
                      </Link>
                    </li>
                  )}


                  <li className={cn(
                    "block w-full md:hidden  rounded  ",
                  )}>
                    <button
                      disabled={isLoading}
                      onClick={() => {
                        logout()
                          .unwrap()
                          .then(() => {
                            window.location.href = "/";
                          })
                          .catch((err) => {
                            if ("data" in err)
                            {
                              toast.error(
                                err.data.message || "Something went wrong. Please try again"
                              );
                            } else
                            {
                              toast.error("An error occurred. Please try again");
                            }
                          });
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-100 rounded-md disabled:cursor-not-allowed disabled:bg-gray-200"
                    >
                      <IoIosLogOut size="20px" />
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2 text-slate-100"
                  >
                    Sign In
                    <FaArrowRight />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        {/* Navigation Menu */}
      </header>
    </section>
  );
}

export default Header;
