import { FormProvider, useForm } from "react-hook-form";
import SignUpForm from "./form/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ISignup } from "@/types/userTypes";
import { SignupSchema } from "@/features/auth/form/schema/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

function SignupPage() {
  const formMethods = useForm<ISignup>({
    resolver: zodResolver(SignupSchema),
  });
  const { handleSubmit } = formMethods;
  const onSubmitHandler = handleSubmit((data) => {
    console.log(data);
    // mutate(data);
  });

  return (
    <Card className="mx-auto mt-10 w-[400px]">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Create an account to book your favorite hotel.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...formMethods}>
          <SignUpForm onSubmitHandler={onSubmitHandler} />
        </FormProvider>
      </CardContent>
      <CardFooter className="flex flex-col">
        {/* <Button variant="outline">Cancel</Button> */}
        <div>
          <CardDescription>
            have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SignupPage;
