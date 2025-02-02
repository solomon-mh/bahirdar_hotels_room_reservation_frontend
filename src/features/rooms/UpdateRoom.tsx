import { useNavigate, useParams } from "react-router-dom";
import ManageRoomForm from "../../forms/manageRoomForm/ManageRoomForm";
import { useGetRoomByIdQuery, useUpdateRoomMutation } from "../../redux/api/rooms";
import toast from "react-hot-toast";

function UpdateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: { data: room } = {}, isLoading } = useGetRoomByIdQuery(id as string);


  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation()

  const handleUpdateRoom = (formData:FormData) => {
    updateRoom({ id: id!, data: formData }).unwrap().then(() => {
      toast.success("Room updated successfully")
      navigate("/dashboard/rooms/" + id)
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
