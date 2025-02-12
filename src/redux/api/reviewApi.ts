import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateResponse, ITimeStamp } from "../../types/general";
import { BASE_URL } from "../../utils/url";
import { IReview } from "@/types/reviewType";

enum ReviewTags {
  REVIEWS = "reviews",
  REVIEW = "review",
}
export const reviewApi = createApi({
  reducerPath: "reviewApi",
  tagTypes: [ReviewTags.REVIEWS, ReviewTags.REVIEW],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/reviews`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    reviewRoom: builder.mutation<
      CreateResponse & { data: IReview & ITimeStamp },
      IReview
    >({
      query: (reviewData) => ({
        url: "/",
        method: "POST",
        body: reviewData,
      }),
    }),
  }),
});

export const { useReviewRoomMutation } = reviewApi;
