import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHotel, IHotelResponse } from "../../types/hotelTypes";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";

enum Tags {
  HOTELS = "hotels",
  HOTEL = "hotel",
}
export const hotelApi = createApi({
  reducerPath: "hotelApi",
  tagTypes: [Tags.HOTELS, Tags.HOTEL],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/hotels`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllHotels: builder.query<IHotelResponse, string | undefined>({
      query: (params) => {
        return params ? `/` : "/";
      },
      providesTags: [Tags.HOTELS],
    }),
    getHotelById: builder.query<
      { data: { hotel: IHotel & ITimeStamp } },
      string
    >({
      query: (id) => `/${id}`,
      providesTags: [Tags.HOTEL],
    }),
    createHotel: builder.mutation<CreateResponse, FormData>({
      query: (newHotel) => ({
        url: "/",
        method: "POST",
        body: newHotel,
      }),
      invalidatesTags: [Tags.HOTELS],
    }),
    updateHotel: builder.mutation<CreateResponse, { id: string; data: IHotel }>(
      {
        query: ({ id, data }) => ({
          url: `/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [Tags.HOTELS, Tags.HOTEL],
      },
    ),
    deleteHotel: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [Tags.HOTELS, Tags.HOTEL],
    }),
  }),
});

export const {
  useCreateHotelMutation,
  useDeleteHotelMutation,
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
} = hotelApi;
