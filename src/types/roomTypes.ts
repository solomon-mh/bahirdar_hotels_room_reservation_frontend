import { RoomType } from "../enums/roomTypeEnum";
import { ITimeStamp } from "./general";

export interface Room {
  id: number;
  _id: string;
  name: string;
  roomType: string;
  price: number;
  roomNumber: string;
  images: string[];
  description: string;
  amenities: string[];
  pricePerNight: string;
  capacity: string;
  [key: string]: unknown;
}

export interface RoomFilter {
  search: string;
  roomType: string;
  sort: string;
  selectedTypes: string[];
}

export interface IRoom {
  _id?: string;
  hotel: string;
  roomNumber: string;
  roomType: RoomType;
  roomFacilities: string[];
  capacity: number;
  description: string;
  pricePerNight: number;
  images: string[];
  isAvailable: boolean;
}

export interface IRoomResponse {
  data: (IRoom & ITimeStamp)[];
}
