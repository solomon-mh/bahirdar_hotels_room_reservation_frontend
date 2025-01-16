import { useQuery } from "@tanstack/react-query";
import QueryKey from "../../constants/QueryKey";
import apiBookings from "../../services/apiBookings";

export const useBookingsOnRoom = ({roomId}: {roomId:string}) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.BOOKINGS, roomId],
    queryFn: () => apiBookings.getAllBookingsOnRoom({ roomId }),
  });

  return {data, isLoading}
}