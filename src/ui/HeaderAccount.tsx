
import HeaderAccountMenu from "./HeaderAccountMenu";
import { useAuthContext } from "../context/AuthContext";
import { useRef, useState } from "react";
import { CircleUserRound } from "lucide-react";
import { Role } from "../enums/roleEnum";
import { useClickOutside } from "../components/lib/useClickOutSide";

function HeaderAccount() {
  const { user, } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef(null);
  const modalRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative z-30">
      <div
        ref={iconRef}
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-center gap-2 hover:cursor-pointer"
      >
        <li>
          {user?.role === Role.MANAGER && user?.hotel?.name}
        </li>
        <span className="text-sm font-semibold text-black/50">
          {user?.role}
        </span>
        <div className="flex h-7 w-7 md:h-10 md:w-10 items-center justify-center overflow-hidden rounded-full bg-slate-50">
          {user?.profilePicture ? (
            <img
              className="h-full w-full object-cover object-center"
              src={user?.profilePicture}
              alt=""
            />
          ) :
            (
              <CircleUserRound />
            )}
        </div>
      </div>
      {isOpen &&
          <>
            <div
          ref={modalRef}
          className="absolute right-2 top-5 z-[100] mt-4 w-[13rem] rounded-md border-2 border-black/10 bg-white text-black/50 shadow-lg"
            >
              <HeaderAccountMenu />
            </div>
        </>
      }
    </div>
  );
}

export default HeaderAccount;
