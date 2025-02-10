import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBooking, IBookingResponse } from "../../types/bookingTypes";
import { CreateResponse, IPagination, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IHotel } from "../../types/hotelTypes";
import { BookingStatus } from "../../enums/bookingStatusEnum";

export enum BookingTags {
  BOOKINGS = "bookings",
  BOOKING = "booking",
  HOTEL_BOOKINGS = "hotel_bookings",
}
export const bookingApi = createApi({
  reducerPath: "bookingApi",
  tagTypes: [
    BookingTags.BOOKINGS,
    BookingTags.BOOKING,
    BookingTags.HOTEL_BOOKINGS,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/bookings`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllBookings: builder.query<
      {
        data: IBookingResponse[];
        pagination: IPagination;
      },
      string | undefined
    >({
      query: (params) => {
        return params
          ? `/all-bookings-with-room-user-hotel-detail?${params}`
          : "/all-bookings-with-room-user-hotel-detail";
      },
      providesTags: [BookingTags.BOOKINGS],
    }),
    getBookingById: builder.query<{ data: IBookingResponse }, string>({
      query: (id) => `/booking-with-room-user-hotel-detail/${id}`,
      providesTags: [BookingTags.BOOKING],
    }),
    createBooking: builder.mutation<
      { data: IBooking } & Omit<CreateResponse, "data">,
      IBooking
    >({
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
        method: "PATCH",
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
    getHotelBookings: builder.query<
      {
        data: {
          hotel: IHotel & ITimeStamp;
          bookings: (IBookingResponse & ITimeStamp)[];
        };
        pagination: IPagination;
      },
      string
    >({
      query: (hotelId) => `/all-bookings-of-a-hotel/${hotelId}`,
      providesTags: [BookingTags.HOTEL_BOOKINGS],
    }),
    updateBookingStatus: builder.mutation<
      { data: IBooking } & Omit<CreateResponse, "data">,
      {
        id: string;
        status: BookingStatus;
      }
    >({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { status },
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
  useGetHotelBookingsQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;
