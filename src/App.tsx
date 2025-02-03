import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import { BookingContextProvider } from "./context/BookingContext.jsx";
import AppLayout from "./ui/AppLayout";
import AddHotel from "./features/hotels/AddHotel";
import UpdateHotel from "./features/hotels/UpdateHotel";
import Dashboard from "./features/dashboard/Dashboard";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import AllHotels from "./features/hotels/AllHotels";
import Account from "./features/profile/Account";
import ProtectRoutes from "./ui/ProtectRoutes";
import AllBookings from "./features/bookings/AllBookings";
import HotelBookings from "./features/bookings/HotelBookings";
import AllUsers from "./features/users/AllUsers";
import HotelUsers from "./features/users/HotelUsers";
import HotelRoomsTable from "./features/rooms/HotelRoomsTable";
import AddRoom from "./features/rooms/AddRoom";
import UpdateRoom from "./features/rooms/UpdateRoom";
import Settings from "./features/settings/Settings";
import {
  AboutPage,
  HomePage,
  HotelsListPage,
  SigninPage,
  SignupPage,
} from "./pages";
import RoomsListPage from "./pages/RoomsListPage";
import RoomListDetail from "./ui/RoomListDetail";
import Profile from "./features/profile/Profile";
import AccountSettings from "./features/profile/AccountSettings";
import MyBookings from "./features/profile/MyBookings";
import ResetMyPassword from "./features/profile/ResetMyPassword";
import ProtectAdminRoutes from "./ui/ProtectAdminRoutes";
import BookRoomPage from "./pages/BookRoomPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ForgotMyPassword from "./features/profile/ForgotMyPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetail from "./features/users/UserDetail.js";
import HotelsPage from "./features/hotels/HotelsPage.js";
import HotelDetailPage from "./features/hotels/HotelDetailPage.js";
import { HotelDetail } from "./features/hotels/components/HotelDetail.js";
import RoomDetail from "./features/hotels/RoomDetail.js";
import PublicHotelDetailPage from "./pages/hotel-details/HotelDetailPage.js";
import RoomList from "./features/hotels/HotelRooms.js";
import BookingPage from "./features/bookings/BookingPage.js";
import BookingDetails from "./features/bookings/BookingDetail.js";
const queryClient = new QueryClient();

function App() {
  const { role, isLoggedIn } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f8fafc",
            color: "#0f172a",
          },
        }}
      />

      <BookingContextProvider>
        <ToastContainer />
          <BrowserRouter>
            <Routes>
              {/* HOME ROUTES */}
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="hotels" element={<HotelsListPage />} />
              <Route path="hotels/:hotelId" element={<PublicHotelDetailPage />} >
                <Route index element={<HotelDetail />} />
                <Route path="rooms" element={<RoomList />} />
              </Route>
              <Route path="hotels/:hotelId/rooms/:roomId" element={<RoomDetail />} />
              <Route path="hotels/:hotelId/rooms/:roomId/book" element={<BookingPage />} />

                <Route path="hotels/:hotelId/rooms" element={<RoomsListPage />}>
                  <Route path=":roomId" element={<RoomListDetail />} />
                </Route>

                <Route
                  path="hotels/:hotelId/rooms/:roomId/booking"
                  element={
                    <ProtectRoutes>
                      <BookRoomPage />
                    </ProtectRoutes>
                  }
                />
                <Route
                  path={`payment-successful/:roomId`}
                  element={
                    <ProtectRoutes>
                      <PaymentSuccessPage />
                    </ProtectRoutes>
                  }
                />
                {isLoggedIn && (
                  <Route path="account" element={<Account />}>
                    <Route path="profile" index element={<Profile />} />
                    <Route path="settings" element={<AccountSettings />} />
                    <Route path="bookings" element={<MyBookings />} />
                  </Route>
                )}
              </Route>
              {/* DASHBOARD ROUTES */}
              <Route
                path="/dashboard"
                element={
                  <ProtectAdminRoutes>
                    <DashboardLayout />
                  </ProtectAdminRoutes>
                }
              >
              <Route index element={<Dashboard />} />
                {role === "admin" ? (
                  <>
                  <Route path="hotels" element={<HotelsPage />} >
                    <Route index element={<AllHotels />} />
                    <Route path="add-hotel" element={<AddHotel />} />
                    <Route path=":hotelId" element={<HotelDetailPage />} >
                      <Route index element={<HotelDetail />} />
                      <Route path="rooms" element={<HotelRoomsTable />} />
                      <Route path="rooms/:roomId" element={<RoomDetail />} />
                      <Route path="add-room" element={<AddRoom />} />
                      <Route path="update-room/:roomId" element={<UpdateRoom />} />
                    </Route>
                    <Route path=":hotelId/edit" element={<UpdateHotel />} />
                  </Route>
                  <Route path="bookings" element={<AllBookings />} />
                  <Route path="bookings/:bookingId" element={<BookingDetails />} />
                  <Route path="users" element={<AllUsers />} />
                  <Route path="users/:userId" element={<UserDetail />} />
                  </>
                ) : role === "manager" ? (
                  <>
                    <Route path="rooms" element={<HotelRoomsTable />} />
                    <Route path="rooms/:roomId" element={<RoomDetail />} />
                    <Route path="add-room" element={<AddRoom />} />
                    <Route path="rooms/edit/:roomId" element={<UpdateRoom />} />
                    <Route path="users" element={<HotelUsers />} />
                    <Route path="bookings" element={<HotelBookings />} />
                    <Route path="settings" element={<Settings />} />
                  </>
                ) : null}
              </Route>
              <Route path="/settings/:resetToken" element={<ResetMyPassword />} />
              <Route path="/login" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              {/* forgot pass */}
              <Route path="/forgot-password" element={<ForgotMyPassword />} />

              {/* NOT FOUND ROUTES */}
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>

      </BookingContextProvider>
    </QueryClientProvider>
  );
}

export default App;
