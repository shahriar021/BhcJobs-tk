import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL!

const DynamicBaseQRY = async (args: any, api: any, extraOption: any) => {
  const rawBaseQry = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.auth.user?.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers;
    }
  })
  return rawBaseQry(args, api, extraOption)
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: DynamicBaseQRY,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: [],
  endpoints: () => ({})
})