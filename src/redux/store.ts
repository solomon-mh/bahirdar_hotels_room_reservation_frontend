import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { hotelApi } from "./api/hotelApi";
import { roomApi } from "./api/roomsApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(hotelApi.middleware)
      .concat(roomApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
