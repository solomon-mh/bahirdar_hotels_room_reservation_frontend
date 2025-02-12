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
    <section className="bg-black/2 w-full overflow-y-auto rounded-sm shadow-lg">
      <div className="flex flex-col w-full  items-center gap-5">
        <h2 className="w-full text-slate-900 p-4 text-2xl">Recent Users</h2>
        <div className="flex w-full flex-col items-center gap-x-12 gap-y-5">
          {users?.slice(0, 5).map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>

      </div>
      <div className="flex p-2 w-full justify-end">
        <Link
          to="/dashboard/users"
          className="flex items-center justify-end   rounded-lg bg-accent-500/95 px-5 py-2 text-center text-base font-medium text-white hover:bg-accent-500 focus:ring-4 focus:ring-accent-300"
        >
          View All Users <FaArrowRightLong className="" />
        </Link>
      </div>
    </section>
  );
}

function User({ user }: { user: IUser }) {
  return (
    <>
      <div key={user._id} className="w-full px-4 shadow-md shadow-slate-200">
        <div className="flex justify-start items-center gap-2 transition duration-300 hover:bg-black/10">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.profilePicture}
            alt=""
          />
          <div className="flex flex-col py-1">
            <span className="font-semibold">{user.firstName}</span>
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentUsers;
