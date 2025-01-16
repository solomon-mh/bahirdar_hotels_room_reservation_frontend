import { Booking } from "./bookingTypes";
import { Hotel } from "./hotelTypes";

export interface User{
    id: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    photo: string;
    phoneNumber: string;
  hotel?: Hotel;
  bookings?: Booking[]
    [key: string]: unknown;
}

export interface UserFilter {
    search: string,
    role: string,
    limit: string
}

export interface ResetPassInterface {
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdatePasswordForm {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

export interface IUpdateMeForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: FileList;
  phone: string;
}