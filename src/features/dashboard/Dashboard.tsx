import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import { useEffect } from "react";
import { Role } from "@/enums/roleEnum";

function Dashboard() {
  const { role } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!role)
    {
      navigate("/");
    }
  }, [navigate, role]);
  return role === "admin" ? (
    <AdminDashboard />
  ) : (role === Role.MANAGER || role === Role.CASHIER) ? (
    <ManagerDashboard />
  ) : (
    <div>Role Not Found</div>
  );
}

export default Dashboard;
