import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

function ProtectAdminRoutes({ children }: { children: React.ReactNode }) {
  const { role, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // IF NOT LOGGED IN NAVIGATE TO THE SIGN IN PAGE
    if (!isLoggedIn)
      navigate("/login", { replace: true });

    // IF IT IS LOGGED IN AND ROLE == USER, NAVIGATE THE HOME PAGE // BAD REQUEST
    if (isLoggedIn && role === "user")
    {
      toast.error("you do not have permission");
      navigate("/");
    }
  }, [isLoggedIn, role, navigate]);

  return isLoggedIn ? children : <div>You are not autheticated</div>;
}

export default ProtectAdminRoutes;
