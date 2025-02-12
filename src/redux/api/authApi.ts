import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin, IUpdatePassword } from "../../types/authTypes";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { ISignup, ISignupRes, IUser } from "../../types/userTypes";

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
    signup: builder.mutation<ISignupRes, ISignup>({
      query: (signupData) => ({
        url: "/signup",
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: [Tags.AUTHS],
    }),
    updateMyPassword: builder.mutation<CreateResponse, IUpdatePassword>({
      query: (data) => ({
        url: "/update-my-password",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<CreateResponse, { email: string }>({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdateMyPasswordMutation,
  useForgotPasswordMutation,
} = authApi;
