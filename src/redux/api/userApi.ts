import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserResponse } from "../../types/userTypes";
import { CreateResponse } from "../../types/general";
import { BASE_URL } from "../../utils/url";

enum Tags {
  USERS = "users",
  USER = "user",
}
export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: [Tags.USERS, Tags.USER],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUserResponse, string | undefined>({
      query: (params) => {
        return params ? `/?${params}` : "/";
      },
      providesTags: [Tags.USERS],
    }),
    getUserById: builder.query<IUserResponse, string>({
      query: (id) => `/${id}`,
      providesTags: [Tags.USER],
    }),
    createUser: builder.mutation<CreateResponse, IUser>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [Tags.USERS],
    }),
    updateUser: builder.mutation<CreateResponse, { id: string; data: IUser }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [Tags.USERS, Tags.USER],
    }),
    deleteUser: builder.mutation<CreateResponse, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [Tags.USERS, Tags.USER],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;
