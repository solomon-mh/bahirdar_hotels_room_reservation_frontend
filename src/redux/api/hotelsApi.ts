import { createSlice } from "@reduxjs/toolkit";
import { IHotel } from "../../types/hotelTypes";

const initialState: {
  hotels: IHotel[];
  hotel: IHotel | undefined;
} = {
  hotels: [],
  hotel: undefined,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    addHotel: (state, action) => {
      state.hotels.push(action.payload);
    },
    removeHotel: (state, action) => {
      state.hotels = state.hotels.filter(
        (hotel) => hotel._id !== action.payload._id,
      );
    },
  },
});

export const { addHotel, removeHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
