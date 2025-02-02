import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./DetailSection";
import ImageSection from "./ImageSection";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { IHotel } from "../../types/hotelTypes";
import { SelectManager } from "./SelectManagerDrawer";
import { IAddress } from "../../types/addressTypes";
import CreateUserDialog from "./CreateUserDialog";
import { IUser } from "../../types/userTypes";
import toast from "react-hot-toast";
import { useGetUserByIdQuery } from "../../redux/api/userApi";
interface Props {
  hotel?: IHotel;
  isAdding: boolean;
  isLoading?: boolean;
  isUpdating?: boolean;
  onSubmit: (data: FormData) => void;
  isInUpdateMode?: boolean;
}
function ManageHotelForm({
  isAdding,
  isLoading,
  isUpdating = false,
  onSubmit,
  hotel,
  isInUpdateMode = false,
}: Props) {


  const { data: { data: user } = {}, error } = useGetUserByIdQuery(hotel?.manager as string || '', { skip: !hotel?.manager });
  const [seledtedManager, setSelectedManager] = useState<IUser | null>(null);
  const formMethods = useForm<IHotel & { address: IAddress, facilities: string[], imageCoverFile: string, hotelImagesFiles: string[], manager: string, isInUpdateMode: boolean }>();
  const { handleSubmit, reset, setValue } = formMethods; 

  useEffect(() => {
    if (error)
    {
      toast.error("An error occurred while fetching the manager");
    }
    if (user)
    {
      setSelectedManager(user);
    }
  }, [error, user]);

  // IF IN UPDATE MODE RESET THE HOTEL DATA TO THE FORM
  useEffect(() => {
    // FIXME: SOMETIMES THE FUNCTION NOT TRIGGERED
    if (hotel)
    {
      reset({
        ...hotel,
        manager: typeof hotel.manager === 'string' ? hotel.manager : hotel.manager?._id || '',
        address: hotel.address || { city: '', subcity: '', street: '', woreda: '' },
        facilities: hotel.facilities || [],
        imageCoverFile: '',
        hotelImagesFiles: [],
        isInUpdateMode
      });
      setValue("isInUpdateMode", isInUpdateMode);
    }
  }, [reset, hotel, isInUpdateMode, setValue]);

  const onSubmitHandler = handleSubmit((data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("hotelStar", data.hotelStar?.toString() || '');
    formData.append("summary", data.summary);
    formData.append("address[city]", data.address.city);
    formData.append("address[subcity]", data.address.subcity);
    formData.append("address[street]", data.address.street);
    formData.append("address[woreda]", data.address.woreda);
    if (seledtedManager?._id)
      formData.append("manager", seledtedManager._id);
    else
    {
      toast.error("Please select manger manager not selected yet")
      return;
    }

    data.facilities.forEach((facility, i) => {
      formData.append(`facilities[${i}]`, facility);
    });


    if (hotel?.imageCover)
    {
      formData.append("imageCover", hotel.imageCover);
    }

    if (hotel?.hotelImages)
    {
      data.hotelImages.forEach((image, i) => {
        formData.append(`hotelImages[${i}]`, image);
      });
    }

    if (data?.imageCoverFile)
      Array.from(data.imageCoverFile).forEach((image) => {
        formData.append(`imageCoverFile`, image);
      });

    if (data?.hotelImagesFiles)
      Array.from(data.hotelImagesFiles).forEach((image) => {
        formData.append(`hotelImagesFiles`, image);
      });

    onSubmit(formData);
  });

  return (
    <div className="flex flex-col p-4">
      <FormProvider {...formMethods}>
        <div className="flex items-center justify-center p-3">
          <h1 className="min-w-[30rem] cursor-pointer rounded-full bg-accent-400 text-slate-100 px-6 py-2 text-center text-2xl font-bold uppercase text-white shadow-xl">
            {isInUpdateMode ? "update hotel" : "Add Hotel"}
          </h1>
        </div>
        {isLoading ? (
          <Spinner />
        ) : isInUpdateMode && !hotel ? (
          <div className="flex items-center justify-center p-6">
            <p className="text-2xl uppercase">there is no hotel to update</p>
          </div>
        ) : (
          <form
            onSubmit={onSubmitHandler}
            className="m-auto flex flex-col gap-8 rounded bg-slate-100 p-10 shadow-lg"
          >
            <div>
              <DetailSection />
                  <ImageSection />

              {!isInUpdateMode && (
                <>
                  <div className="my-4">
                    <p className="w-[30rem] leading-6 tracking-wide text-slate-500">
                      Does the manager have no account. You can create a new
                      account for the the manager and register the hotel after
                      then.
                    </p>


                  </div>
                </>
                  )}
                  <div className="flex gap-4 items-center">
                    <SelectManager
                      selectedManager={seledtedManager}
                      setSelectedManager={setSelectedManager}
                    />
                    <span>
                      {seledtedManager ? seledtedManager.firstName + " " + seledtedManager.lastName : "No manager selected yet"}
                    </span>
                    <CreateUserDialog />
                  </div>
            </div>
            <button
              type="submit"
                  className="w-full rounded bg-accent-500/90 hover:bg-accent-500 text-slate-100 px-3 py-2 text-white transition-all duration-300 disabled:cursor-not-allowed disabled:bg-accent-500"
              disabled={
                isAdding ||
                isUpdating // we want this condition only in adding mode | isInUpdateMode is false by default
              }
            >
              {isAdding || isUpdating ? <SpinnerMini /> : "Save Hotel"}
            </button>
          </form>
        )}
      </FormProvider>


    </div>
  );
}

export default ManageHotelForm;
