import LoadingPage from "@/pages/utils/LoadingPage";
import { useGetAllHotelsQuery } from "@/redux/api/hotelApi";
import Map, { LocationProps } from "@/features/bookings/Map";

function HomePageMap() {
  const {
    data: { data: hotels } = {},
    isLoading,
    isError,
  } = useGetAllHotelsQuery("");

  const markers: LocationProps[] = [];
  if (hotels?.length)
    hotels.forEach((hotel, index) => {
      if (hotel.location?.coordinates.length) {
        markers.push({
          id: index,
          name: hotel.name,
          location: [...hotel.location.coordinates],
        });
      }
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {!isError && hotels?.length && hotels?.length > 0 && (
        <Map zoom={14} markers={markers} center={markers?.[0]?.location} />
      )}
    </div>
  );
}

export default HomePageMap;
