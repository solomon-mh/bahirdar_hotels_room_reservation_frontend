import { useNavigate, useParams } from "react-router-dom";
import DeleteFeature from "../../../components/DeleteDialog";
import {
    useDeleteHotelMutation,
    useGetHotelByIdQuery,
} from "../../../redux/api/hotelApi";
import LoadingPage from "../../../pages/utils/LoadingPage";
import { useAuthContext } from "../../../context/AuthContext";
import { MdEdit } from "react-icons/md";

export const HotelDetail = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { hotelId } = useParams<{ hotelId: string }>();
    const {
        data: { data: { hotel } = {} } = {},
        isLoading,
        error,
    } = useGetHotelByIdQuery(hotelId as string);

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
                        {user?.role === "admin" && (
                            <div className="absolute right-4 top-4 flex items-center gap-2 bg-slate-100 p-2">
                                <button
                                    className="bg-white rounded-lg p-2"
                                    onClick={() =>
                                        navigate(`/dashboard/hotels/${hotelId}/update`)
                                    }
                                >
                                    <MdEdit size={24} />
                                </button>
                                <DeleteFeature
                                    useDelete={
                                        useDeleteHotelMutation as () => [
                                            unknown,
                                            { isLoading: boolean },
                                        ]
                                    }
                                    feature="Hotel"
                                    featureId={hotelId as string}
                                />
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

                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-gray-800">
                                <span className="font-semibold">Rating:</span> {hotel.avgRating}{" "}
                                / 5
                            </div>
                            <button className="rounded bg-accent-500/90 px-4 py-2 text-slate-100 transition hover:bg-accent-500">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
