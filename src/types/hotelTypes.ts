import { Booking } from "./bookingTypes";

export interface Hotel{
    _id: string;
    id:string;
    name: string;
    imageCover: string;
    hotelStar: string;
    address: string;
    numOfRooms: number;
    facilities: string[];
    description: string;
    summary: string;
    avgRating: number;
    numOfRatings: number;
    minPricePerNight: number;
    hotelImages: string[];
    bookings: Booking[]
    [key: string]: unknown
}

export interface HotelFilter {
    search: string,
    hotelStar: string,
    sort: string,
    selectedStars: string[]
}
