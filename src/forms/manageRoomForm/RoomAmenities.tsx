import { useFormContext } from "react-hook-form";
import { AMENITIES } from "../../constants/RoomAmenities";

function RoomAmenities() {
  const { register, formState: { errors } } = useFormContext<{ roomFacilities: string[] }>();

  return (
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
  );
}

export default RoomAmenities
