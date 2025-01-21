import { Link, useSearchParams } from "react-router-dom";
import UsersTable from "./UsersTable";
import UserTableHeader from "./UserTableHeader";
import Search from "../../ui/Search";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useGetAllUsersQuery, userApi, UserTags } from "../../redux/api/userApi";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";

function AllUsers() {
  const { register, handleSubmit } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeBtn, setActiveBtn] = useState("");

  const { data: { data: users } = {}, isLoading } = useGetAllUsersQuery(searchParams.toString());

  const onSearchHandler = handleSubmit((data) => {

    searchParams.set("search", data.search || "");
    if (data.search)
    setSearchParams(searchParams);
  });

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
        <Search
          isLoading={isLoading}
          onSearchHandler={onSearchHandler}
          register={register}
        />

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
            <>
              <UserTableHeader />
              {users.map((user, i) => <UsersTable user={user} key={i} />)}
            </>
          )
      }
    </div>
  );
}

export default AllUsers;

/*
{
    status: 'success',
    results: 7,
    data: {
      users: Array(7) [
        {
          _id: '668ce22aa5b16ed846c21a18',
          firstName: 'admin',
          lastName: 'TestF',
          email: 'admin@test.com',
          role: 'admin',
          phoneNumber: '0908005801',
          createdAt: '2024-07-09T07:09:30.494Z',
          updatedAt: '2024-07-09T07:09:30.494Z',
          __v: 0
        },
*/
