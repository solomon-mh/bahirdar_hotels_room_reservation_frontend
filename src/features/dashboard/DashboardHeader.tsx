// import { HiOutlineSearch } from "react-icons/hi";
import { useAuthContext } from "../../context/AuthContext";
import HeaderAccount from "../../ui/HeaderAccount";

function DashboardHeader() {
  const { role, user } = useAuthContext();
  return (
    <div className="md:-ml-4 w-full flex h-24 items-center justify-between bg-slate-100 px-8 py-4">
      <p className="md:text-2xl md:pl-0 pl-10 font-bold">

        {role === "admin" ? "Admin Dashboard" : user?.hotel?.name}
      </p>
      <HeaderAccount />
    </div>
  );
}

export default DashboardHeader;
