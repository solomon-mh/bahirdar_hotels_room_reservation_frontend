import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IBooking } from "../../types/bookingTypes";
import { DatePicker } from "../../forms/components/datePicker";
import AvailableDatesTable from "./AvDates";
import { addDays } from "date-fns";
import { calculateNumOfNights } from "../../utils/numOfNights";

export default function BookingForm({
    onSubmit,
    isBooking
}: {
    onSubmit: (data: IBooking) => void;
    isBooking?: boolean;
}) {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IBooking>();
    const [pricePerNight] = useState(100); // Example price per night
    const checkInDate = watch("checkIn");
    const checkOutDate = watch("checkOut");



    const numOfNights = calculateNumOfNights(checkInDate.toString(), checkOutDate.toString());
    const totalPrice = numOfNights * pricePerNight;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to midnight for accurate comparisons

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-slate-100 w-[60vw] p-6 rounded-lg shadow-md space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Book a Room
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Check-In Date */}
                <div>
                    <div className="space-y-1">
                        <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                            Check-in Date
                        </label>
                        <Controller
                            name="checkIn"
                            control={control}
                            rules={{
                                required: "Check-in date is required.",
                                validate: value =>
                                    new Date(value) >= today || "Check-in date cannot be in the past.",
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    date={field.value}
                                    setDate={field.onChange}
                                    minDate={today}
                                    maxDate={checkOutDate ? new Date(checkOutDate) : undefined}
                                />
                            )}
                        />
                    </div>
                    {errors.checkIn && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>
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

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Number of Nights
                    </label>
                    <p className="mt-1 font-semibold">
                        {!!numOfNights && <span>
                            {numOfNights} night{numOfNights > 1 && "s"}
                        </span>
                        }
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Total Price
                    </label>
                    <p className="mt-1 font-semibold">
                        {
                            !!totalPrice && `$${totalPrice.toFixed(2)}`
                        }
                    </p>
                </div>
            </div>
            <AvailableDatesTable />
            <button
                disabled={isBooking}
                type="submit"
                className="w-full px-4 py-2 text-slate-100 bg-accent-500 text-white rounded-md hover:bg-accent-500-dark"
            >
                Book Room
            </button>
        </form>
    );
}
