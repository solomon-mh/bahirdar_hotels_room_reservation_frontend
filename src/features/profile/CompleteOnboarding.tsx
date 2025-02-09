import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { UserRegistrationData } from "../../types/userTypes";
import { completeOnboardingSchema } from "../../forms/schema/userSchema";

function CompleteOnboarding() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(completeOnboardingSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log("User Data:", data);
    toast.success("Registration successful!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="bg-accent w-full rounded-xl p-6">
        <h2 className="mb-4 text-center text-xl font-semibold">
          User Registration
        </h2>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-4">
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
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="px-2" htmlFor="woreda">
                  Wereda
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
              className="w-full bg-accent-500/90 hover:bg-accent-500"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompleteOnboarding;
