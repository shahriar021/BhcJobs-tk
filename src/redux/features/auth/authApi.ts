import { baseApi } from "src/redux/createdApi/baseApi"

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => {
        return {
          url: "/api/job_seeker/login",

          method: "POST",
          body: loginData,
        };
      },
    }),

    signUpUser: builder.mutation({
      query: (userBody) => {
        return {
          url: "/api/job_seeker/register",
          method: "POST",
          body: userBody,
        };
      },
    }),

    otpVerify: builder.mutation({
      query: (userBody) => {
        return {
          url: "/api/job_seeker/phone_verify",
          method: "POST",
          body: userBody,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpUserMutation,useOtpVerifyMutation } = authApi