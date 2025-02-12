import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import toast from "react-hot-toast";
import SpinnerMini from "@/ui/SpinnerMini";
import { Button } from "@/components/ui/button";

function ForgotMyPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [forgotPassword, { isLoading, isSuccess, data }] =
    useForgotPasswordMutation();

  const onSubmitHandler = handleSubmit((data) => {
    const { email } = data;
    forgotPassword({ email });
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
  }, [isSuccess]);

  return (
    <Card className="mx-auto mt-10 max-w-4xl rounded-md bg-white p-6 shadow-md">
      <div className="">
        <div className="mt-6 space-y-4 md:mt-0">
          <CardHeader>
            <Link
              to="/"
              className="mb-4 flex w-fit items-center gap-2 rounded bg-accent-500 px-3 py-1 text-white"
            >
              <IoMdArrowRoundBack />
              Back to Home
            </Link>
            <CardTitle>Forgot your password?</CardTitle>
            <CardDescription>
              <p className="text-gray-700">
                If you&rsquo;ve forgotten your password, don&rsquo;t worry. Just
                enter your email address below and we&rsquo;ll send you a
                password reset link.
              </p>{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="mt-4 space-y-4" onSubmit={onSubmitHandler}>
              <label className="flex flex-col text-gray-700">
                <span>Enter your email</span>
                <Input
                  type="email"
                  className="bg-black/10 rounded px-5 py-2 ring-0 ring-red-500 focus:outline-none"
                  placeholder="email"
                  {...register("email", {
                    required: "Please provide your email",
                  })}
                />
              </label>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <Button
                className="mt-2 min-w-[120px] px-4 py-2 text-white disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? <SpinnerMini /> : "send password reset link"}
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export default ForgotMyPassword;
