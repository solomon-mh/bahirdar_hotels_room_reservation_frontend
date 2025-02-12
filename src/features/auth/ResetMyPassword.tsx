import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import SpinnerMini from "@/ui/SpinnerMini";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const ResetPasswordSchema = z
  .object({
    password: z
      .string({ message: "password is required" })
      .min(8, { message: "password should be at least 8 characters" }),
    passwordConfirm: z
      .string({ message: "password confirm is required" })
      .min(8, { message: "password should be at least 8 characters" }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });

export type IResetPassword = z.infer<typeof ResetPasswordSchema>;

function ResetMyPassword() {
  const { resetToken } = useParams<{ resetToken: string }>();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  console.log(resetToken);
  const [resetPassword, { isLoading, isSuccess, isError }] =
    useResetPasswordMutation();

  const onSubmitHandler = handleSubmit(async (data) => {
    if (!resetToken) return;
    resetPassword({ resetToken, data });
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
    if (isError) {
      toast.error("Failed to reset password, please try again");
      navigate("/");
    }
  }, [isSuccess, isError, navigate, resetPassword, resetToken]);

  return (
    <Card className="mx-auto mt-10 max-w-4xl rounded-md bg-white p-6 shadow-md">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          <p className="text-gray-700">
            Enter your new password and confirm it to reset your password.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="mt-4 space-y-4" onSubmit={onSubmitHandler}>
          <label className="flex flex-col text-gray-700">
            <span>your password</span>
            <Input
              type="password"
              className="bg-black/10 rounded px-5 py-2 ring-0 ring-red-500 focus:outline-none"
              placeholder="********"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </label>
          <label className="flex flex-col text-gray-700">
            <span>Confirm your password</span>
            <Input
              type="password"
              className="bg-black/10 rounded px-5 py-2 ring-0 ring-red-500 focus:outline-none"
              placeholder="********"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm text-red-500">
                {errors.passwordConfirm.message}
              </p>
            )}
          </label>

          <Button
            disabled={isLoading}
            type="submit"
            className="mt-2 w-full min-w-32 bg-accent-500/95 px-4 py-2 text-light-200 hover:bg-accent-500"
          >
            {isLoading ? <SpinnerMini /> : "Reset Password"}
          </Button>
        </form>{" "}
      </CardContent>
    </Card>
  );
}

export default ResetMyPassword;
