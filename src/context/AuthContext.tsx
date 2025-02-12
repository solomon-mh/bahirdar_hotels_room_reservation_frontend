import React, { createContext, useContext, useEffect, useState } from "react";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import { IUser } from "../types/userTypes";
import { IHotel } from "../types/hotelTypes";
import { useGetCurrentUserQuery } from "../redux/api/userApi";

interface Props {
  children: React.ReactNode;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  isOpenModal: boolean;
  handleOpenModal: () => void;
  user: IUser | null;
  role: string | null;
  currentHotel: IHotel | null;
  setCurrentHotelHandler: (hotel: IHotel) => void;
  handleOpenModalWindow: () => void;
  openModalWindow: boolean;
  handleSetUserOnLogout: () => void;
  setUser: (data: IUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentHotel, setCurrentHotel] = useState<IHotel | null>(null);
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const { data: { data } = {}, isLoading, isError, error } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data) setUser(data);
  }, []);
  useEffect(() => {
    if (data)
    {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError)
    {
      setUser(null);
    }
  }, [isError]);

  const handleSetUserOnLogout = () => setUser(null);
  const handleOpenModal = () => setIsOpenModal((prev) => !prev);
  const handleOpenModalWindow = () => setOpenModalWindow((prev) => !prev);
  const setCurrentHotelHandler = (hotel: IHotel) => setCurrentHotel(hotel);



  if (isLoading || (!user && !isError))
  {
    return (
      <div className="mx-auto flex min-h-screen justify-center lg:w-1/4">
        <div className="mt-5 p-4 lg:mt-12">
          <LoadingSkeleton className="h-3 w-[10rem]" />
          <LoadingSkeleton className="h-3 w-[30rem]" />
          <LoadingSkeleton className="h-3 w-[20rem]" />
          <LoadingSkeleton className="h-3 w-[15rem]" />
          <LoadingSkeleton className="h-3 w-[25rem]" />
          <LoadingSkeleton className="h-3 w-[10rem]" />
        </div>
      </div>
    );
  }

  if (!error || (error && 'status' in error && error.status === 401))
  {
  // setUser(null);

    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: !isError,
          isOpenModal,
          handleOpenModal,
          user,
          role: user?.role || null,
          currentHotel,
          setCurrentHotelHandler,
          handleOpenModalWindow,
          openModalWindow,
          handleSetUserOnLogout,
          setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  else if (window.location.pathname === "/login")
  {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: false,
          isOpenModal,
          handleOpenModal,
          user,
          role: user?.role || null,
          currentHotel,
          setCurrentHotelHandler,
          handleOpenModalWindow,
          openModalWindow,
          handleSetUserOnLogout,
          setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  {
    window.localStorage.removeItem("token");
    window.location.href = "/login";


  }
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
  {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
