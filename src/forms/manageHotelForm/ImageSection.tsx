import { useFormContext } from "react-hook-form";

function ImageSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<{
    imageCover: string;
    imageCoverFile: string;
    hotelImagesFiles: string[];
    hotelImages: string[];
    isInUpdateMode: boolean;
  }>();

  const existingImageCoverUrl = watch("imageCover");
  const existingHotelImagesUrl = watch("hotelImages");
  const isInUpdateMode = watch("isInUpdateMode");

  const handleDeleteHotelImages = (
    e: React.MouseEvent<HTMLButtonElement>,
    image: string
  ) => {
    e.preventDefault();

    setValue(
      "hotelImages",
      existingHotelImagesUrl.filter((img) => img !== image)
    );
  };

  return (
    <div className="mb-10">
      <div className="mb-10 flex-col md:flex-row flex gap-4">
        {existingImageCoverUrl?.length ? (
          <div className="w-full md:w-[400px]">
            <h1>Hotel Cover Image</h1>
            <img
              src={existingImageCoverUrl}
              alt="Hotel Cover"
              className="min-h-full object-cover"
            />
          </div>
        ) : null}
        {existingHotelImagesUrl?.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-4">
            <h1>Hotel Images</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {existingHotelImagesUrl.map((image, i) => (
                <div key={i} className="group relative bg-gray-200">
                  <img
                    src={image}
                    alt={`Hotel Image ${i + 1}`}
                    className="h-[150px] w-full bg-cover bg-center"
                  />
                  <div className="absolute inset-0 bottom-12 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition duration-300 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleDeleteHotelImages(e, image)}
                      type="button"
                      className="rounded-md border-2 text-slate-100 border-red-500 px-2 py-1"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-3">
        <div className="flex-1 bg-slate-200 p-3">
          <label className="flex flex-col border hover:cursor-pointer">
            {isInUpdateMode ? (
              <h3>Change Hotel Cover Image</h3>
            ) : (
                <h3>Upload Hotel Cover Image</h3>
            )}
            <input
              type="file"
              accept="image/*"
              className="hover:cursor-pointer"
              {...register("imageCoverFile", {
                required: isInUpdateMode
                  ? false
                  : "A hotel must have a cover image",
              })}
            />
            {errors.imageCoverFile && (
              <p className="text-sm font-normal text-red-500">
                {errors.imageCoverFile.message}
              </p>
            )}
          </label>
        </div>

        <div className="flex-1 bg-slate-200 p-3">
          <label className="flex flex-col border hover:cursor-pointer">
            Upload Hotel Images - At least 2 images
            {existingHotelImagesUrl && (
              <span>
                (You can add {10 - existingHotelImagesUrl?.length} additional
                images)
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={10 - existingHotelImagesUrl?.length <= 0}
              className="hover:cursor-pointer"
              multiple
              {...register("hotelImagesFiles", {
                validate: (hotelImagesFiles) => {
                  const numOfTotalImages =
                    (hotelImagesFiles?.length || 0) +
                    (existingHotelImagesUrl?.length || 0);

                  if (numOfTotalImages < 1)
                  {
                    return "A hotel must have at least 1 additional image";
                  }

                  if (numOfTotalImages > 10)
                  {
                    return "A hotel is allowed to have at most 10 additional images";
                  }

                  return true;
                },
              })}
            />
            {errors.hotelImagesFiles && (
              <p className="text-sm font-normal text-red-500">
                {errors.hotelImagesFiles.message}
              </p>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

export default ImageSection;
