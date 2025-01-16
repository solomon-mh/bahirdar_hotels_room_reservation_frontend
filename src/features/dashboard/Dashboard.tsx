import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import { useEffect } from "react";

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
  ) : role === "manager" ? (
    <ManagerDashboard />
  ) : (
    <div>Role Not Found</div>
  );
}

export default Dashboard;
