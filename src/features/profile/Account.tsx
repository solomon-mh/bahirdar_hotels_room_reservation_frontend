import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { AccountSidebar } from "./components/AccountSidebar";

export interface IDataAccountSidebar {
  to: string;
  pathname: string;
  text: string;
}

const dataAccountSidebar: IDataAccountSidebar[] = [
  {
    to: "profile",
    pathname: "/account/profile",
    text: "My Profile",
  },
  {
    to: "bookings",
    pathname: "/account/bookings",
    text: "My Bookings",
  },
  {
    to: "settings",
    pathname: "/account/settings",
    text: "Settings",
  },
  {
    to: "identity-verification",
    pathname: "/account/identity-verification",
    text: "Identity Verification",
  },
];

const Account = () => {
  // get user from the context
  const { user } = useAuthContext();

  console.log(user);

  return (
    <div className="mx-auto flex min-h-screen w-[90vw] gap-2 rounded-xl bg-light-100">
      {/* SIDE BAR */}
      <AccountSidebar data={dataAccountSidebar} />
      {/* BODY | OUTLET */}
      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
