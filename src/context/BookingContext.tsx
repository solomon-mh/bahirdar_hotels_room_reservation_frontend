/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
export interface BookingContextType {
  checkIn: string;
  checkOut: string;
  handleCheckIn: (date: string) => void;
  handleCheckOut: (date: string) => void;
}
const BookingContext = createContext<BookingContextType>({
  checkIn: "",
  checkOut: "",
  handleCheckIn: () => { },
  handleCheckOut: () => { },
});

function BookingContextProvider({ children }: { children: React.ReactNode }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleCheckIn = (date: string) => {
    setCheckIn(date);
  };

  const handleCheckOut = (date: string) => {
    setCheckOut(date);
  };

  return (
    <BookingContext.Provider
      value={{
        checkIn,
        checkOut,
        handleCheckIn,
        handleCheckOut,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

const useBookingContext = () => {
  const ctx = useContext(BookingContext);

  if (!ctx)
  {
    throw new Error(
      "useBookingContext must be used within a BookingContextProvider",
    );
  }

  return ctx;
};

export { BookingContextProvider, useBookingContext };
