import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ILogin } from "@/types/userTypes";
import SpinnerMini from "@/ui/SpinnerMini";

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
        className="mt-2 w-full bg-accent-500/95 hover:bg-accent-500 text-light-200 disabled:cursor-not-allowed"
      >
        {isPending ? <SpinnerMini /> : "Loin in to your account"}
      </Button>
    </form>
  );
}

export default LogInForm;
