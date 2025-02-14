/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import DeleteFeature from "../../../components/DeleteDialog";
import {
    useDeleteHotelMutation,
    useGetHotelByIdQuery,
} from "../../../redux/api/hotelApi";
import LoadingPage from "../../../pages/utils/LoadingPage";
import { useAuthContext } from "../../../context/AuthContext";
import { MdEdit } from "react-icons/md";
import { Role } from "../../../enums/roleEnum";
import MapComponent from "../../bookings/Map";
import { useEffect, useState } from "react";
import { useGetHotelReviewsQuery } from "@/redux/api/reviewApi";
import HotelReview from "./HotelReview";
import toast from "react-hot-toast";
import { useCreateFavoriteMutation, useGetMyFavoritesQuery } from "@/redux/api/favoriteApi";

export const HotelDetail = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [_, setHotelImages] = useState<string[]>([]);
    const { hotelId } = useParams<{ hotelId: string }>();
    const { data: { data: hotels } = {} } = useGetMyFavoritesQuery()
    const { data: { data: { reviews } = {} } = {} } = useGetHotelReviewsQuery(hotelId as string, { skip: !hotelId });
    const [addFavorite, { isLoading: updating }] = useCreateFavoriteMutation()

    const handleFavorite = () => {
        addFavorite(hotelId as string).unwrap().then(() => {
            toast.success("Hotel added to favorite")
        }).catch((error) => {
            if ('data' in error)
            {
                const { message } = error.data as { message: string }
                toast.error(message || "Failed to add hotel to favorite")
            }
            else
            {
                toast.error("Failed to add hotel to favorite    ")
            }
        })
    }
    const {
        data: { data: { hotel } = {} } = {},
        isLoading,
        error,
    } = useGetHotelByIdQuery(hotelId as string);

    useEffect(() => {
        if (hotel?.hotelImages.length)
        {
            setHotelImages(hotel.hotelImages.map((image) => image));
        }
    }, [hotel?.hotelImages])
    console.log(hotels)

    return (
        <div className="flex">
            {isLoading && <LoadingPage />}
            {error && (
                <p>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </p>
            )}
            {hotel && (
                <div className="bg-white w-full rounded-lg p-4 shadow-lg">
                    <div className="relative">
                        {

                            hotels?.length && !hotels.every(hotel => hotel.hotel._id === hotelId && hotel.user === user?._id) && user?.role === Role.USER && (
                                <button
                                    disabled={updating}
                                    onClick={handleFavorite}
                                    className="px-3 py-2 border absolute top-2 right-2 text-accent-500 border-accent-500 rounded-md hover:bg-accent-500 hover:text-slate-100"
                                >
                                    Add to Favorite
                                </button>
                            )
                        }
                        {user?.role && [Role.ADMIN, Role.MANAGER].includes(user?.role) && (
                            <div className="absolute right-4 top-4 z-20 flex items-center gap-2 bg-slate-100 p-2">
                                {[Role.ADMIN, Role.MANAGER].includes(user.role) && <button
                                    className="bg-white rounded-lg p-2"
                                    onClick={() =>
                                        navigate(`/dashboard${user.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/edit`)
                                    }
                                >
                                    <MdEdit size={24} />
                                </button>}
                                {
                                    user.role === Role.ADMIN &&
                                    <DeleteFeature
                                    useDelete={
                                        useDeleteHotelMutation as () => [
                                            unknown,
                                            { isLoading: boolean },
                                        ]
                                    }
                                    feature="Hotel"
                                    featureId={hotelId as string}
                                    />}
                            </div>
                        )}
                        <img
                            src={hotel.imageCover}
                            alt={hotel.name}
                            className="h-64 w-full object-cover"
                        />
                        <div className="text-white absolute left-4 top-4 rounded bg-yellow-500 px-3 py-1">
                            {hotel.hotelStar} Star
                        </div>
                    </div>
                    <div className="p-6">
                        <h2 className="mb-2 text-2xl font-bold text-gray-800">
                            {hotel.name}
                        </h2>
                        <p className="mb-4 text-gray-600">{hotel.summary}</p>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Address:</h3>
                            <p className="text-gray-600">
                                {hotel.address.street}, {hotel.address.woreda},{" "}
                                {hotel.address.subcity}, {hotel.address.city}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Description:
                            </h3>
                            <p className="text-gray-600">{hotel.description}</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Facilities:
                            </h3>
                            <ul className="grid list-inside list-disc grid-cols-1 text-gray-600 md:grid-cols-2 lg:grid-cols-3">
                                {hotel.facilities.map((facility, index) => (
                                    <li key={index}>{facility}</li>
                                ))}
                            </ul>
                        </div>



                        {
                            hotel.location && !!hotel.location.coordinates.length && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        See Location on map
                                    </h3>
                                    <MapComponent
                                        markers={[
                                            {
                                                id: 1,
                                                name: hotel.name,
                                                location: [...hotel.location.coordinates],
                                            },
                                        ]}
                                        center={[...hotel.location.coordinates]}
                                        zoom={15}
                                    />
                                </div>
                            )
                        }

                        <div className="grid grid-cols-2">
                            {
                                reviews?.map((review) => (
                                    <HotelReview key={review._id} review={review} />
                                )
                                )
                            }
                        </div>


                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-gray-800">
                                <span className="font-semibold">Rating:</span> {hotel.avgRating}{" "}
                                / 5
                            </div>
                            {
                                user?.role && user?.role === Role.USER && (
                                    <button
                                        onClick={() => navigate(`/hotels/${hotelId}/rooms`)}
                                        className="rounded bg-accent-500/90 px-4 py-2 text-slate-100 transition hover:bg-accent-500"
                                    >
                                        Book Now
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
