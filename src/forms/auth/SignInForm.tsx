import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
interface Props {
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}
function SignInForm({ onSubmitHandler, isPending }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ email: string, password: string }>();


  const [showPassword, setShowPassword] = useState(false);
  return (
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
          defaultValue="test@test.com"
          className="mt-2 w-full rounded-md py-2 bg-slate-200  px-3 outline-1 outline-accent-500 focus:outline"
          placeholder="test@test.com"
          {...register("email", {
            required: "Please provide your email address",
          })}
        />
        {errors.email && (
          <p className="text-sm font-normal text-red-700">
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
          <p className="text-sm font-normal text-red-700">
            {errors.password.message}
          </p>
        )}
      </label>
      <button
        disabled={isPending}
        className="rounded-xl bg-accent-500 px-3 py-3 text-white hover:bg-accent-500 disabled:cursor-not-allowed disabled:bg-accent-400"
        type="submit"
      >
        {isPending ? <SpinnerMini /> : "Sign In"}
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
  );
}

export default SignInForm;
