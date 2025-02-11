import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { useDeleteBookingMutation, useGetBookingByIdQuery, useUpdateBookingStatusMutation } from "../../redux/api/bookingApi";
import { useParams } from "react-router-dom";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft } from "lucide-react";
import ImageSlider from "../../components/Slider";
import DeleteFeature, { FeatureDeleteActionType } from "../../components/DeleteDialog";
import ConfirmAction from "../../components/ConfirmDialog";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BookingStatus } from "../../enums/bookingStatusEnum";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { getBookingStatusTextColor } from "./color-utils";

export default function BookingDetails() {
    const bookingStatuses = Object.values(BookingStatus);
  const { hotelId, userId } = useParams<{ hotelId: string, userId: string }>();
    const { bookingId } = useParams<{ bookingId: string }>();
    const { data: { data: booking } = {}, isLoading, error } = useGetBookingByIdQuery(bookingId as string);
    const [confirimAction, { isLoading: updating }] = useUpdateBookingStatusMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<BookingStatus | null>(booking?.status || null);
    const onConfirm = () => {
        try
        {

            if (!status) return;
            confirimAction({
                id: bookingId as string,
                status: status
            }).then(() => {
                toast.success(`Book status from ${booking?.status} to ${status} successfully`);
                setIsOpen(false);
            }).catch((err) => {
                if ('data' in err)
                {
                    toast.error(err.data.message);
                }
                else
                {
                    toast.error(JSON.stringify(err, null, 2));
                }
            })
        } catch (error)
        {
            toast.error(JSON.stringify(error, null, 2));

        }
    };

    useEffect(() => {
        setStatus(booking?.status || null);
    }, [booking?.status]);

  const isHotelBookingDetail = !!hotelId
  const isUserBookingDetail = !!userId
    return (
      <div className="flex max-w-[95vw] md:max-w-max flex-col gap-4 p-4">
        <div className="flex w-full shadow-lg p-2 items-center justify-between gap-1 md:gap-4 ">
          {(!isHotelBookingDetail && !isUserBookingDetail) ? (
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => window.history.back()}
                className="p-2 flex items-center gap-2 rounded-lg bg-gray-100"
              >
                <ArrowLeft /> <span className="hidden md:inline">block</span>
              </button>
              <h1 className="text-2xl hidden md:block font-semibold">Booking Details</h1>
            </div>

          ) :
            <div className="flex"></div>}
          <div className="flex flex-1  md:flex-none   justify-end items-center gap-2 px-2 w-full md:w-auto">
            <div className="w-full md:w-[180px]">
              <Select value={status as string || ""} onValueChange={(value) => setStatus(value as BookingStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Change Status" className="p-2 rounded-lg text-slate-800 bg-gray-100" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bookingStatuses.map((status, index) => (
                      <SelectItem className={`${getBookingStatusTextColor(status)}`} key={index} value={status}>{status}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <ConfirmAction
              feature="Booking"
              featureId={bookingId || ""}
              onConfirm={onConfirm}
              confirming={updating}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <DeleteFeature
              feature="Booking"
              featureId={bookingId || ""}
              useDelete={useDeleteBookingMutation as FeatureDeleteActionType}
              redirectUrl={`/dashboard${hotelId ? "/hotels/" + hotelId : ""}/bookings`}
            />
          </div>
        </div>

        {isLoading && <LoadingPage />}
        {error && (
          <NotFoundPage>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </NotFoundPage>
        )}
        {!booking && (
          <NotFoundPage>
            <p>Booking not found</p>
          </NotFoundPage>
        )}

        {booking && (
          <div className="w-full md:max-w-6xl md:mx-auto">
            <Card className="p-6 shadow-lg rounded-2xl">
              <h1 className="text-2xl font-semibold mb-4">Booking Details</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Details */}
                <Card className="p-4">
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <img src={booking.user?.profilePicture as string} alt={booking.user?.firstName} className="rounded-full w-16 h-16" />
                      </Avatar>
                      <div>
                        <h2 className="text-lg font-semibold">{booking.user?.firstName} {booking.user?.lastName}</h2>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                        <p className="text-sm text-gray-500">{booking.user?.phoneNumber}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Room Details */}
                <Card className="p-4">
                  <CardContent>
                    <h2 className="text-lg font-semibold">Room Details</h2>
                    <p>Room Number: <span className="font-medium">{booking.room?.roomNumber}</span></p>
                    <p>Type: <span className="font-medium">{booking.room?.roomType}</span></p>
                    <p>Capacity: <span className="font-medium">{booking.room?.capacity} people</span></p>
                    <p className="text-gray-500">{booking.room?.description}</p>
                    <div className="mt-2">
                      <h3 className="font-semibold">Facilities:</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {booking.room?.roomFacilities.map((facility, index) => (
                          <Badge key={index} className="bg-slate-100 text-accent-500 cursor-pointer hover:bg-slate-200">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Room Images */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Room Images</h2>
                {
                  booking.room?.images.length > 1 ? (
                    <ImageSlider slidesToShow={2} images={booking.room?.images} />
                  ) : (
                    <div className="flex gap-4">
                      {booking.room?.images.map((image, index) => (
                        <div key={index} className="h-64 w-1/2">
                          <img src={image} alt={`Room Image ${index + 1}`} className="h-full w-full object-cover rounded-md" />
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>

              {/* Booking Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <CardContent>
                    <h2 className="text-lg font-semibold">Booking Info</h2>
                    <p>Check-in: <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span></p>
                    <p>Check-out: <span className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</span></p>
                    <p>Status: <Badge className="bg-yellow-100 text-yellow-600">{booking.status}</Badge></p>
                  </CardContent>
                </Card>

                <Card className="p-4">
                  <CardContent>
                    <h2 className="text-lg font-semibold">Pricing</h2>
                    <p>Price per Night: <span className="font-medium">${booking.pricePerNight}</span></p>
                    <p>Number of Nights: <span className="font-medium">{booking.numOfNights}</span></p>
                    <p className="text-xl font-semibold">Total: ${booking.totalPrice}</p>
                  </CardContent>
                </Card>
              </div>
            </Card>
          </div>
        )}
      </div>

    );
}
