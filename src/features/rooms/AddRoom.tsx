import { toast } from "react-toastify";
import ManageRoomForm from "../../forms/manageRoomForm/ManageRoomForm";
import { useCreateRoomMutation } from "../../redux/api/rooms";

/*
  {
    roomNumber: '101',
    roomType: 'single',
    pricePerNight: '350',
    capacity: '3',
    description: 
      'The room is cozy, with a comfortable bed and a view of the city skyline.',
    amenities: [ 'Wi-Fi', 'Room Service', 'Desk and Chair' ],
    RoomImageFiles: FileList {
      0: File {
        name: 'bed-2.jpg',
        lastModified: 1721063667219,
        webkitRelativePath: '',
        size: 75426,
        type: 'image/jpeg'
      },
      1: File {
        name: 'bed-1.jpg',
        lastModified: 1721063566820,
        webkitRelativePath: '',
        size: 74462,
        type: 'image/jpeg'
      },
      length: 2
    }
  }
*/

function AddRoom() {

  const [createRoom, { isLoading }] = useCreateRoomMutation()
  const onSubmitHandler = (room: FormData) => {
    try
    {

      createRoom(room).unwrap().then(() => {
        toast.success("Room added succefully")
      }).catch((err) => {
        if ('data' in err)
        {
          const { message } = err.data as { message: string }
          toast.error(message || "Failed to add room")
        }
        else
        {
          toast.error(JSON.stringify(err, null, 2))
        }
      })
    }
    catch (err)
    {
      console.error(err)
      toast.error("Cannot add room please try again")
    }
  };

  return <ManageRoomForm onSubmit={onSubmitHandler} isAdding={isLoading} />;
}

export default AddRoom;
