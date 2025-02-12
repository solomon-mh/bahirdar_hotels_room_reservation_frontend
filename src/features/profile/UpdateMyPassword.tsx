import { FormProvider, useForm } from "react-hook-form";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateMyPasswordMutation } from "@/redux/api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { IUpdatePassword } from "@/types/authTypes";

interface PasswordVisibility {
  newPassword: boolean;
  confirmPassword: boolean;
  currentPassword: boolean;
}
function UpdateMyPassword() {
  const formMethods = useForm<IUpdatePassword>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = formMethods;

  const navigate = useNavigate();
    const [updatePassword, { isLoading }] = useUpdateMyPasswordMutation();


  const [visibility, updateVisibility] = useState<PasswordVisibility>({
    newPassword: false,
    confirmPassword: false,
    currentPassword: false,
  });
  const onSubmitHandler = handleSubmit((data) => {
    updatePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword, confirmPassword: data.confirmPassword })
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully.");
        navigate("/account/profile")
      }).catch((err) => {
        if ('data' in err)
        {
          const { message } = err.data as { message: string };
          toast.error(message || "Failed to update password.");
        }
        else
          toast.error("Failed to update password.");
      });
  });

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-md bg-white p-6 shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="mt-6 flex-grow md:mt-0">
          <FormProvider {...formMethods}>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label className="block relative text-sm font-medium text-gray-700">
                  Old Password
                  <input
                    type={visibility.currentPassword ? "text" : "password"}
                    {...register("currentPassword", {
                      validate: (val) => {
                        if (!val) return "old password is required.";
                        else if (val.length < 8)
                          return "password must be at least 8 characters.";

                        return true;
                      },
                    })}
                                      disabled={isLoading}
                    className="mt-1 block w-full rounded-md border-2 p-2 shadow-sm focus:border-accent-400 focus:ring-0 focus:outline-none disabled:cursor-wait disabled:bg-slate-300"
                  />
                  {
                    visibility.currentPassword ? (
                      <Eye
                        className="h-6 w-6 absolute top-2/3 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          updateVisibility((prev) => ({
                            ...prev,
                            currentPassword: false,
                          }))
                        }
                      />

                    ) : (
                      <EyeOff
                        className="h-6 w-6 absolute top-2/3 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          updateVisibility((prev) => ({
                            ...prev,
                            currentPassword: true,
                          }))
                        }
                      />
                    )
                  }


                </label>
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block relative text-sm font-medium text-gray-700">
                  New Password
                  <input
                    type={visibility.newPassword ? "text" : "password"}
                    {...register("newPassword", {
                      validate: (val) => {
                        if (!val) return "new password is required.";
                        else if (val.length < 8)
                          return "password must be at least 8 characters.";

                        return true;
                      },
                    })}
                                      disabled={isLoading}
                    className="mt-1 block w-full rounded-md border-2 p-2 shadow-sm focus:border-accent-400 focus:ring-0 focus:outline-none disabled:cursor-wait disabled:bg-slate-300"
                  />
                  {
                    visibility.newPassword ? (
                      <Eye
                        className="h-6 w-6 absolute top-2/3 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          updateVisibility((prev) => ({
                            ...prev,
                            newPassword: false,
                          }))
                        }
                      />

                    ) : (
                      <EyeOff
                        className="h-6 w-6 absolute top-2/3 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          updateVisibility((prev) => ({
                            ...prev,
                            newPassword: true,
                          }))
                        }
                      />
                    )
                  }
                </label>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block relative text-sm font-medium text-gray-700">
                  Password Confirm
                  <input
                    type={visibility.confirmPassword ? 'text' : "password"}
                    {...register("confirmPassword", {
                      validate: (val) => {
                        if (!val) return "password confirm is required.";
                        else if (val !== getValues("confirmPassword"))
                          return "password confirm must match the password.";

                        return true;
                      },
                    })}
                                      disabled={isLoading}
                    className="mt-1 block w-full rounded-md border-2 p-2 shadow-sm focus:border-accent-400 focus:ring-0 focus:outline-none disabled:cursor-wait disabled:bg-slate-300"
                  />
                  {
                    visibility.confirmPassword ? (
                      <Eye
                        className="h-6 w-6 absolute top-2/3 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          updateVisibility((prev) => ({
                            ...prev,
                            confirmPassword: false,
                          }))
                        }
                      />

                    ) : (
                      <EyeOff
                        className="h-6 w-6 absolute top-2/3 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() =>
                          updateVisibility((prev) => ({
                            ...prev,
                            confirmPassword: true,
                          }))
                        }
                      />
                    )
                  }
                </label>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="my-2 flex justify-end p-2">
                <button
                                  disabled={isLoading}
                  type="submit"
                  className="flex items-center gap-2 bg-accent-500/95 bg-accent-500  px-4 py-2  text-slate-100 rounded-md disabled:cursor-wait"
                >
                                  Update Password {isLoading && <SpinnerMini />}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default UpdateMyPassword;
