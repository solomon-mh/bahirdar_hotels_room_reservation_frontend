import { Outlet } from "react-router-dom";
import { AccountSidebar } from "./components/AccountSidebar";

export interface IDataAccountSidebar {
  to: string;
  pathname: string;
  text: string;
}

export const dataAccountSidebar: IDataAccountSidebar[] = [
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
    to: "complete-onboarding",
    pathname: "/account/complete-onboarding",
    text: "Complete Onboarding",
  },
  {
    to: "identity-verification",
    pathname: "/account/identity-verification",
    text: "Identity Verification",
  },
];

const Account = () => {


  return (
    <div className="md:mx-auto w-full  flex min-h-screen md:w-[90vw] gap-2 rounded-xl bg-light-100">
      {/* SIDE BAR */}
      <AccountSidebar data={dataAccountSidebar} />
      {/* BODY | OUTLET */}
      <div className="flex-1 p-2 px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
