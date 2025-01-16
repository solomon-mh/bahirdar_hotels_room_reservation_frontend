import { useQuery } from "@tanstack/react-query";
import QueryKey from "../../constants/QueryKey";
import apiHotels from "../../services/apiHotels";

export const useHotel = ({ id } : {id: string}) =>useQuery({
    queryKey: [QueryKey.HOTEL, id],
    queryFn: () => apiHotels.getHotel({ id }),
    retry: false,
  });


