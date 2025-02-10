import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import Logo from "../../ui/Logo";
import { useLoginMutation } from "../../redux/api/authApi";
import { ILogin } from "../../types/authTypes";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

function SigninPage() {
  const { setUser } = useAuthContext()

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation()
  const onSubmitHandler = handleSubmit(async (data) => {
    return login(data).unwrap().then((response) => {
      setUser(response.data)
      if (response.data.role === "admin")
        window.location.href = "/dashboard"
      else
        window.location.href = "/dashboard/hotels"
      toast.success(response.message);
    }).catch((error) => {
      toast.error(error.data.message || "Something went wrong");
    });
  })
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="  rounded-xl p-4 py-6 shadow-2xl sm:mx-auto sm:w-[25rem] lg:mt-4">
        <div className="mx-auto flex items-center justify-center p-3 sm:p-6">
          <Logo />
        </div>
        <div className="mx-auto ">
          <form
            onSubmit={onSubmitHandler}
            className="mt-2 flex w-full flex-col gap-6"
          >
            <h1 className="text-center text-xl text-accent-500 underline">
              Log In to Your Account
            </h1>
            <label className="flex flex-1 flex-col  tracking-wider text-gray-900">
              <span className="ml-2 font-normal md:text-xl">Email</span>
              <input
                type="email"
                className="mt-2 w-full rounded-md py-2 bg-slate-200  px-3 outline-1 outline-accent-500 focus:outline"
                {...register("email", {
                  required: "Please provide your email address",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please provide a valid email address",
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm font-normal text-red-500">
                  {errors.email.message}
                </p>
              )}
            </label>
            <label className=" relative flex flex-1 flex-col tracking-wider text-gray-900">
              <span className="ml-2 font-normal md:text-xl">Password</span>

              <input
                type={showPassword ? "text" : "password"}
                defaultValue="test1234"
                className="mt-2 w-full rounded-md py-2 bg-slate-200  px-3 outline-1 outline-accent-500 focus:outline"
                placeholder="test@test.com"
                {...register("password", {
                  required: "Please Provide your password",
                })}
              />
              <span className=" absolute right-2 bottom-3 text-right text-accent-500 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? (
                    <FaEye />
                  )
                    : (
                      <FaEyeSlash />
                    )
                }

              </span>
              {errors.password && (
                <p className="text-sm font-normal text-red-500">
                  {errors.password.message}
                </p>
              )}
            </label>
            <button
              disabled={isLoading}
              className="rounded-xl bg-accent-500 px-3 py-2 text-slate-100 hover:bg-accent-500 disabled:cursor-not-allowed disabled:bg-accent-400"
              type="submit"
            >
              {isLoading ? <SpinnerMini /> : "Sign In"}
            </button>
            <div>
              have no account?{" "}
              <Link to="/signup" className="text-accent-500 underline">
                Create your account
              </Link>
            </div>

            <div>
              <Link to="/forgot-password" className="text-accent-500 underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
