import { BASE_URL } from "@/utils/url";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="mx-auto my-4 flex w-[85%] items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition-all duration-200 hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <FcGoogle className="text-xl" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
