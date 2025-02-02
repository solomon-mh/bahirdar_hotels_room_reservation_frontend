import { useNavigate, useParams } from "react-router-dom";
import DeleteFeature from "../../../components/DeleteDialog"
import { useDeleteHotelMutation, useGetHotelByIdQuery } from "../../../redux/api/hotelApi";
import LoadingPage from "../../../pages/utils/LoadingPage";
import { Edit } from "lucide-react";
import { useAuthContext } from "../../../context/AuthContext";

export const HotelDetail = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { hotelId } = useParams<{ hotelId: string }>();
    const { data: { data: { hotel } = {} } = {}, isLoading, error } = useGetHotelByIdQuery(hotelId as string);


    return (
        <div className="flex">
            {isLoading && <LoadingPage />}
            {
                error
                &&
                <p>
                    <pre>
                        {
                            JSON.stringify(error, null, 2)
                        }
                    </pre>
                </p>
            }
            {hotel && (
                <div className="bg-white shadow-lg rounded-lg p-4  w-full  ">
                    <div className="relative">

                        {
                            user?.role === "admin" && (
                                <div className="flex absolute top-4 right-4">
                                    <DeleteFeature
                                        useDelete={useDeleteHotelMutation as () => [unknown, { isLoading: boolean }]}
                                        feature="Hotel"
                                        featureId={hotelId as string} />
                                    <button className=" bg-white p-2 rounded-lg" onClick={() => navigate(`/dashboard/hotels/${hotelId}/update`)}>
                                        <Edit size={24} />
                                    </button>
                                </div>
                            )
                        }
                        <img
                            src={hotel.imageCover}
                            alt={hotel.name}
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded">
                            {hotel.hotelStar} Star
                        </div>
                    </div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
                        <p className="text-gray-600 mb-4">{hotel.summary}</p>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Address:</h3>
                            <p className="text-gray-600">
                                {hotel.address.street}, {hotel.address.woreda}, {hotel.address.subcity}, {hotel.address.city}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Description:</h3>
                            <p className="text-gray-600">{hotel.description}</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Facilities:</h3>
                            <ul className="list-disc grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-inside text-gray-600">
                                {hotel.facilities.map((facility, index) => (
                                    <li key={index}>{facility}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <div className="text-gray-800">
                                <span className="font-semibold">Rating:</span> {hotel.avgRating} / 5
                            </div>
                            <button className="bg-accent-500/90 text-slate-100 px-4 py-2 rounded hover:bg-accent-500 transition">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>

    )
}