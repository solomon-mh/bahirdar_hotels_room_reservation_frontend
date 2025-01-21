import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserResponse } from "../../types/userTypes";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";

export enum UserTags {
  USERS = "users",
  USER = "user",
}
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: [UserTags.USERS, UserTags.USER],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      { data: (IUser & ITimeStamp)[] },
      string | undefined
    >({
      query: (params) => {
        return params ? `/?${params}` : "/";
      },
      providesTags: [UserTags.USERS],
    }),
    getUserById: builder.query<IUserResponse, string>({
      query: (id) => `/${id}`,
      providesTags: [UserTags.USER],
    }),
    createUser: builder.mutation<CreateResponse, IUser>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: {
          ...newUser,
          password: "test1234",
          passwordConfirm: "test1234",
        },
      }),
      invalidatesTags: [UserTags.USERS],
    }),
    updateUser: builder.mutation<CreateResponse, { id: string; data: IUser }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    deleteUser: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [UserTags.USERS, UserTags.USER],
    }),
    getCurrentUser: builder.query<{ data: IUser }, void>({
      query: () => "/current-user",
      providesTags: [UserTags.USER],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetCurrentUserQuery,
} = userApi;
