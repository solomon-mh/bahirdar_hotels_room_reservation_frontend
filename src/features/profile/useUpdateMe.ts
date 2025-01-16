import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiUsers from "../../services/apiUsers";
import QueryKey from "../../constants/QueryKey";
import toast from "react-hot-toast";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => apiUsers.updateMe({ data }),
    onSuccess: () => {
      toast.success("user profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: [QueryKey.USER],
      });
    },
    onError: (error) => {
      if ('response' in error)
      {
        const { data: { message } } = error.response as { data: { message: string } };
        toast.error(message || 'Unable to parse JSON response')
      }
      else      toast.error("Unable to update Profile, Please try again.");
    },
  });

  return { mutate, isPending };
};
