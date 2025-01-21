import { GoDash } from "react-icons/go";
import { Link } from "react-router-dom";
import { IHotel } from "../../types/hotelTypes";
import { ITimeStamp } from "../../types/general";

function HotelTable({ hotel }: { hotel: IHotel & ITimeStamp }) {

  return (
    <>
      <div className="m-2 grid scale-y-90 grid-cols-10 items-center gap-3 overflow-hidden border-b border-r border-slate-200 text-sm shadow">
        <div className="col-span-1 col-start-1">
          <img
            className="h-16 w-full object-cover"
            src={hotel.imageCover}
            alt=""
          />
        </div>
        <div className="col-span-1 col-start-2">{hotel.name}</div>
        <div className="col-span-1 col-start-3">{`${hotel.hotelStar} ⭐ Hotel`}</div>
        <div className="col-span-1 col-start-4">{hotel.address.city}</div>
        <div className="col-span-1 col-start-5">
          {hotel.numOfRooms > 0 ? `${hotel.numOfRooms} Rooms` : <GoDash />}
        </div>
        <div className="col-span-1 col-start-6">
          {hotel.minPricePerNight || <GoDash />}
        </div>
        <div className="col-span-1 col-start-7">
          {/* NOTE: NUM OF RATINGS IS ALSO EQUAL TO NUM OF REVIEWS IN OUR CASE */}
          {hotel.numOfRatings > 0
            ? `${hotel.numOfRatings} Reviews`
            : "0 Reviews"}
        </div>
        <div className="col-span-1 col-start-8">{hotel.avgRating} ⭐</div>
        <div className="col-span-1 col-start-9 flex">
          {hotel.facilities && hotel.facilities.slice(0, 3).join(", ")}
        </div>
        <div className="col-span-1 col-start-10 flex flex-row justify-center items-center gap-1">
          {/* <div className="flex  gap-2">
            <Link to={`/dashboard/update-hotel/${hotel._id}`}>
              <MdEdit size={24} className="fill-accent-700" />
            </Link>

          </div> */}
          <Link
            target="blank"
            to={`/hotels/${hotel._id}`}
            className="rounded text-slate-100 bg-accent-500 p-2 font-semibold text-white"
          >
            Details
          </Link>
        </div>
      </div>

    </>
  );
}

export default HotelTable;
