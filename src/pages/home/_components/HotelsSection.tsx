import { Link } from "react-router-dom";
import MaxWidthWrapper from "../../../ui/MaxWidthWrapper";
import { IHotel } from "../../../types/hotelTypes";
import LoadingPage from "../../utils/LoadingPage";
import { ITimeStamp } from "../../../types/general";
import { useAuthContext } from "@/context/AuthContext";
import {
  useGetPersonalizedRecommendationsQuery,
  useGetPopularHotelsQuery,
} from "@/redux/api/recommendationsApi";
import { Card, CardContent } from "@/components/ui/card";

export const HotelsSection = () => {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? <PersonalizedSection /> : <PopularSection />;
};

// for logged in users
// recommendation based on their previous bookings and favorite history
export const PersonalizedSection = () => {
  const { data: { data: hotels } = {}, isLoading } =
    useGetPersonalizedRecommendationsQuery();

  if (isLoading) return <LoadingPage />;

  return (
    <section className="">
      <MaxWidthWrapper>
        <div className="my-5 space-y-10 p-4">
          <h2 className="text-black/70 border-b p-4 text-center text-xl shadow md:text-2xl md:font-bold lg:text-4xl">
            Personalized Hotels
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-16">
            {hotels?.map((hotel, i) => (
              <Card key={i}>
                <CardContent>
                  <HotelCard hotel={hotel} key={hotel._id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

// this a recommendation of hotels for users that do not logged in to our app
// we get hotel recommendation based on their average number of reviews, thier hotel star and also based on min price per night
export const PopularSection = () => {
  const {
    data: { data: hotels } = {},
    isLoading,
    isError,
  } = useGetPopularHotelsQuery();

  if (isLoading) return <LoadingPage />;
  if (isError || !hotels)
    return <p className="text-center">Failed to load hotels.</p>;
  if (!hotels || hotels.length === 0)
    return <p className="text-center text-gray-500">No hotel results found.</p>;
  return (
    <section className="">
      {hotels?.length && !isError && (
        <MaxWidthWrapper>
          <div className="my-5 flex flex-col items-center justify-center space-y-10 p-4">
            <h2 className="text-black/70 border-b p-4 text-xl shadow md:text-2xl md:font-bold lg:text-4xl">
              Popular Hotels
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-16">
              {hotels?.map((hotel, i) => (
                <Card key={i}>
                  <CardContent>
                    <HotelCard hotel={hotel} key={hotel._id} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      )}
    </section>
  );
};

const HotelCard = ({ hotel }: { hotel: IHotel & ITimeStamp }) => {
  return (
    <Link
      to={`/hotels/${hotel._id}`}
      className="cursor-pointer overflow-hidden rounded-sm bg-slate-100 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <img
        className="h-48 w-full object-cover"
        src={hotel.imageCover}
        alt={""}
      />
      <div className="p-4">
        <p className="mb-2 text-2xl font-bold">{hotel.name}</p>
        <p className="text-gray-600">{hotel.address?.city}</p>
        <p className="text-black/30 mt-2 text-sm">{hotel.summary}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(hotel.hotelStar)].map((_, index) => (
              <svg
                key={index}
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.42 4.368a1 1 0 00.95.69h4.584c.969 0 1.371 1.24.588 1.81l-3.705 2.693a1 1 0 00-.364 1.118l1.42 4.368c.3.921-.755 1.688-1.538 1.118l-3.705-2.693a1 1 0 00-1.175 0l-3.705 2.693c-.783.57-1.838-.197-1.538-1.118l1.42-4.368a1 1 0 00-.364-1.118L2.505 9.795c-.783-.57-.381-1.81.588-1.81h4.584a1 1 0 00.95-.69l1.42-4.368z" />
              </svg>
            ))}
          </div>
          <button className="rounded bg-accent-500 px-3 py-1 text-lg text-white">
            ${hotel.minPricePerNight}/night
          </button>
        </div>
      </div>
    </Link>
  );
};
