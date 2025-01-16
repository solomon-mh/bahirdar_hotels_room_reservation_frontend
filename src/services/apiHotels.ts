import { Hotel, HotelFilter } from "../types/hotelTypes";
import customFetch from "../utils/customFetch";

const addHotel = async (hotel:FormData) => await customFetch.post("/hotels", hotel);

const getPopularHotels = async () => {
  const res = await customFetch(
    `/hotels?sort=hotelStar-desc&limit=6&fields=name,address,summary,hotelStar,imageCover,minPricePerNight,numOfRooms,avgRating`,
  );

  return res.data as {data: {hotels: Hotel[]}};
};

const getAllHotels = async ({ filter }: {filter: HotelFilter}) :Promise<{data: {hotels: Hotel[]}}>=> {
  const { search, hotelStar, sort, selectedStars } = filter;
  let url = `/hotels?search=${search}&sort=${sort}`;

  if (selectedStars?.length) {
    selectedStars.forEach((val) => (url = url + `&hotelStar=${val}`));
  } else if (hotelStar) {
    url = url + `&hotelStar=${hotelStar}`;
  }
  const res = await customFetch.get(url);

  return res.data;
};

const getHotel = async ({ id }: { id: string }): Promise<{ data: { data: { hotel: Hotel } } }> => {
  const res = await customFetch.get(`/hotels/${id}`);
  return res.data;
};

const updateHotel = async ({ updatedHotelData, id }: {updatedHotelData: FormData, id: string}) => {
  const res = await customFetch.patch(`/hotels/${id}`, updatedHotelData);
  return res.data;
};

const deleteHotel = async (id: string) => {
  const res = await customFetch.delete(`/hotels/${id}`);
  return res.data;
};

const apiHotels = {
  addHotel,
  getHotel,
  getAllHotels,
  deleteHotel,
  updateHotel,
  getPopularHotels,
};

export default apiHotels;
