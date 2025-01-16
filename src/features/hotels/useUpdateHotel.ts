import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import apiHotels from "../../services/apiHotels";
import QueryKey from "../../constants/QueryKey";

// UPDATE THT CURRENT HOTEL ON THE MANAGERS SETTING PART for more info go to updateHotel
export const useUpdateHotel = ({ hotelId }:{hotelId:string}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: (updatedHotelData:FormData) =>
      apiHotels.updateHotel({ updatedHotelData, id: id || hotelId }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[QueryKey.HOTEL, id]});
      toast.success("Hotel updated successfully");
    },
    onError: (err) => {
      if ('response' in err)
      {
        const { data: {message} } = err.response as {data: { message: string }};
        toast.error(message || "something went wrong: unable to update a hotel");
      }
      else
      {
        toast.error("something went wrong: unable to update a hotel");
      }
    },
  });

  return { mutate, isPending };
};
