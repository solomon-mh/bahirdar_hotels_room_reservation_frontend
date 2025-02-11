import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IBooking } from "@/types/bookingTypes";
import { DatePicker } from "@/forms/components/datePicker";
import { addDays } from "date-fns";
import { calculateNumOfNights } from "@/utils/numOfNights";
import { useGetRoomBookingsByRoomIdQuery } from "@/redux/api/bookingApi";
import LoadingPage from "@/pages/utils/LoadingPage";
import NotFoundPage from "@/pages/utils/NotFoundPage";
import { IRoom } from "@/types/roomTypes";
import { ITimeStamp } from "@/types/general";
import { getDateRange } from "@/utils/date";
import { useParams } from "react-router-dom";
import RoomBookings from "./RoomBookings";

export default function BookingForm({
  onSubmit,
  isBooking,
}: {
        room: IRoom & ITimeStamp
    onSubmit: (data: IBooking) => void;
    isBooking?: boolean;
}) {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IBooking>();
    const [activeDates, setActiveDates] = useState<Date[]>([]);
  const { roomId } = useParams<{ roomId: string, }>();


    const checkInDate = watch("checkIn");
    const checkOutDate = watch("checkOut");

  const { data: { data: bookings, room, pagination } = {}, isLoading, error } = useGetRoomBookingsByRoomIdQuery({ roomId: roomId as string });
  const [pricePerNight, setPricePerNight] = useState(room?.pricePerNight); // Example price per night


  const numOfNights = calculateNumOfNights(
    checkInDate?.toString(),
    checkOutDate?.toString(),
  );
    const totalPrice = pricePerNight ? numOfNights * pricePerNight : 0;


    useEffect(() => {
      bookings?.forEach(booking => {
            const firstDate = new Date(booking.checkIn);
            const lastDate = new Date(booking.checkOut);

            setActiveDates((prev) => {
                return [...prev, ...getDateRange(firstDate, lastDate)]
            })
      });
    }, [bookings])
  useEffect(() => {
    if (room)
    {
      setPricePerNight(room.pricePerNight);
    }
  }, [room]);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight for accurate comparisons

  if (isLoading) {
    return <div>Loading</div>;
  }



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:w-[50vw] p-3 w-[95vw] space-y-6 rounded-lg bg-slate-100 md:p-6 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Book a Room</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Check-In Date */}
        <div>
          <div className="space-y-1">
            <label
              htmlFor="checkIn"
              className="block text-sm font-medium text-gray-700"
            >
              Check-in Date
            </label>
            <Controller
              name="checkIn"
              control={control}
              rules={{
                required: "Check-in date is required.",
                validate: (value) =>
                  new Date(value) >= today ||
                  "Check-in date cannot be in the past.",
              }}
              render={({ field }) => (
                <DatePicker
                  activeDates={Array.from(new Set(activeDates))}
                  date={field.value}
                  setDate={field.onChange}
                  minDate={today}
                  maxDate={checkOutDate ? new Date(checkOutDate) : undefined}
                />
              )}
            />
          </div>
          {errors.checkIn && (
            <p className="mt-1 text-sm text-red-500">
              {errors.checkIn.message}
            </p>
          )}
        </div>

                {/* Check-Out Date */}
                <div>
                    <div className="space-y-1">
                        <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                            Check-out Date
                        </label>
                        <Controller
                            name="checkOut"
                            control={control}
                            rules={{
                                required: "Check-out date is required.",
                                validate: value => {
                                    if (!checkInDate) return true;
                                    return (
                                        new Date(value) > new Date(checkInDate) ||
                                        "Check-out date must be after the check-in date."
                                    );
                                },
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    activeDates={Array.from(new Set(activeDates))}
                                    date={field.value}
                                    setDate={field.onChange}
                                    minDate={addDays(checkInDate ? new Date(checkInDate) : today, 1)}
                                />
                            )}
                        />
                    </div>
                    {errors.checkOut && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>
                    )}
                </div>

                {/* Number of Nights */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Number of Nights
                    </label>
                    <p className="mt-1 font-semibold">
                        {!!numOfNights && (
                            <span>
                                {numOfNights} night{numOfNights > 1 && "s"}
                            </span>
                        )}
                    </p>
                </div>

                {/* Total Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Total Price
                    </label>
                    <p className="mt-1 font-semibold">
                        {!!totalPrice && `$${totalPrice.toFixed(2)}`}
                    </p>
                </div>
            </div>

            {/* Loading or Error Handling */}
            <div className="flex flex-col items-center">
        {
          isLoading
            ? (
              <LoadingPage />
            )
            :
            error
              ?
              (
                <NotFoundPage>
                  <pre>{JSON.stringify(error, null, 2)}</pre>
                </NotFoundPage>
              )
              :
              bookings
              &&
              (
                <RoomBookings
                  pagination={pagination}
                  bookings={bookings}
                />
              )
        }
            </div>

            {/* Submit Button */}
            <button
                disabled={isBooking}
                type="submit"
                className="w-full px-4 py-2 0 bg-accent-500 text-white rounded-md hover:bg-accent-500-dark mt-4"
            >
                Book Room
            </button>
        </form>

    );
}
