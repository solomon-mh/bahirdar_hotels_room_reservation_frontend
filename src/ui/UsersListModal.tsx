import { useEffect, useRef, useState } from "react";
import { useUsers } from "../features/users/useUsers";
import Spinner from "./Spinner";
import UsersListItem from "./UsersListItem";
import { useSearchParams } from "react-router-dom";
import { User } from "../types/userTypes";

interface Props {
  handleSelectManager: (user: User) => void;
}
function UsersListModal({ handleSelectManager }: Props) {
  const { data: { data: { users } = {} } = {}, isLoading } = useUsers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchParams.set("role", "user");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchParams.set("search", searchValue);
      setSearchParams(searchParams);
    }, 500);

    return () => clearTimeout(timer)
  }, [searchParams, searchValue, setSearchParams])

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    searchParams.set("search", searchValue);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="absolute bottom-12 left-4 h-[24rem] w-[40%] overflow-auto rounded-xl bg-slate-200 shadow-xl">
        {/* SEARCH  */}
        <div className="sticky top-0 bg-slate-300 p-5">
          <div className="group flex items-center justify-center">
            <input
              type="search"
              disabled={isLoading}
              autoFocus
              ref={ref}
              className="rounded-full bg-slate-200 px-3 py-2 focus:outline-none disabled:cursor-not-allowed"
              onClick={(e) => {
                e.preventDefault();
                searchParams.set("search", searchValue);
                setSearchParams(searchParams);
              }}
              onChange={onSearchHandler}
            />
            <button
              disabled={isLoading}
              onClick={onButtonClickHandler}
              className="-ml-16 w-24 rounded-full bg-accent-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-accent-400"
            >
              Search
            </button>
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : users?.length && users.length > 0 ? (
          users.map((user, i) => (
            <div key={i} className="m-4">
              <UsersListItem
                onClick={() => handleSelectManager(user)}
                user={user}
              />
            </div>
          ))
        ) : (
          <p>
            There are no users found. Please add a user first before assigning
            to a manager role
          </p>
        )}
      </div>
    </>
  );
}

export default UsersListModal;
