import { Card } from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useAuthContext();
  if (user === null) {
    <div className="mx-auto max-w-4xl p-6">
      <Card className="rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-semibold">User not found</h1>
      </Card>
    </div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-start bg-gray-100 p-4">
      <div className="w-full rounded-2xl bg-white p-10 shadow-lg">
        <div className="items-strech flex w-full flex-col gap-10 p-4 lg:flex-row">
          <div className="flex flex-col items-center">
            <img
              src={user?.profilePicture}
              alt="Profile"
              className="h-36 w-36 rounded-full border-4 border-accent-500 object-cover"
            />
            <div className="flex flex-col items-center">
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500">@{user?.username}</p>
            </div>
          </div>
          <div className="mt-6 p-4">
            <h3 className="text-lg font-semibold text-gray-700">User Info</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>
                <strong>Email:</strong> {user?.email}
              </li>
              <li>
                <strong>Phone:</strong> {user?.phoneNumber}
              </li>
              <li>
                <strong>Gender:</strong> {user?.gender}
              </li>
              <li>
                <strong>Date of Birth:</strong>{" "}
                {user?.dateOfBirth
                  ? new Date(user.dateOfBirth).toDateString()
                  : " "}
              </li>

              <li>
                <strong>Role:</strong> {user?.role}
              </li>
              <li className="flex items-center gap-2">
                <strong>Verified:</strong>
                {user?.isVerified ? (
                  <span className="flex items-center gap-1 text-green-600">
                    Verified <FaCheckCircle />
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600">
                    Not Verified <FaTimesCircle />
                  </span>
                )}
              </li>
            </ul>
          </div>
          {user?.address && (
            <div className="mt-6 p-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Address information
              </h3>
              <ul className="mt-2 text-gray-600">
                <li>
                  <strong>Country:</strong> {user?.address.country}
                </li>
                <li>
                  <strong>City:</strong> {user?.address.city}
                </li>
                <li>
                  <strong>Subcity:</strong> {user?.address.subcity}
                </li>
                <li>
                  <strong>Wereda:</strong> {user?.address.woreda}
                </li>
                <li>
                  <strong>Street:</strong> {user?.address.street}
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col items-center justify-start gap-4 md:flex-row">
          {user?.idPhoto_front && (
            <div className="flex flex-col-reverse items-center gap-2 p-4">
              <h2 className="italic text-slate-700">Front Side of the ID</h2>
              <img
                src={user?.idPhoto_front}
                alt="ID Front"
                className="h-48 w-48 rounded-lg border object-cover"
              />
            </div>
          )}
          {user?.idPhoto_back && (
            <div className="flex flex-col-reverse items-center gap-2 p-4">
              <h2 className="italic text-slate-700">Back Side of the ID</h2>
              <img
                src={user?.idPhoto_back}
                alt="ID Back"
                className="h-48 w-48 rounded-lg border object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
