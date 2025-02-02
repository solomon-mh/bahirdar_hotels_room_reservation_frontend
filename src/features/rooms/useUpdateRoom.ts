import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import QueryKey from "../../constants/QueryKey";
import apiRooms from "../../services/apiRooms";

export const useUpdateRoom = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data:FormData) => apiRooms.updateRoom({ data, id:id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryKey.ROOM, id]});
      toast.success("Hotel room updated successfully");
      navigate(`/dashboard/rooms`);
    },
    onError: (err) => {
      if ('response' in err)
      {
        const { data: { message } } = err.response as { data: { message: string } };
        toast.error(message || "something went wrong: unable to update a hotel room");
      }
      else
      toast.error("something went wrong: unable to update a hotel room");
    },
  });

  return { mutate, isPending };
};
