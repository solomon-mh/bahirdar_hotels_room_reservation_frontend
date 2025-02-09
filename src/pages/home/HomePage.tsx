import Map, { LocationProps } from "../../features/bookings/Map";
import { useGetAllHotelsQuery } from "../../redux/api/hotelApi";
import LoadingPage from "../utils/LoadingPage";
import NotFoundPage from "../utils/NotFoundPage";
import Hero from "./_components/Hero";
import { HotelsSection } from "./_components/HotelsSection";
import OurServices from "./_components/OurServices";

function HomePage() {
  const {
    data: { data: hotels } = {},
    isLoading,
    error,
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

  return (
    <section className="mx-10 flex flex-col gap-16">
      <div className="flex min-h-[calc(100vh-2*24px-50px)] flex-1 flex-col items-center justify-center">
        <Hero />
      </div>
      <HotelsSection />
      <div className="flex items-center justify-center">
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <NotFoundPage>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </NotFoundPage>
        ) : !hotels?.length ? (
          <NotFoundPage>
            <span>Cann't get hotel data</span>
          </NotFoundPage>
        ) : (
          <Map markers={markers} center={markers?.[0]?.location} />
        )}
      </div>
      <OurServices />
    </section>
  );
}

export default HomePage;
