import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin } from "../../types/authTypes";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IUser } from "../../types/userTypes";

enum Tags {
  AUTHS = "auths",
  AUTH = "auth",
}
export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: [Tags.AUTHS, Tags.AUTH],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      CreateResponse & { data: IUser & ITimeStamp },
      ILogin
    >({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
    logout: builder.mutation<CreateResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
