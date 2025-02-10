import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { TableHead, TableHeader, Table, TableBody, TableRow, TableCell } from "../../components/ui/table";
import { Eye } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";
import { useGetHotelRoomsQuery } from "../../redux/api/hotelApi";


function HotelRoomsTable() {

  const { user } = useAuthContext()
  const { hotelId } = useParams() as { hotelId: string }
  const navigate = useNavigate()
  const { data: { data: { rooms } = {}
  } = {}, isLoading, error } = useGetHotelRoomsQuery(hotelId as string)

  return (
    <div className=" h-[80vh]  w-full shadow-md flex flex-col items-center justify-start ">
      <div className="flex w-full items-center justify-between px-6 py-2 ">
        <h1 className="p-4 uppercase">
          <Link to="/dashboard/bookings">All Rooms</Link>
        </h1>
        <Link
          to={`/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/add-room`}
          className="mr-2 cursor-pointer rounded-md bg-accent-500  px-4 py-[6px] text-lg text-white transition-all duration-200 hover:scale-105"
        >
          Add Room
        </Link>
      </div>

      <div className="flex w-full p-4 shadow-md ">
        {
          isLoading ?
            <LoadingPage />
            :
            error ?
              <NotFoundPage>
                <p>
                  {
                    JSON.stringify(error, null, 2)
                  }
                </p>
              </NotFoundPage>
              :
              !rooms?.length
                ?
                <NotFoundPage>
                  <p>Rooms not found to this hotel</p>
                </NotFoundPage>
                :
                <Table >
                  <TableHeader className=" shadow-md py-4 ">
                    <TableHead>
                      Room
                    </TableHead>
                    <TableHead>
                      Number
                    </TableHead>
                    <TableHead>
                      Type
                    </TableHead>
                    <TableHead>
                      Price / Night
                    </TableHead>
                    <TableHead>
                      Capacity
                    </TableHead>
                    <TableHead>
                      Amenities
                    </TableHead>
                    <TableHead>
                      Is Available
                    </TableHead>
                    <TableHead>
                      Action
                    </TableHead>
                  </TableHeader>
                  <TableBody>
                    {
                      rooms.map(room => (
                        <TableRow className="hover:bg-slate-200/60">
                          <TableHead>
                            {
                              room.images[0] ?
                                <img
                                  src={room.images[0]}
                                  alt="Room image"
                                  className="h-[50px] w-[100px] object-fit"
                                />
                                :
                                <div className=" grid place-items-center  h-[50px] w-[100px]">
                                  <span className="text-slate-500">No image</span>
                                </div>
                            }
                          </TableHead>
                          <TableCell>
                            {room.roomNumber}
                          </TableCell>
                          <TableCell>
                            {room.roomType}
                          </TableCell>
                          <TableCell>
                            {room.pricePerNight}
                          </TableCell>
                          <TableCell>
                            {room.capacity}
                          </TableCell>
                          <TableCell>
                            {room.roomFacilities.length > 3 ? room.roomFacilities.slice(0, 3).join(", ") + "..." : room.roomFacilities.join(", ")}

                          </TableCell>
                          <TableCell>
                            {room.isAvailable ? "Available" : "Reserved"}
                          </TableCell>
                          <TableCell>
                            <button
                              className="p-2 text-accent-500 rounded-md"
                              onClick={() => {
                                if (room._id)
                                  navigate(`/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/rooms/${room._id}`)
                              }}
                            >
                              <Eye />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>

        }
      </div>

    </div>
  );
}

export default HotelRoomsTable;
