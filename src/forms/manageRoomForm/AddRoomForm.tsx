import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomSchema } from "../schema/roomSchema";
import { RoomType } from "../../enums/roomTypeEnum";
import { useCreateRoomMutation } from "../../redux/api/rooms";
import { toast } from "react-toastify";
import { IRoom } from "../../types/roomTypes";
import { AMENITIES } from "../../constants/RoomAmenities";



const AddRoomPage: React.FC = () => {

    const [createRoom, { isLoading }] = useCreateRoomMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<IRoom & { RoomImageFiles: FileList, "isInUpdateMode": boolean }>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            isAvailable: true, // Default room availability
        },
    });
    const existingImageUrls = watch("images");

    const handleDeleteHotelImages = (e: React.MouseEvent<HTMLButtonElement>, image: string) => {
        e.preventDefault();

        setValue(
            "images",
            existingImageUrls.filter((img) => img !== image),
        );
    };

    const onSubmit = (data: IRoom & { RoomImageFiles: FileList, "isInUpdateMode": boolean }) => {
        try
        {

            const formData = new FormData();

            formData.append("roomNumber", data.roomNumber);
            formData.append("roomType", data.roomType);
            formData.append("pricePerNight", data.pricePerNight.toString());
            formData.append("capacity", data.capacity.toString());
            formData.append("description", data.description);
            formData.append("hotel", "678fd33c84843004f747be22")
            data.roomFacilities.forEach((amenity, i) => {
                formData.append(`roomFacilities[${i}]`, amenity);
            });

            if (data?.RoomImageFiles)
            {
                Array.from(data.RoomImageFiles).forEach((image) => {
                    formData.append("images", image);
                });
            }

            if (data?.images)
            {
                data.images.forEach((image, i) => {
                    formData.append(`images[${i}]`, image);
                });
            }


            createRoom(formData).unwrap().then((response) => {
                toast.success(response.message || "Room added succefully")
            }).catch((err) => {
                if ('data' in err)
                {
                    const { message } = err.data as { message: string }
                    toast.error(message || "Failed to add room")
                }
                else
                {
                    toast.error(JSON.stringify(err, null, 2))
                }
            })
        }
        catch (err)
        {
            console.error(err)
            toast.error("Cannot add room please try again")
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Room</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Hotel Name */}
                <div>
                    <label className="block text-gray-600 mb-1">Hotel Name</label>
                    <input
                        {...register("hotel")}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.hotel ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.hotel && <p className="text-red-500 text-sm">{errors.hotel.message}</p>}
                </div>

                {/* Room Number */}
                <div>
                    <label className="block text-gray-600 mb-1">Room Number</label>
                    <input
                        {...register("roomNumber")}
                        type="text"
                        className={`w-full p-2 border rounded ${errors.roomNumber ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.roomNumber && (
                        <p className="text-red-500 text-sm">{errors.roomNumber.message}</p>
                    )}
                </div>

                {/* Room Type */}
                <div>
                    <label className="block text-gray-600 mb-1">Room Type</label>
                    <select
                        {...register("roomType")}
                        className={`w-full p-2 border rounded ${errors.roomType ? "border-red-500" : "border-gray-300"
                            }`}
                    >
                        {Object.values(RoomType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.roomType && <p className="text-red-500 text-sm">{errors.roomType.message}</p>}
                </div>

                <div>
                    <h1 className="text-xl font-bold">Room Amenities</h1>
                    <div className="grid grid-cols-5 gap-4 border-2 p-3">
                        {AMENITIES.map((amenity) => (
                            <label key={amenity} className="flex flex-1 items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={amenity}
                                    className="p-2 accent-accent-600"
                                    {...register("roomFacilities", {
                                        validate: (roomFacilities) => {
                                            if (!roomFacilities || roomFacilities.length < 3)
                                            {
                                                return "a room should have at least 3 roomFacilities";
                                            }
                                            return true;
                                        },
                                    })}
                                />
                                <span>{amenity}</span>
                            </label>
                        ))}
                    </div>
                    {errors.roomFacilities && (
                        <p className="text-sm font-normal text-red-700">
                            {errors.roomFacilities.message}
                        </p>
                    )}
                </div>
                {/* Capacity */}
                <div>
                    <label className="block text-gray-600 mb-1">Capacity</label>
                    <input
                        {...register("capacity", { valueAsNumber: true })}
                        type="number"
                        className={`w-full p-2 border rounded ${errors.capacity ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.capacity && (
                        <p className="text-red-500 text-sm">{errors.capacity.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-600 mb-1">Description</label>
                    <textarea
                        {...register("description")}
                        className={`w-full p-2 border rounded ${errors.description ? "border-red-500" : "border-gray-300"
                            }`}
                        rows={3}
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Price Per Night */}
                <div>
                    <label className="block text-gray-600 mb-1">Price Per Night ($)</label>
                    <input
                        {...register("pricePerNight", { valueAsNumber: true })}
                        type="number"
                        className={`w-full p-2 border rounded ${errors.pricePerNight ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.pricePerNight && (
                        <p className="text-red-500 text-sm">{errors.pricePerNight.message}</p>
                    )}
                </div>

                {/* Images */}
                <div>
                    <div className="mb-10">
                        {existingImageUrls?.length > 0 ? (
                            <div>
                                <h2>Rooms Images</h2>
                                <div className="grid grid-cols-4 gap-3">
                                    {existingImageUrls.map((image, i) => (
                                        <div key={i} className="group relative bg-gray-200">
                                            <img
                                                key={i}
                                                src={image}
                                                alt={`image-${i + 1}`}
                                                className="h-[200px] w-[300px] object-center"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition duration-300 group-hover:opacity-100">
                                                <button
                                                    onClick={(e) => handleDeleteHotelImages(e, image)}
                                                    type="button"
                                                    className="rounded-full bg-red-700 px-2 py-1 text-white"
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex justify-center gap-3">
                        <div className="flex-1 p-3">
                            <label className="mx-auto flex w-[40%] flex-col rounded-md border-2 bg-slate-200 p-2 hover:cursor-pointer">
                                upload room images - at-least 1 images
                                {existingImageUrls?.length && (
                                    <span>
                                        ( you can add {10 - existingImageUrls?.length} additional images
                                        )
                                    </span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    disabled={10 - existingImageUrls?.length <= 0}
                                    className="hover:cursor-pointer"
                                    multiple
                                    {...register("RoomImageFiles", {
                                        validate: (RoomImageFiles) => {
                                            const numOfTotalImages =
                                                (RoomImageFiles?.length || 0) +
                                                (existingImageUrls?.length || 0);

                                            if (numOfTotalImages < 1)
                                            {
                                                return "A room must have at least 1 additional images";
                                            }

                                            if (numOfTotalImages > 10)
                                            {
                                                return "A room allowed to have at most 10 additional images";
                                            }

                                            return true;
                                        },
                                    })}
                                />
                                {errors.RoomImageFiles && (
                                    <p className="text-sm font-normal text-red-700">
                                        {errors.RoomImageFiles.message}
                                    </p>
                                )}
                            </label>
                        </div>
                    </div>
                </div>



                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Room
                </button>
            </form>
        </div>
    );
};

export default AddRoomPage;
