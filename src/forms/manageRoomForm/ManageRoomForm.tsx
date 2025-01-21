import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import {
  RoomAmenities,
  RoomCapacity,
  RoomDescription,
  RoomImages,
  RoomNumber,
  RoomPricePerNight,
  RoomType,
} from "./index";
import { FormProvider, useForm } from "react-hook-form";
import { IRoom } from "../../types/roomTypes";
// import { useAuthContext } from "../../context/AuthContext";

interface Props {
  onSubmit: (room: FormData) => void;
  room?: IRoom,
  isLoading?: boolean,
  isAdding?: boolean,
  isUpdating?: boolean,
  isInUpdateMode?: boolean
}
function ManageRoomForm({
  onSubmit,
  room,
  isLoading,
  isAdding,
  isUpdating,
  isInUpdateMode = false,
}: Props) {

  // const { currentHotel } = useAuthContext()
  const formMethods = useForm<IRoom & { RoomImageFiles: FileList, "isInUpdateMode": boolean }>();
  const { handleSubmit, reset, setValue, formState: { errors } } = formMethods;

  // RESET THE ROOM TO BE UPDATED
  useEffect(() => {
    if (room)
    {
      reset(room);
      setValue("isInUpdateMode", isInUpdateMode);
    }
  }, [reset, room, isInUpdateMode, setValue]);

  const onSubmitHandler = handleSubmit((data) => {
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

    onSubmit(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <div className="flex items-center justify-center p-3">
        <h1 className="min-w-[30rem] cursor-pointer rounded-full text-slate-100 bg-accent-500 px-6 py-2 text-center text-2xl font-bold text-white shadow-xl">
          {isInUpdateMode ? "Update Add" : "Add Room"}
        </h1>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="m-auto flex flex-col gap-8 rounded bg-slate-100 p-10 shadow-lg"
          >

            <pre>
              {
                [errors._id?.message, errors.RoomImageFiles?.message, errors.capacity?.message, errors.description?.message, errors.images?.message, errors.hotel?.message, errors.pricePerNight?.message, errors.capacity?.message].join(',')
              }
            </pre>

          <div className="flex flex-col gap-4">
            {/* ROOM NUMBER */}
              <RoomNumber />



            {/* ROOM TYPE */}
            <RoomType />

            {/* PRICE PER NIGHT */}
            <RoomPricePerNight />

            {/* CAPACITY */}
            <RoomCapacity />

            {/* ROOM DESCRIPTION */}
            <RoomDescription />

            {/* ROOM AMENITIES */}
            <RoomAmenities />

            {/* ROOM IMAGES */}
            <RoomImages />
          </div>

          <button
            type="submit"
              className="w-full rounded bg-accent-500/90 px-3 py-2 text-slate-100 transition-all duration-300 hover:bg-accent-500 disabled:cursor-not-allowed disabled:bg-accent-600"
            disabled={isAdding || isUpdating}
          >
            {isAdding || isUpdating ? <SpinnerMini /> : "Save Room"}
          </button>
        </form>
      )}
    </FormProvider>
  );
}

export default ManageRoomForm;
