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

function SigninPage() {
  // const { setUser } = useAuthContext();

  const formMethods = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
  });
  const { handleSubmit } = formMethods;

  const onSubmitHandler = handleSubmit(async (data) => {
    console.log(data);
  });
  const isLoading = false;

  return (
    <Card className="mx-auto mt-10 w-[400px]">
      <CardHeader>
        <CardTitle>Log In to Your Account</CardTitle>
        <CardDescription>
          Log in to your account to book your favorite hotel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...formMethods}>
          <LogInForm onSubmitHandler={onSubmitHandler} isPending={isLoading} />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex flex-col">
        {/* <Button variant="outline">Cancel</Button> */}
        <div>
          <CardDescription>
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SigninPage;
