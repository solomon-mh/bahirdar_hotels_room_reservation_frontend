import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className=" flex min-h-screen gap-4  w-screen flex-col bg-white">
      <Header />
      <main className="flex-1 overflow-hidden flex flex-col items-center justify-center min-w-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
