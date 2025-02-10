import { useFormContext } from "react-hook-form";
import PhoneInput from "./PhoneInput";
import { ISignup } from "@/types/userTypes";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SpinnerMini from "@/ui/SpinnerMini";

interface Props {
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}
function SignUpForm({ onSubmitHandler, isPending }: Props) {
  const { control } = useFormContext<ISignup>();

  return (
    <form onSubmit={onSubmitHandler} className="flex w-full flex-col">
      <FormField
        control={control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="my_username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />{" "}
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="your_name@abc.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <PhoneInput />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="**********" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="passwordConfirm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password Confirm</FormLabel>
            <FormControl>
              <Input type="password" placeholder="**********" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        disabled={isPending}
        type="submit"
        className="mt-2 w-full text-light-200"
      >
        {isPending ? <SpinnerMini /> : "Sign Up"}
      </Button>
    </form>
  );
}

export default SignUpForm;
