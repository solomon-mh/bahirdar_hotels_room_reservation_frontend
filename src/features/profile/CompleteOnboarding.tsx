/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { UserRegistrationData } from "../../types/userTypes";
import { completeOnboardingSchema } from "../../forms/schema/userSchema";
import { useEffect, useState } from "react";
import { useCompleteOnboardingMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

function CompleteOnboarding() {
  const { user } = useAuthContext()
  const [selectProfilePicture, setSelectProfilePicture] = useState("");
  const [selectIdPhotoFront, setSelectIdPhotoFront] = useState("");
  const [selectIdPhotoBack, setSelectIdPhotoBack] = useState("");

  const navigate = useNavigate();

  const [completeOnboarding, { isLoading, isError, error, isSuccess }] =
    useCompleteOnboardingMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(completeOnboardingSchema),
  });

  const profilePicture = watch("profilePicture");
  const idPhoto_back = watch("idPhoto_back");
  const idPhoto_front = watch("idPhoto_front");

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

    if (data.idPhoto_back instanceof FileList) {
      formData.append("idPhoto_back", data.idPhoto_back[0]);
    } else if (data.idPhoto_back) {
      formData.append("idPhoto_back", data.idPhoto_back);
    }
    if (data.idPhoto_front instanceof FileList) {
      formData.append("idPhoto_front", data.idPhoto_front[0]);
    } else if (data.idPhoto_front) {
      formData.append("idPhoto_front", data.idPhoto_front);
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
    if (user && user._id)
    {
      reset({
        ...JSON.parse(JSON.stringify(user))
      })
    }
  }, [reset, user])

  useEffect(() => {
    if (isError) {
      console.error("Error:", error);
      toast.error(
        "An error occurred When submitting the data. Please try again later.",
      );
    }
  }, [isError, error]);


  if (user?.isVerificationRequested && !user.isVerified)

    if (user.isVerificationRequested)
    {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-yellow-700 font-bold">
              Your Onboarding process is under review
            </CardTitle>
            <CardDescription>
              <p>
                Your identity verification request has been submitted and is
                currently under review.
              </p>
              <p className="mt-2">
                This process may take some time. You will be notified once your
                verification is complete.
              </p>
              <p className="mt-2 font-medium">
                If you believe there is an issue, please contact support.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="bg-accent w-full rounded-xl p-6">
        <h2 className="mb-4 text-center text-slate-900 text-xl font-semibold">
          {user?.isVerified ? "Edit" : "Complete"} Your Information
        </h2>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-y-4">

              <h2 className="col-span-2 py-2 text-2xl font-semibold text-gray-800">
                Profile Picture
              </h2>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Upload Section */}
                <div className="mt-3 space-y-3">
                  {/* Guidelines */}
                  <p className="mb-3 text-sm text-gray-600">
                    Please upload a{" "}
                    <span className="font-semibold">
                      clear, recent, and professional
                    </span>{" "}
                    profile picture:
                  </p>

                  <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                    <li>
                      <span className="font-semibold">Accepted formats:</span>{" "}
                      JPEG, PNG, or WebP (Max:{" "}
                      <span className="font-semibold">5MB</span>)
                    </li>
                    <li>
                      <span className="font-semibold">Minimum resolution:</span>{" "}
                      400x400 pixels
                    </li>
                    <li>
                      <span className="font-semibold">
                        Face must be centered and well-lit
                      </span>
                    </li>
                    <li className="text-red-300">
                      No sunglasses, filters, or group photos
                    </li>
                  </ul>
                  <div className="gap-2">
                    {/* Styled File Input Label */}
                    <label className="cursor-pointer rounded-md bg-accent-500/95 hover:bg-accent-500 px-4 py-2 text-light-200 shadow-md transition-all  ">
                      Upload Profile Picture
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("profilePicture", {
                          onChange: (e) => {
                            const file = e.target.files?.[0];
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setSelectProfilePicture(
                                e.target?.result as string,
                              );
                            };
                            reader.readAsDataURL(file);
                          },
                        })}
                      />{" "}
                    </label>

                    {/* Error Message */}
                    {errors.profilePicture && (
                      <p className="mt-4 text-sm text-red-600">
                        {errors.profilePicture.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview Image */}
                <div className="h-[250px] w-[300px] overflow-hidden rounded-lg border border-gray-300 shadow-md">
                  <img
                    src={
                      typeof profilePicture === "string"
                        ? profilePicture
                        : selectProfilePicture.length > 0
                          ? selectProfilePicture
                          : "/user.jpg"
                    }
                    alt="Profile Preview"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <hr className="col-span-2 my-2 border-2 border-gray-400" />

              {/* Identity Photo */}
              <div className="">
                <h2 className="col-span-2 py-2 text-2xl">
                  National ID / Resident Card
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* front */}
                  <div className="space-y-2">
                    <h3 className="capitalize">
                      The front side of your National ID / Resident Card
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <label className="mb-2 cursor-pointer rounded-md bg-accent-500/95 hover:bg-accent-500 px-4 py-2 text-light-200 shadow-md transition-all ">
                          Upload The Front Side of Your ID
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("idPhoto_front", {
                              onChange: (e) => {
                                const file = e.target.files?.[0];
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setSelectIdPhotoFront(
                                    e.target?.result as string,
                                  );
                                };
                                reader.readAsDataURL(file);
                              },
                            })}
                          />
                        </label>
                      </div>
                      <div className="h-[200px] w-[250px] overflow-hidden sm:block">
                        <img
                          src={
                            typeof idPhoto_front === "string"
                              ? idPhoto_front
                              : selectIdPhotoFront.length > 0
                                ? selectIdPhotoFront
                                : "/user.jpg"
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      {errors.idPhoto_front && (
                        <p className="mt-2 font-normal text-red-700">
                          {errors.idPhoto_front.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* back */}
                  <div className="space-y-2">
                    <h3 className="capitalize">
                      the back side of your National ID / Resident Card
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <label className="cursor-pointer rounded-md bg-accent-500/95 hover:bg-accent-500 px-4 py-2 text-light-200 shadow-md transition-all ">
                          Upload The Back Side of Your ID
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("idPhoto_back", {
                              onChange: (e) => {
                                const file = e.target.files?.[0];
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setSelectIdPhotoBack(
                                    e.target?.result as string,
                                  );
                                };
                                reader.readAsDataURL(file);
                              },
                            })}
                          />
                        </label>

                        {errors.idPhoto_back && (
                          <p className="font-normal text-red-700">
                            {errors.idPhoto_back.message as string}
                          </p>
                        )}
                      </div>{" "}
                      <div className="h-[200px] w-[250px] overflow-hidden sm:block">
                        <img
                          src={
                            typeof idPhoto_back === "string"
                              ? idPhoto_back
                              : selectIdPhotoBack.length > 0
                                ? selectIdPhotoBack
                                : "/user.jpg"
                          }
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-2 border-2 border-gray-400" />

            <h2 className="col-span-2 py-2 text-2xl">
              put your personal information
            </h2>

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
              className="w-full bg-accent-500/95 hover:bg-accent-500 text-slate-100 disabled:cursor-not-allowed"
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
