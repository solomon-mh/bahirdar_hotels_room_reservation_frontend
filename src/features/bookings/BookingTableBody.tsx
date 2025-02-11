
// import { Booking } from "../../types/bookingTypes";
// import formatDate from "../../utils/formatDate";

// function BookingTableBody({ booking }: { booking: Booking }) {
//   return (
//     <div className="mb-1 grid grid-cols-10 items-center gap-3 border-b border-slate-200 p-3 text-sm shadow">
//       {/* HOTEL NAME */}
//       <div className="col-span-2 col-start-1 flex items-center gap-2">
//         <img
//           className="h-12 w-12 object-cover"
//           src={booking.hotel.imageCover}
//           alt="image"
//         />
//         <span className="w-[65%] whitespace-pre-line text-sm font-bold">
//           {booking.hotel.name}
//         </span>
//       </div>

//       {/* ROOM */}
//       <div className="col-span-1 col-start-3 flex items-center gap-2">
//         <img
//           className="h-12 w-12 object-cover"
//           src={booking.room.images[0]}
//           alt="image"
//         />
//         <div className="">
//           <p className="">{`# ${booking.room.roomNumber}`}</p>
//           <p className="text-[10px] font-thin tracking-tight">
//             {booking.room.roomType}
//           </p>
//         </div>
//       </div>

//       {/* USER */}
//       <div className="col-span-2 col-start-4 flex items-center gap-2">
//         <img
//           className="h-12 w-12 object-cover"
//           src={booking.user.photo}
//           alt="image"
//         />
//         <div className="">
//           <p className="">{`${booking.user.firstName}`}</p>
//           <p className="tracking-tight text-xs">
//             {booking.user.phoneNumber}
//           </p>
//         </div>
//       </div>

//       {/* PHONE NUMBER */}
//       {/* <div className="col-span-1 col-start-5">{booking.user.phoneNumber}</div> */}

//       {/* CHECKIN DATE */}
//       <div className="col-span-1 col-start-6">
//         {formatDate(booking.checkInDate)}
//       </div>
//       <div className="col-span-1 col-start-7 flex gap-2">
//         <p className="">{`${booking.numOfNights}`}</p>
//         <span className="">{`${booking.numOfNights > 1 ? "Nights" : "Night"}`}</span>
//       </div>
//       <div className="col-span-1 col-start-8 flex flex-col">
//         <p className="">{`${booking.pricePerNight}`}</p>
//         <span className="">ETB / Night</span>
//       </div>

//       {/* TOTAL PRICE */}
//       <div className="col-span-1 col-start-9">{`${booking.totalPrice} ETB`}</div>

//       {/* PAYMENT STATUS */}
//       <div
//         className="col-span-1 col-start-10 flex justify-self-center rounded px-2 py-[2px] text-white"
//         style={{
//           backgroundColor:
//             booking.status === "confirmed"
//               ? "green"
//               : booking.status === "pending"
//                 ? "orange"
//                 : booking.status === "cancelled"
//                   ? "red"
//                   : "",
//         }}
//       >
//         {booking.status}
//       </div>
//     </div>
//   );
// }

// export default BookingTableBody;
