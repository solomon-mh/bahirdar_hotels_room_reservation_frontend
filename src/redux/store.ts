import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { hotelApi } from "./api/hotelApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(hotelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
