import { useNavigate, useParams } from "react-router-dom";
import ManageRoomForm from "../../forms/manageRoomForm/ManageRoomForm";
import { useGetRoomByIdQuery, useUpdateRoomMutation } from "../../redux/api/roomsApi";
import toast from "react-hot-toast";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { useAuthContext } from "../../context/AuthContext";
import { Role } from "../../enums/roleEnum";

function UpdateRoom() {

  const user = useAuthContext()
  const { roomId, hotelId } = useParams<{ roomId: string, hotelId: string }>();
  const navigate = useNavigate();
  const { data: { data: room } = {}, isLoading, error } = useGetRoomByIdQuery(roomId as string);


  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation()

  const handleUpdateRoom = (formData:FormData) => {
    updateRoom({ id: roomId!, data: formData }).unwrap().then(() => {
      toast.success("Room updated successfully")
      navigate(`/dashboard${user?.role === Role.ADMIN ? "/hotels" : ""}/${hotelId}/rooms/${roomId}`)
    }).catch((error) => {
      if ('data' in error)
      {
        toast.error(error.data.message || "Something went wrong please try again")
      } else
      {
        toast.error("An error occurred please try again")
      }
    })
  };


  if (isLoading)
  {
    return <LoadingPage />
  }

  if (error)
  {
    return <NotFoundPage>
      <pre>
        {
          JSON.stringify(error, null, 2)
        }
      </pre>
    </NotFoundPage>
  }
  if (!room)
  {
    return <NotFoundPage>
      <p>
        Room not found
      </p>
    </NotFoundPage>
  }
  return (
    <ManageRoomForm
      onSubmit={handleUpdateRoom}
      room={room}
      isLoading={isLoading}
      isUpdating={isUpdating}
      isInUpdateMode={true}
    />
  );
}

export default UpdateRoom;

/*
{
    status: 'success',
    message: 'get room route',
    data: {
      room: {
        _id: '66956876da838a16189480e3',
        roomNumber: '104',
        roomType: 'single',
        pricePerNight: 350,
        isAvailable: true,
        amenities: [ 'Wi-Fi', 'Room Service', 'Safe', 'Desk and Chair' ],
        capacity: 3,
        description: 
          'The room is cozy, with a comfortable bed and a view of the city skyline.',
        images: [
          
            'http://res.cloudinary.com/dvp1mjhd9/image/upload/v1721067638/yjd8cbthxaueq28cyzkq.jpg', 
            'http://res.cloudinary.com/dvp1mjhd9/image/upload/v1721067638/fvsbhimdfeyrclenheuz.jpg'
        ],
        hotel: '668ced40c8a56b00ec4b58da',
        createdAt: '2024-07-15T18:20:38.836Z',
        updatedAt: '2024-07-15T18:20:38.836Z',
        __v: 0,
        id: '66956876da838a16189480e3'
      }
    }
  }
*/
