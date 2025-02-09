import { IBooking } from "./bookingTypes";
import { Hotel } from "./hotelTypes";
import { Room } from "./roomTypes";
import { User } from "./userTypes";

export interface IAcceptPayment {
  status: string;
  checkout_url: string;
  data: IBookingDetailWithRoomUserHotel;
}

export interface IBookingDetailWithRoomUserHotel
  extends Omit<IBooking, "room" | "user"> {
  room: Room;
  user: User;
  hotel: Hotel;
}
