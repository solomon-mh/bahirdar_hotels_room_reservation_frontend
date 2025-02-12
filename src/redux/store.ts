import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { hotelApi } from "./api/hotelApi";
import { roomApi } from "./api/roomsApi";
import { bookingApi } from "./api/bookingApi";
import { paymentsApi } from "./api/paymentsApi";
import { authApi } from "./api/authApi";
import { reviewApi } from "./api/reviewApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(hotelApi.middleware)
      .concat(roomApi.middleware)
      .concat(bookingApi.middleware)
      .concat(paymentsApi.middleware)
      .concat(authApi.middleware)
      .concat(reviewApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
