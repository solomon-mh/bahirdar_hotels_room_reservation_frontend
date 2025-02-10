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

function Header() {
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
          className="block md:hidden text-accent-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Menu */}
        <nav
          ref={modalRef}
          className={cn(
            "absolute top-full left-0 w-full bg-slate-100 shadow-md md:static md:shadow-none md:flex md:w-auto",
            menuOpen ? "block" : "hidden"
          )}
        >
          <ul className="flex flex-col items-center gap-4 p-4 md:flex-row md:p-0">
            <li>
              <Link
                to="/hotels"
                className={cn(
                  "rounded px-3 py-2",
                  pathname === "/hotels" && "text-accent-500"
                )}
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={cn(
                  "rounded px-3 py-2",
                  pathname === "/about" && "text-accent-700"
                )}
              >
                About
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                {(user!.role === Role.ADMIN || user!.role === Role.MANAGER) && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2 text-white"
                    >
                      Dashboard
                      <FaArrowRight />
                    </Link>
                  </li>
                )}

                <li>
                  <HeaderAccount />
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
      </header>
    </section>
  );
}

export default Header;
