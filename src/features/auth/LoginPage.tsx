import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import SpinnerMini from "../../ui/SpinnerMini";
// import { useLoginMutation } from "../../redux/api/authApi";
import { ILogin } from "../../types/authTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LogInForm from "@/features/auth/form/LoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/features/auth/form/schema/LoginSchema";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

function SigninPage() {
  const { setUser } = useAuthContext();

  const formMethods = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
  });
  const { handleSubmit } = formMethods;

  const [login, { isLoading }] = useLoginMutation();

  const onSubmitHandler = handleSubmit(async (data) => {
    return login(data)
      .unwrap()
      .then((response) => {
        setUser(response.data);
        if (response.data.role === "user") {
          window.location.href = "/";
        } else if (response.data.role === "admin")
          window.location.href = "/dashboard";
        else window.location.href = "/dashboard/hotels";
      })
      .catch((error) => {
        toast.error(error.data.message || "Something went wrong");
      });
  });

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Log In to Your Account</CardTitle>
          <CardDescription>
            Log in to your account to book your favorite hotel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...formMethods}>
            <LogInForm
              onSubmitHandler={onSubmitHandler}
              isPending={isLoading}
            />
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col">
          {/* <Button variant="outline">Cancel</Button> */}
          <div>
            <CardDescription>
              <div>
                Don't have an account?{" "}
                <Link to="/signup" className=" text-accent-500 cursor-pointer hover:underline">
                  Sign Up
                </Link>
              </div>
              <div>
                <Link to="/forgot-password" className="text-accent-500 cursor-pointer hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </CardDescription>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SigninPage;
