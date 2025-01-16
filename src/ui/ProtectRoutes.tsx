import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

function ProtectRoutes({ children }: { children: React.ReactNode }) {
  const { role, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn)
      navigate("/login");
  }, [isLoggedIn, role, navigate]);

  return isLoggedIn ? children : <div>You are not authenticated</div>;
}

export default ProtectRoutes;
