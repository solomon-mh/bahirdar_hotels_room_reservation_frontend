import { Card, CardContent } from "../../components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { useGetBookingByIdQuery } from "../../redux/api/bookingApi";
import { useParams } from "react-router-dom";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import ImageSlider from "../../components/Slider";

export default function BookingDetails() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const { bookingId } = useParams<{ bookingId: string }>();
  const {
    data: { data: booking } = {},
    isLoading,
    error,
  } = useGetBookingByIdQuery(bookingId as string);

  const isHotelBookingDetail = !!hotelId;
  return (
    <div className="flex flex-col gap-4 p-4">
      {!isHotelBookingDetail && (
        <div className="flex w-full items-center gap-4 p-2 shadow-lg">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg bg-gray-100 p-2"
          >
            <ArrowLeft /> back
          </button>
          <h1 className="text-2xl font-semibold">Booking Details</h1>
        </div>
      )}

      {isLoading && <LoadingPage />}

      {error && (
        <NotFoundPage>
          <pre>{JSON.stringify(null, null, 2)}</pre>
        </NotFoundPage>
      )}
      {!booking && (
        <NotFoundPage>
          <p>Booking not found</p>
        </NotFoundPage>
      )}
      {booking && (
        <div className="cotainer w-[80vw]">
          <Card className="rounded-2xl p-6 shadow-lg">
            <h1 className="mb-4 text-2xl font-semibold">Booking Details</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* User Details */}
              <Card className="p-4">
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <img
                        src={booking.user?.profilePicture as string}
                        alt={booking.user?.firstName}
                        className="h-16 w-16 rounded-full"
                      />
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">
                        {booking.user?.firstName} {booking.user?.lastName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {booking.user?.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.user?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Room Details */}
              <Card className="p-4">
                <CardContent>
                  <h2 className="text-lg font-semibold">Room Details</h2>
                  <p>
                    Room Number:{" "}
                    <span className="font-medium">
                      {booking.room.roomNumber}
                    </span>
                  </p>
                  <p>
                    Type:{" "}
                    <span className="font-medium">{booking.room.roomType}</span>
                  </p>
                  <p>
                    Capacity:{" "}
                    <span className="font-medium">
                      {booking.room.capacity} people
                    </span>
                  </p>
                  <p className="text-gray-500">{booking.room.description}</p>
                  <div className="mt-2">
                    <h3 className="font-semibold">Facilities:</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {booking.room.roomFacilities.map((facility, index) => (
                        <Badge
                          key={index}
                          className="cursor-pointer bg-slate-100 text-accent-500 hover:bg-slate-200"
                        >
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
              <h2 className="mb-2 text-lg font-semibold">Room Images</h2>
              <ImageSlider slidesToShow={2} images={booking.room.images} />
            </div>

            {/* Booking Details */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="p-4">
                <CardContent>
                  <h2 className="text-lg font-semibold">Booking Info</h2>
                  <p>
                    Check-in:{" "}
                    <span className="font-medium">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Check-out:{" "}
                    <span className="font-medium">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Status:{" "}
                    <Badge className="bg-yellow-100 text-yellow-600">
                      {booking.status}
                    </Badge>
                  </p>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardContent>
                  <h2 className="text-lg font-semibold">Pricing</h2>
                  <p>
                    Price per Night:{" "}
                    <span className="font-medium">
                      ${booking.pricePerNight}
                    </span>
                  </p>
                  <p>
                    Number of Nights:{" "}
                    <span className="font-medium">{booking.numOfNights}</span>
                  </p>
                  <p className="text-xl font-semibold">
                    Total: ${booking.totalPrice}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="text-white rounded-lg bg-green-500 px-6 py-2 hover:bg-green-600">
                Confirm Booking
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
