import { baseApi } from "src/redux/createdApi/baseApi"

const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIndustries: builder.query({
      query: () => "/api/industry/get", 
    }),
    getRecommendedJobs: builder.query({
      query: () => "/api/job/get",
    }),
    getPopularCompanies: builder.query({
      query: () => "/api/company/get",
    }),
  }),
});

export const { useGetIndustriesQuery, useGetRecommendedJobsQuery, useGetPopularCompaniesQuery } = homeApi;