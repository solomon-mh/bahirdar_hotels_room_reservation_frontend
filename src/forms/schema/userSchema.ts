import { z } from "zod";

export const AddressZodSchema = z.object(
  {
    country: z
      .string({ message: "country is required" })
      .min(3, { message: "country should be at least 3 characters" })
      .max(255, { message: "country should be at most 255 characters" }),
    city: z
      .string({ message: "city is required" })
      .min(4, { message: "city should be at least 4 characters" })
      .max(255, { message: "city should be at most 255 characters" }),
    subcity: z
      .string({ message: "subcity is required" })
      .min(4, { message: "subcity should be at least 4 characters" })
      .max(255, { message: "subcity should be at most 255 characters" }),
    woreda: z.optional(
      z
        .string()
        .max(255, { message: "woreda should be at most 255 characters" }),
    ),
    street: z
      .string({ message: "street is required" })
      .min(4, { message: "street should be at least 4 characters" })
      .max(255, { message: "street should be at most 255 characters" }),
  },
  {
    message:
      "Invalid address, address must be contain city, subcity, woreda and street",
  },
);
export const completeOnboardingSchema = z.object({
  profilePicture: z
    .any()
    .refine((file) => file?.length > 0, "Profile picture is required"),
  idPhoto_front: z
    .any()
    .refine((file) => file?.length > 0, "Identity photo is required"),
  idPhoto_back: z
    .any()
    .refine((file) => file?.length > 0, "Identity photo is required"),
  firstName: z
    .string({ message: "First name is required" })
    .min(4, { message: "First name should be at least 4 characters" })
    .max(255, { message: "First name should be at most 255 characters" }),
  lastName: z
    .string({ message: "Last name is required" })
    .min(4, { message: "Last name should be at least 4 characters" })
    .max(255, { message: "Last name should be at most 255 characters" }),
  dateOfBirth: z.string({ message: "Date of birth is required" }),
  gender: z.enum(["male", "female"], {
    message: "Invalid gender, it should be either male or female",
  }),
  phoneNumber: z
    .string({ message: "Phone number is required" })
    .min(10, { message: "Invalid phone number" }),
  address: AddressZodSchema,
});
