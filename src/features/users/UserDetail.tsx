import DeleteFeature, { FeatureDeleteActionType } from "@/components/DeleteDialog";
import LoadingPage from "@/pages/utils/LoadingPage";
import NotFoundPage from "@/pages/utils/NotFoundPage";
import { useDeleteUserMutation, useGetUserByIdQuery } from "@/redux/api/userApi";
import { useParams } from "react-router-dom";
import UserBookings from "./UserBookings";

const UserDetail = () => {
    const { userId } = useParams<{ userId: string }>();
    const {
        data: { data: user } = {},
        isLoading,
        error,
    } = useGetUserByIdQuery(userId as string);
    return (
      <div>
          {isLoading ? (
              <LoadingPage />
          ) : error ? (
              <NotFoundPage>
                  <pre>{JSON.stringify(error, null, 2)}</pre>
              </NotFoundPage>
          ) : !user ? (
              <NotFoundPage>
                  <p>User not found</p>
              </NotFoundPage>
          ) : (
                          <div className="relative w-full overflow-hidden rounded-lg bg-white px-10 shadow-lg">
                                <div className="flex  justify-stretch border-b border-gray-200 p-6">
                                    <div className="  mb-6 mr-2 flex w-[300px] items-center gap-4">
                                      <img
                                          src={user.profilePicture}
                                          alt="Profile Picture"
                                          className="h-20 w-20 rounded-full border-2 border-gray-200"
                                      />
                                      <div className="">
                                          <h2 className="text-xl font-bold text-gray-800">
                                              {user.firstName} {user.lastName}
                                          </h2>
                                          <p className="text-lg text-gray-600">@{user.username}</p>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            {user._id &&
                                                <DeleteFeature
                                                    redirectUrl="/dashboard/users"
                                                    feature="User"
                                                    featureId={user._id}
                                                    useDelete={useDeleteUserMutation as FeatureDeleteActionType}
                                                />}
                                        </div>
                                  </div>

                                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                      <div>
                                          <h3 className="text-lg font-semibold text-gray-800">
                                              Personal Information:
                                          </h3>
                                            {user.dateOfBirth && <p className="mt-2 text-gray-600">
                                              <span className="font-semibold">Date of Birth:</span>{" "}
                                              {new Date(user.dateOfBirth).toLocaleDateString()}
                                            </p>}
                                            {user.gender && <p className="text-gray-600">
                                              <span className="font-semibold">Gender:</span> {user.gender}
                                            </p>
                                            }
                                            {user.email && <p className="text-gray-600">
                                              <span className="font-semibold">Email:</span> {user.email}
                                            </p>}
                                            {user.phoneNumber && < p className="text-gray-600">
                                              <span className="font-semibold">Phone:</span>{" "}
                                              {user.phoneNumber}
                                            </p>}
                                      </div>

                                        {user.address && <div>
                                          <h3 className="text-lg font-semibold text-gray-800">
                                              Address:
                                          </h3>
                                          <p className="mt-2 text-gray-600">
                                              {user.address.street}, {user.address.woreda},{" "}
                                              {user.address.subcity}, {user.address.city}
                                          </p>
                                          <h3 className="mt-2 text-lg font-semibold text-gray-800">
                                              Role:
                                          </h3>
                                          <p className="capitalize text-gray-600">{user.role}</p>
                                        </div>}
                                    </div>
                                </div>
                            </div>

            )}
            <UserBookings />
      </div>
  );
};

export default UserDetail;
