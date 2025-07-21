import { FaStar, FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IHotel } from "../types/hotelTypes";
import { ITimeStamp } from "../types/general";

function HotelsListItem({ hotel }: { hotel: IHotel & ITimeStamp }) {
  return (
    <div className="mx-auto mb-4 w-[95%] overflow-hidden p-3 transition-all duration-300 hover:translate-x-1 hover:scale-[1.02]">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* HOTEL IMAGE */}
        <div className="h-[200px] w-full overflow-hidden rounded shadow-xl md:w-[250px]">
          <img
            src={hotel.imageCover}
            alt="hotel cover"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* HOTEL DETAILS */}
        <div className="flex flex-1 flex-col justify-around">
          {/* Name & Location */}
          <div className="flex flex-col gap-2">
            <Link
              to={`/hotels/${hotel._id}`}
              className="text-xl font-bold text-accent-500 md:text-2xl"
            >
              {hotel.name}
            </Link>
            <span className="text-sm text-slate-500">
              ({hotel.hotelStar} Star Hotel in {hotel.address.city})
            </span>
          </div>

          {/* Room Info & Facilities */}
          <div className="flex flex-col gap-2">
            <span className="text-sm">{hotel.numOfRooms} Standard Rooms</span>
            <span className="text-xs text-slate-500">
              {hotel.facilities.slice(0, 6).join(", ")}
              {hotel.facilities.length > 6 &&
                ` and ${hotel.facilities.length - 6} more...`}
            </span>
          </div>

          {/* Summary */}
          <p className="text-sm">{hotel.summary}</p>
        </div>

        {/* HOTEL RATINGS & PRICE */}
        <div className="flex flex-col items-end justify-evenly p-2 md:w-[25%] md:items-end">
          <div className="flex flex-col gap-1 md:items-end">
            {/* Star Ratings */}
            <div className="flex items-center gap-2">
              <span className="flex gap-1">
                {[1, 2, 3, 4, 5].map((val, i) =>
                  Math.floor(hotel.avgRating) >= val ? (
                    <FaStar
                      key={i}
                      color="#fcc419"
                      fill="#fcc419"
                      size={"20px"}
                    />
                  ) : (
                    <FaRegStar
                      key={i}
                      color="#fcc419"
                      fill="#fcc419"
                      size={"20px"}
                    />
                  ),
                )}
              </span>
              <span className="font-bold tracking-tighter text-yellow-400">
                {hotel.avgRating}
              </span>
            </div>

            {/* Reviews */}
            <h3 className="text-sm font-light tracking-tight text-slate-500">
              {hotel.numOfRatings ? (
                <span className="font-bold text-accent-500">
                  {hotel.numOfRatings} reviews
                </span>
              ) : (
                "No Reviews Yet"
              )}
            </h3>
          </div>

          {/* Price */}
          <div className="flex flex-col md:items-end">
            <p className="text-sm font-bold text-slate-500">
              Price / Night:{" "}
              <span className="text-lg font-bold tracking-tighter text-accent-500">
                {`${hotel.minPricePerNight} ETB`}
              </span>
            </p>
          </div>

          {/* See Details Button */}
          <Link
            to={`/hotels/${hotel._id}`}
            className="mt-2 w-full rounded bg-accent-500 p-2 text-center text-white md:w-auto"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelsListItem;
