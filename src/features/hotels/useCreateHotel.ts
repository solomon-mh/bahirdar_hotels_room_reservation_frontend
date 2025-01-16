import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiHotels from "../../services/apiHotels";
import QueryKey from "../../constants/QueryKey";

export const useCreateHotel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: apiHotels.addHotel,
    onSuccess: () => {
      toast.success("Hotel added successfully");
      queryClient.invalidateQueries({queryKey: [QueryKey.HOTELS]});

      navigate("/dashboard/hotels");
    },
    onError: (err) => {
      if ('response' in err)
      {
        const { data: { message } } = err.response as { data: { message: string } };
        toast.error(message || "Something went wrong: unable to add a hotel");
      }
      toast.error("Something went wrong: unable to add a hotel");
    },
  });

  return { mutate, isPending };
};
