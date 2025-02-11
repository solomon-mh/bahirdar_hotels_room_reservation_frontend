import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Spinner from "../../ui/Spinner";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import { IUser } from "@/types/userTypes";
function RecentUsers() {
  const { data: { data: users } = {}, isLoading, error } = useGetAllUsersQuery("")

  if (isLoading)
    return (
      <section className="bg-black/2 h-[50vh] w-[300px] overflow-y-auto rounded-sm border border-black/10 p-3">
        <Spinner className="text-black/30" />
      </section>
    );

  if (error)
    return (
      <section className="bg-black/2 h-[50vh] w-[300px] overflow-y-auto rounded-sm border border-black/10 p-3">
        <span className="text-red-500">An error occurred</span>
      </section>
    );

  if (!users || users.length === 0)
  {
    return (
      <section className="bg-black/2 h-[50vh] w-[300px] overflow-y-auto rounded-sm border border-black/10 p-3">
        <span className="text-black/50">No users found</span>
      </section>
    );
  }

  return (
    <section className="bg-black/2 w-[300px] overflow-y-auto rounded-sm shadow-lg">
      <div className="flex flex-col items-center gap-5">
        <h2 className="w-full bg-black/5 p-4 text-center">Recent Users</h2>
        <div className="flex w-full flex-col items-center gap-x-12 gap-y-5">
          {users?.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
        <Link
          to="/dashboard/users"
          className="inline-flex items-center justify-center rounded-lg bg-accent-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-accent-800 focus:ring-4 focus:ring-accent-300"
        >
          View All Users <FaArrowRightLong className="ml-2" />
        </Link>
      </div>
    </section>
  );
}

function User({ user }: { user: IUser }) {
  return (
    <>
      <div key={user._id} className="w-full">
        <div className="flex justify-center gap-2 transition duration-300 hover:bg-black/10">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.profilePicture}
            alt=""
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{user.firstName}</span>
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentUsers;
