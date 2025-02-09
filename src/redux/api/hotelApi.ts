import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHotel } from "../../types/hotelTypes";
import { CreateResponse, IPagination, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IRoom } from "../../types/roomTypes";

export enum HotelTags {
  HOTELS = "hotels",
  HOTEL = "hotel",
  HOTEL_ROOMS = "hotel_Rooms",
}
export const hotelApi = createApi({
  reducerPath: "hotelApi",
  tagTypes: [HotelTags.HOTELS, HotelTags.HOTEL, HotelTags.HOTEL_ROOMS],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/hotels`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllHotels: builder.query<
      { data: (IHotel & ITimeStamp)[]; pagination: IPagination },
      string | undefined
    >({
      query: (params) => {
        const searchParams = new URLSearchParams(params);
        return params ? `/?${searchParams}` : "/";
      },
      providesTags: [HotelTags.HOTELS],
    }),
    getHotelById: builder.query<
      { data: { hotel: IHotel & ITimeStamp } },
      string
    >({
      query: (id) => `/${id}`,
      providesTags: [HotelTags.HOTEL],
    }),
    createHotel: builder.mutation<CreateResponse, FormData>({
      query: (newHotel) => ({
        url: "/",
        method: "POST",
        body: newHotel,
      }),
      invalidatesTags: [HotelTags.HOTELS],
    }),
    updateHotel: builder.mutation<
      CreateResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [HotelTags.HOTELS, HotelTags.HOTEL],
    }),
    deleteHotel: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [HotelTags.HOTELS, HotelTags.HOTEL],
    }),
    getHotelRooms: builder.query<{ data: IHotel & { rooms: IRoom[] } }, string>(
      {
        query: (id) => `/with-rooms/${id}`,
        providesTags: (_, __, id) => [{ type: HotelTags.HOTEL_ROOMS, id }],
      },
    ),
  }),
});

export const {
  useCreateHotelMutation,
  useDeleteHotelMutation,
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
  useGetHotelRoomsQuery,
} = hotelApi;

