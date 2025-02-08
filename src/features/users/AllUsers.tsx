import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Search from "../../ui/Search";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery, userApi, UserTags } from "../../redux/api/userApi";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

function AllUsers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeBtn, setActiveBtn] = useState("");
  const navigate = useNavigate()
  const { data: { data: users } = {}, isLoading } = useGetAllUsersQuery(searchParams.toString());

  useEffect(() => {
    userApi.util.invalidateTags([UserTags.USERS])
  }, [searchParams]);

  const onSearchByRoleHandler = (role: string) => {
    if (role)
      searchParams.set("role", role);
    else
      searchParams.delete('role')
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setActiveBtn(searchParams.get("role") || "");
    userApi.util.invalidateTags([UserTags.USERS])
  }, [searchParams]);

  return (
    <div className="w-full bg-white  text-gray-600 shadow-md">
      <div className="flex items-center justify-between p-6">
        <h1 className="p-4 uppercase">
          <Link to="/dashboard/users">All Users</Link>
        </h1>

        {/* SEARCH  */}
        <Search />

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onSearchByRoleHandler("")}
            disabled={activeBtn === ""}
            className="rounded border px-3 text-sm transition-all py-2 duration-300 hover:bg-accent-500 hover:text-white disabled:cursor-not-allowed hover:text-slate-100  disabled:bg-accent-500 disabled:text-slate-100"
          >
            all
          </button>
          <button
            onClick={() => onSearchByRoleHandler("user")}
            disabled={activeBtn === "user"}
            className="rounded border px-3 text-sm transition-all py-2 duration-300 hover:bg-accent-500 hover:text-white disabled:cursor-not-allowed hover:text-slate-100  disabled:bg-accent-500 disabled:text-slate-100"
          >
            all users
          </button>
          <button
            onClick={() => onSearchByRoleHandler("manager")}
            disabled={activeBtn === "manager"}
            className="rounded border px-3 text-sm transition-all py-2 duration-300 hover:text-slate-100 hover:bg-accent-500 hover:text-white disabled:cursor-not-allowed disabled:bg-accent-500 disabled:text-slate-100"
          >
            all managers
          </button>
        </div>
      </div>


      {isLoading
        ?
        (
          <LoadingPage />
        )
        :
        !users?.length ?
          (
            <NotFoundPage >
              <p>Users not found</p>
            </NotFoundPage>
          )
          :
          (
            <div className="flex p-4 flex-col gap-2">

              <Table className="shadow-md shadow-red-300">
                <TableHeader className="bg-slate-200">
                  <TableHead>Profile</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone number</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {
                    users?.map((user) => (
                      <TableRow>
                        <TableCell>
                          {
                            user?.profilePicture
                              ? <img
                                src={user?.profilePicture}
                                alt="profile"
                                className="w-7 h-7 rounded-full"
                              />
                              : <div className="w-7 h-7 grid place-items-center" >
                                No profile picture
                              </div>
                          }
                        </TableCell>
                        <TableCell>{user?.firstName}</TableCell>
                        <TableCell>{user?.lastName}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.phoneNumber}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                        <TableCell>
                          <button
                            className="text-accent-500 hover:underline"
                            onClick={() => {
                              navigate(`/dashboard/users/${user._id}`)
                            }}
                          >
                            View
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </div>
          )
      }
    </div>
  );
}

export default AllUsers;
