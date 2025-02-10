import { useFormContext } from "react-hook-form";
import {
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ILogin } from "@/types/userTypes";

interface Props {
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}

function LogInForm({ onSubmitHandler, isPending }: Props) {
  const { control } = useFormContext<ILogin>();

  return (
    <form onSubmit={onSubmitHandler} className="flex w-full flex-col">
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
      <Button
        disabled={isPending}
        type="submit"
        className="mt-2 w-full text-light-200"
      >
        {/* {true ? <SpinnerMini /> : "Sign Up"} */}
        Loin in to your account
      </Button>
    </form>
  );
}

export default LogInForm;
