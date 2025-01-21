import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin } from "../../types/authTypes";
import { CreateResponse } from "../../types/general";
import { BASE_URL } from "../../utils/url";

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
    login: builder.mutation<CreateResponse, ILogin>({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
