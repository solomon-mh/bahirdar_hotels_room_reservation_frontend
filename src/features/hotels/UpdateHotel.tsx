import ManageHotelForm from "../../forms/manageHotelForm/ManageHotelForm";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelByIdQuery, useUpdateHotelMutation } from "../../redux/api/hotelApi";
import toast from "react-hot-toast";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";

// IF THE MANAGER UPDATES HIS HOTEL, IT IS IN THE MANAGERS DASHBOARD | SETTINGS PART SO THE URL IS `/dashboard/settings` : IN THIS CASE THERE IS NO PARAMS SO WE PASS THE CURRENT HOTELS ID THROUGH PROP BECAUSE WE USE UPDATE HOTEL COMPONENT IN THAT SETTINGS PART
function UpdateHotel() {
  const { hotelId } = useParams() as { hotelId: string };
  const navigate = useNavigate();


  const { data: { data: { hotel } = {} } = {}, isLoading, error } = useGetHotelByIdQuery(hotelId as string);

  const [updateHotel, { isLoading: isPending }] = useUpdateHotelMutation();

  const handleUpdateHotel = (formData: FormData) => {

    try
    {
      updateHotel({
        data: formData,
        id: hotelId || hotelId || '',
      }).unwrap().then(() => {
        toast.success("Hotel updated successfully");
        navigate('/dashboard/hotels');
      }).catch((err) => {
        if ('data' in err)
        {
          toast.error(err.data.message || "Cannot update the hotel");
        }
        else
        {
          toast.error(JSON.stringify(err, null, 2))
        }

      });

    }
    catch (error)
    {
      toast.error(JSON.stringify(error, null, 2));
    }
  }

  if (isLoading)
  {
    return (
      <LoadingPage />
    )
  }
  if (error)
  {
    return (
      <NotFoundPage>
        <pre>
          {
            JSON.stringify(error, null, 2)
          }
        </pre>
      </NotFoundPage>
    )
  }

  if (!hotel)
  {
    return <NotFoundPage>
      <p>
        There is not hotel to update
      </p>
    </NotFoundPage>
  }

  return (
    <ManageHotelForm
      hotel={hotel}
      onSubmit={handleUpdateHotel}
      isUpdating={isPending}
      isLoading={isLoading}
      isInUpdateMode={true}
      isAdding={false}
    />
  );
}

export default UpdateHotel;
