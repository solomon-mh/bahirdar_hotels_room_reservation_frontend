import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { UserRegistrationData } from "../../types/userTypes";
import { completeOnboardingSchema } from "../../forms/schema/userSchema";
import { useEffect, useState } from "react";
import { useCompleteOnboardingMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";

function CompleteOnboarding() {
  const [selectProfilePicture, setSelectProfilePicture] = useState("");
  const [selectIdPhoto, setSelectIdPhoto] = useState("");
  const navigate = useNavigate();

  const [completeOnboarding, { isLoading, isError, error, isSuccess }] =
    useCompleteOnboardingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(completeOnboardingSchema),
  });

  const profilePicture = watch("profilePicture");
  const idPhoto = watch("idPhoto");

  const onSubmit = (data: UserRegistrationData) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("dateOfBirth", new Date(data.dateOfBirth).toISOString());
    formData.append("gender", data.gender);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("address[country]", data.address.country);
    formData.append("address[city]", data.address.city);
    formData.append("address[subcity]", data.address.subcity);
    formData.append("address[street]", data.address.street);
    formData.append("address[woreda]", data.address.woreda || "");

    if (data.profilePicture instanceof FileList) {
      formData.append("profilePicture", data.profilePicture[0]);
    } else if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }

    if (data.idPhoto instanceof FileList) {
      formData.append("idPhoto", data.idPhoto[0]);
    } else if (data.idPhoto) {
      formData.append("idPhoto", data.idPhoto);
    }

    console.log("User Data:", data);
    completeOnboarding(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "User data submitted successfully, You can now request for Identity verification",
      );
      navigate("/account/identity-verification");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.error("Error:", error);
      toast.error(
        "An error occurred When submitting the data. Please try again later.",
      );
    }
  }, [isError, error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="bg-accent w-full rounded-xl p-6">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Compete Your Information
        </h2>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <p>Profile Picture</p>
                <div className="flex justify-start gap-5">
                  <div className="h-[100px] w-[100px] overflow-hidden sm:block">
                    <img
                      src={
                        typeof profilePicture === "string"
                          ? profilePicture
                          : selectProfilePicture.length > 0
                            ? selectProfilePicture
                            : "/user.jpg"
                      }
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col justify-start hover:cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="mx-auto w-2/3"
                      {...register("profilePicture", {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setSelectProfilePicture(e.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        },
                      })}
                    />
                    {errors.profilePicture && (
                      <p className="font-normal text-red-700">
                        {errors.profilePicture.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Identity Photo */}
              <div>
                <h2>Identity Photo</h2>
                <div className="flex justify-start gap-5">
                  <div className="h-[100px] w-[100px] overflow-hidden sm:block">
                    <img
                      src={
                        typeof idPhoto === "string"
                          ? idPhoto
                          : selectIdPhoto.length > 0
                            ? selectIdPhoto
                            : "/user.jpg"
                      }
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col justify-start hover:cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="mx-auto w-2/3"
                      {...register("idPhoto", {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setSelectIdPhoto(e.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        },
                      })}
                    />
                    {errors.idPhoto && (
                      <p className="font-normal text-red-700">
                        {errors.idPhoto.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName?.message && (
              <p className="text-sm text-red-500">
                {errors.firstName.message.toString()}
              </p>
            )}

            <Input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            {errors.lastName?.message && (
              <p className="text-sm text-red-500">
                {errors.lastName.message.toString()}
              </p>
            )}

            <Input
              type="date"
              placeholder="Date of Birth"
              max={new Date().toISOString().split("T")[0]}
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth?.message && (
              <p className="text-sm text-red-500">
                {errors.dateOfBirth.message.toString()}
              </p>
            )}

            <select
              {...register("gender")}
              className="w-full rounded-md border p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender?.message && (
              <p className="text-sm text-red-500">
                {errors.gender.message.toString()}
              </p>
            )}

            <Input
              type="text"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber?.message && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message.toString()}
              </p>
            )}

            <div className="grid w-full grid-cols-1 md:grid-cols-2">
              <div className="flex flex-1 flex-col gap-1">
                <label className="px-2" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  defaultValue="Ethiopia"
                  className="rounded-md border bg-slate-200 px-3 py-2 hover:outline-none focus-visible:outline-accent-500"
                  placeholder="Ethiopia, Amhara, 16km from the main straight"
                  {...register("address.country", {
                    required: "Hotel address is required",
                  })}
                />
                {errors.address?.country && (
                  <p className="text-sm font-normal text-red-700">
                    {errors.address.country.message}
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="px-2" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  defaultValue="Bahir Dar"
                  className="rounded-md border bg-slate-200 px-3 py-2 hover:outline-none focus-visible:outline-accent-500"
                  placeholder="Bahir Dar, Amhara, 16km from the main straight"
                  {...register("address.city", {
                    required: "Hotel address is required",
                  })}
                />
                {errors.address?.city && (
                  <p className="text-sm font-normal text-red-700">
                    {errors.address.city.message}
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="px-2" htmlFor="sub-city">
                  Sub-City
                </label>
                <input
                  type="text"
                  id="sub-city"
                  defaultValue="felege hiwot"
                  className="rounded-md border bg-slate-200 px-3 py-2 hover:outline-none focus-visible:outline-accent-500"
                  placeholder="Bahir Dar, Amhara, 16km from the main straight"
                  {...register("address.subcity", {
                    required: "Hotel sub-city is required",
                  })}
                />
                {errors.address?.subcity && (
                  <p className="text-sm font-normal text-red-700">
                    {errors.address.subcity.message}
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="px-2" htmlFor="street">
                  Street
                </label>
                <input
                  type="text"
                  defaultValue="street 003"
                  className="rounded-md border bg-slate-200 px-3 py-2 hover:outline-none focus-visible:outline-accent-500"
                  placeholder="Bahir Dar, Amhara, 16km from the main straight"
                  {...register("address.street")}
                />
                {errors.address?.street && (
                  <p className="text-sm font-normal text-red-700">
                    {errors.address.street.message}
                  </p>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="px-2" htmlFor="woreda">
                  Woreda
                </label>
                <input
                  type="text"
                  id="woreda"
                  defaultValue="Woreda 01"
                  className="rounded-md border bg-slate-200 px-3 py-2 hover:outline-none focus-visible:outline-accent-500"
                  placeholder="Bahir Dar, Amhara, 16km from the main straight"
                  {...register("address.woreda")}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-500/90 hover:bg-accent-500 disabled:cursor-not-allowed"
            >
              Complete Onboarding
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompleteOnboarding;
