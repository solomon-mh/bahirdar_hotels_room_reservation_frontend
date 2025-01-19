import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IHotel, IHotelResponse } from "../../types/hotelTypes";
import { CreateResponse } from "../../types/general";
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
  }),
  endpoints: (builder) => ({
    getAllHotelIHotels: builder.query<IHotelResponse, string | undefined>({
      query: (params) => {
        return params ? `/?${params}` : "/";
      },
      providesTags: [Tags.HOTELS],
    }),
    getHotelIHotelById: builder.query<IHotelResponse, string>({
      query: (id) => `/${id}`,
      providesTags: [Tags.HOTEL],
    }),
    createHotelIHotel: builder.mutation<CreateResponse, IHotel>({
      query: (newHotelIHotel) => ({
        url: "/",
        method: "POST",
        body: newHotelIHotel,
      }),
      invalidatesTags: [Tags.HOTELS],
    }),
    updateHotelIHotel: builder.mutation<
      CreateResponse,
      { id: string; data: IHotel }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [Tags.HOTELS, Tags.HOTEL],
    }),
    deleteHotelIHotel: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [Tags.HOTELS, Tags.HOTEL],
    }),
  }),
});

export const {
  useCreateHotelIHotelMutation,
  useDeleteHotelIHotelMutation,
  useGetAllHotelIHotelsQuery,
  useGetHotelIHotelByIdQuery,
  useUpdateHotelIHotelMutation,
} = hotelApi;
