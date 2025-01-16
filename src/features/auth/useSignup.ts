import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import apiAuth from "../../services/apiAuth";
import QueryKey from "../../constants/QueryKey";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: apiAuth.signup,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QueryKey.USER});
      toast.success("User signed up successfully");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      if('response' in err) {
        const { data: { message } } = err.response as { data: { message: string } };
        toast.error(message || "Something went wrong please try again");
    }
      toast.error(
        "something went wrong,Please try again later.",
      );
    },
  });

  return { mutate, isPending };
};
