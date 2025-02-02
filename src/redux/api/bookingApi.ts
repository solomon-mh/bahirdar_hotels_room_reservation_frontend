import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBooking } from "../../types/bookingTypes";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";

export enum BookingTags {
  BOOKINGS = "bookings",
  BOOKING = "booking",
}
export const bookingApi = createApi({
  reducerPath: "bookingApi",
  tagTypes: [BookingTags.BOOKINGS, BookingTags.BOOKING],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/bookings`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllBookings: builder.query<
      {
        data: (IBooking & ITimeStamp)[];
      },
      string | undefined
    >({
      query: (params) => {
        return params ? `/?${params}` : "/";
      },
      providesTags: [BookingTags.BOOKINGS],
    }),
    getBookingById: builder.query<{ data: IBooking & ITimeStamp }, string>({
      query: (id) => `/${id}`,
      providesTags: [BookingTags.BOOKING],
    }),
    createBooking: builder.mutation<CreateResponse, IBooking>({
      query: (newBooking) => ({
        url: "/",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: [BookingTags.BOOKINGS],
    }),
    updateBooking: builder.mutation<
      CreateResponse,
      { id: string; data: IBooking }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [BookingTags.BOOKINGS, BookingTags.BOOKING],
    }),
    deleteBooking: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [BookingTags.BOOKINGS, BookingTags.BOOKING],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
} = bookingApi;
