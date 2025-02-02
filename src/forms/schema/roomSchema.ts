import { z } from "zod";
import { RoomType } from "../../enums/roomTypeEnum";

export const roomSchema = z.object({
  hotel: z.string().min(1, "Hotel name is required"),
  roomNumber: z.string().min(1, "Room number is required"),
  roomType: z.nativeEnum(RoomType, {
    errorMap: () => ({ message: "Invalid room type" }),
  }),
  roomFacilities: z
    .array(z.string())
    .min(1, "At least one facility is required"),
  capacity: z
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(1, "Capacity must be at least 1")
    .max(100, "Capacity cannot exceed 100"),
  description: z.string().optional(),
  pricePerNight: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Price must be at least $1"),
  images: z
    .array(z.string().url("Each image URL must be valid"))
    .min(1, "At least one image URL is required"),
  isAvailable: z.boolean(),
});
