import HeaderAccountMenu from "./HeaderAccountMenu";
import { useAuthContext } from "../context/AuthContext";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { CircleUserRound } from "lucide-react";
import { Role } from "../enums/roleEnum";

function HeaderAccount() {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  useOnClickOutside({
    handler: () => {
      setIsOpen(false);
    },
    refs: [menuRef, iconRef],
  });

  return (
    <div className="relative z-50">
      <div
        ref={iconRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center gap-2 hover:cursor-pointer"
      >
        <li>{(user?.role === Role.MANAGER && user?.hotel?.name) || ""}</li>
        <span className="text-black/50 text-sm font-semibold">
          {user?.role}
        </span>
        <div className="bg-slate-50 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
          {user?.profilePicture ? (
            <img
              className="h-full w-full object-cover object-center"
              src={user?.profilePicture}
              alt=""
            />
          ) : (
            <CircleUserRound />
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div
            ref={menuRef}
            className="border-black/10 bg-white text-black/50 absolute right-2 top-5 z-[100] mt-2 w-[13rem] rounded-md border-2 shadow-lg"
          >
            <HeaderAccountMenu />
          </div>
        </>
      )}
    </div>
  );
}

export default HeaderAccount;
