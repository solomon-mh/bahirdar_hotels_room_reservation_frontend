import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import QueryKey from "../../constants/QueryKey";
import apiRooms from "../../services/apiRooms";
import { useQuery } from "@tanstack/react-query";
import MaxWidthWrapper from "../../ui/MaxWidthWrapper";
import {
  HotelDetailDescription,
  HotelDetailFacilities,
  HotelDetailHero,
  HotelDetailImages,
  HotelDetailSummary,
  RoomCard,
} from "./_components";
import { useGetHotelByIdQuery } from "../../redux/api/hotelApi";
import NotFoundPage from "../utils/NotFoundPage";

function HotelDetail() {
  SwiperCore.use([Navigation, Autoplay]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState("");

  const { id } = useParams() as { id: string };

  const {
    data: { data: { hotel } = {} } = {},
    isLoading,
    isError,
    error,
  } = useGetHotelByIdQuery(id as string);

  const { data: { data: { rooms } = {} } = {}, isLoading: isLoadingRooms } =
    useQuery({
      queryKey: [QueryKey.ROOMS, id, searchParams.get("search")],
      queryFn: () =>
        apiRooms.getAllRoomsOnHotel({
          hotelId: id,
          selectedRoomTypes: [searchParams.get("search") as string],
        }),
    });


  useEffect(() => {

    if (isError)
    {
      if ('response' in error && error)
      {
        const { data: { message } } = error.response as { data: { message: string } };
        toast.error(
          message || "No Hotel Found. 404); please try again",
        );
      }
      else
      {
        toast.error(
          "No Hotel Found. 404); please try again",
        );
      }


      // navigate("/hotels");
    }
  }, [error, isError, navigate])

  const handleSearchParams = (type: string) => {
    searchParams.set("search", type);
    setSearchParams(searchParams);
    setActive(type);
  };
  if (isLoading)
  {
    return (
      <MaxWidthWrapper>
        <div
          className="relative flex min-h-[85vh] animate-pulse flex-col items-center justify-center"
          style={{
            "clipPath": "polygon(0 0, 100vw 0%, 100vw 65vh, 0 85vh)",
          }}
        >
          <div className="absolute -z-[-9] h-full w-full bg-accent-400 opacity-50 dark:bg-accent-500"></div>
        </div>
      </MaxWidthWrapper>
    );
  }
  if (!hotel)
    return <NotFoundPage>
      <div>Hotel not found</div>;
    </NotFoundPage>


  return (
    <div className="flex flex-col gap-5 space-y-10 p-4">
      {/* HERO SECTION */}
      <HotelDetailHero hotel={hotel} />

      {/* HOTEL DESCRIPTION */}
      <HotelDetailDescription hotel={hotel} />

      {/* HOTEL SUMMARY */}
      <HotelDetailSummary hotel={hotel} />

      {/* HOTEL FACILITIES */}
      <HotelDetailFacilities hotel={hotel} />

      {/* HOTEL IMAGE */}
      <HotelDetailImages hotel={hotel} />

      {/* HOTEL ROOMS */}
      <MaxWidthWrapper>
        <div className="my-5 hidden flex-col items-center justify-center space-y-10 p-4 lg:flex">
          <h2 className="border-b p-4 text-xl text-black/70 shadow md:text-2xl md:font-bold lg:text-4xl">
            Available Hotel Rooms (Right now)
          </h2>

          <div className="mt-4 flex items-center justify-center gap-2 border p-2 shadow">
            <button
              className=":bg-accent-500 mr-2 flex w-[2rem] items-center justify-center rounded bg-accent-500 px-2 py-1 text-xs text-slate-200 shadow transition-all duration-300 disabled:text-slate-200"
              onClick={() => {
                setActive("");
                navigate(`/hotels/${id}`);
              }}
            >
              all
            </button>
            {["single", "double", "twin", "triple", "quad", "twin-double"].map(
              (type) => (
                <button
                  disabled={active === type}
                  className="flex w-[5rem] items-center justify-center rounded bg-slate-100 px-2 py-1 text-xs text-slate-500 shadow transition-all duration-300 hover:bg-accent-500 hover:text-slate-200 disabled:cursor-not-allowed disabled:bg-accent-500 disabled:text-slate-200"
                  key={type}
                  onClick={() => handleSearchParams(type)}
                >
                  {type}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="mx-auto hidden w-[70vw] grid-cols-[300px,300px,300px] items-center justify-center gap-4 rounded-md p-4 shadow-xl lg:grid">
          {isLoadingRooms ? (
            <div className="col-span-3 flex w-full items-center justify-center">
              <Spinner />
            </div>
          ) : rooms?.length && rooms?.length > 0 ? (
            rooms.slice(0, 6).map((room, i) => <RoomCard key={i} room={room} />)
          ) : (
            <div className="flex h-[200px] w-[70vw] items-center justify-center p-4">
              <p className="text-2xl font-bold text-slate-500">
                There are no rooms found 404{"(:"}
              </p>
            </div>
          )}
          {rooms?.length && rooms?.length > 0 && (
            <div className="col-span-3 flex items-center justify-center">
              <Link
                to="rooms"
                className="mt-16 flex w-[30rem] items-center justify-center gap-4 rounded bg-gradient-to-r from-accent-800 via-accent-500 to-accent-800 px-6 py-4 text-center text-xl font-bold capitalize text-slate-200 transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              >
                See More Rooms On this hotel
                <span className="text-white">&gt;&gt;</span>
              </Link>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default HotelDetail;
