import { Card } from "@/components/ui/card";
import { IReviewResponse } from "@/types/reviewType";
import { FaStar } from "react-icons/fa6";

const HotelReview = ({ review }: { review: IReviewResponse }) => {
    return (
        <Card className="p-4 rounded-2xl shadow-lg bg-white w-full max-w-lg">
            <div className="flex items-center space-x-4">
                <img
                    src={review.user.profilePicture}
                    alt={review.user.username}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
                <div>
                    <h3 className="font-semibold text-gray-900">{review.user.firstName} {review.user.lastName}</h3>
                    <p className="text-sm text-gray-500">{review.user.address.city}, {review.user.address.country}</p>
                </div>
            </div>
            <div className="mt-2 flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                    <FaStar key={index} size={16} className={index < review.rating ? "text-yellow-500" : "text-gray-300"} />
                ))}
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
            <p className="mt-2 text-xs text-gray-600">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</p>
        </Card>
    );
};

export default HotelReview;
