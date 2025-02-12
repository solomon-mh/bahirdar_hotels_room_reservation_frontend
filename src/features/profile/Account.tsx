import { Outlet } from "react-router-dom";
import { AccountSidebar } from "./components/AccountSidebar";
import { useAuthContext } from "@/context/AuthContext";
import { useGetMyBookingsQuery } from "@/redux/api/userApi";
import { Role } from "@/enums/roleEnum";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";

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
    to: "identity-verification",
    pathname: "/account/identity-verification",
    text: "Identity Verification",
  },
];

const Account = () => {

  const { user } = useAuthContext()
  const { data: { data: { bookings } = {} } = {}, isLoading, error } = useGetMyBookingsQuery()
  //   const { data: { date: reviews } = {} } = []
  // } = useGetAllReviewsQuery()

  if (isLoading)
  {
    return (
      <div className="flex">
        <p>Loading...</p>
      </div>
    )
  }


  return (
    <div className="md:mx-auto w-full  flex min-h-screen md:w-[90vw] gap-2 rounded-xl bg-light-100">
      {/* SIDE BAR */}
      <AccountSidebar data={
        [
          ...(dataAccountSidebar.slice(0, 3)),
          {
            to: user?.isVerified ? "edit-profile" : "complete-onboarding",
            pathname: user?.isVerified ? "/account/edit-profile" : "/account/complete-onboarding",
            text: user?.isVerified ? "Edit Profile" : "Complete Onboarding",
          },
          dataAccountSidebar[3],
          ...(
            (user?.role === Role.USER && !error && bookings?.some(booking => booking.isPaid && booking._id)) ?
              [
                {
                  to: "wallet",
                  pathname: "/account/wallet",
                  text: "Wallet",
                }
              ] : []
          )
        ]
      }
      />
      {/* BODY | OUTLET */}
      <div className="flex-1 p-2 px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
