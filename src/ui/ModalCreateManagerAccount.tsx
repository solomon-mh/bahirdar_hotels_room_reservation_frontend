import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import apiUsers from "../services/apiUsers";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { User } from "../types/userTypes";

interface Props {
  setCreatedManager: (user: User) => void;
}

function ModalCreateManagerAccount({ setCreatedManager }: Props) {
  const { handleOpenModalWindow } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>();

  setValue("password", "test1234");
  setValue("passwordConfirm", "test1234");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: User) => apiUsers.createUser({ data }),
    onSuccess: (data) => {
      // const {} = data
      // console.log(data.data.user);
      toast.success("Manager account created successfully");
      setCreatedManager(data.data.user);
      handleOpenModalWindow();
    },
    onError: (error) => {
      if ('response' in error)
      {
        const { data: { massage } } = error.response as { data: { massage: string } };
        toast.error(massage || "Something went wrong please try again");
      }
      toast.error("Error creating manager account, Please try again.");
    },
  });

  const onSubmitHandler = handleSubmit((data: User) => {
    mutate(data);
  });
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex w-[30rem] flex-col gap-6 rounded-xl bg-slate-300 p-10 shadow-lg"
    >
      <h1 className="text-2xl font-bold text-gray-800">
        Create Manager Account
      </h1>
      <label className="flex-1 text-sm font-bold text-gray-700">
        First Name
        <input
          type="text"
          defaultValue="John"
          className="w-full rounded-full px-3 py-3"
          // placeholder="John"
          required
          {...register("firstName", {
            required: "first name is a required field",
          })}
        />
        {errors.firstName && (
          <p className="text-sm font-normal text-red-700">
            {errors.firstName.message}
          </p>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Last Name
        <input
          type="text"
          defaultValue="A."
          className="w-full rounded-full px-3 py-3"
          // placeholder="Doe"
          // required
          {...register("lastName", {
            required: "last name is a required field",
          })}
        />
        {errors.lastName && (
          <p className="text-sm font-normal text-red-700">
            {errors.lastName.message}
          </p>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        <span>Email</span>
        <input
          type="email"
          defaultValue="test@test.com"
          className="w-full rounded-full px-3 py-3"
          // placeholder="test@test.com"
          // required
          {...register("email", {
            required: "email is a required field",
          })}
        />
        {errors.email && (
          <p className="text-sm font-normal text-red-700">
            {errors.email.message}
          </p>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Phone Number
        <input
          type="text"
          className="w-full rounded-full px-3 py-3"
          defaultValue="0908005801"
          // required
          {...register("phoneNumber", {
            required: "phone number is a required field",
          })}
        />
        {errors.phoneNumber && (
          <p className="text-sm font-normal text-red-700">
            {errors.phoneNumber.message}
          </p>
        )}
      </label>
      <button
        disabled={isPending}
        className="rounded bg-accent-500 px-3 py-2 text-xl font-bold text-white hover:bg-accent-500 disabled:cursor-not-allowed disabled:bg-accent-400"
        type="submit"
      >
        Create Manager Account
      </button>
    </form>
  );
}

export default ModalCreateManagerAccount;
