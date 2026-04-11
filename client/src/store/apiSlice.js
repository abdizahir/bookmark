import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/`,
    // credentials: "include",
   prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
  }),
  tagTypes: ["Bookmark", "Auth"],
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (formData) => ({
        url: "auth/signup",
        method: "POST",
        body: formData,
      }),
    }),
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "auth/login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    // getMe: builder.query({
    //   query: () => "auth/me",
    //   keepUnusedDataFor: 0,
    //   refetchOnMountOrArgChange: true,
    //   providesTags: ["Auth"],
    // }),
    resetUser: builder.mutation({
      query: (formData) => ({
        url: "auth/reset",
        method: "POST",
        body: formData,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...body }) => ({
        url: `auth/reset-password?token=${encodeURIComponent(token || "")}`,
        method: "POST",
        body,
      }),
    }),
    createBookmark: builder.mutation({
      query: ({ token, ...body }) => ({
        url: "bookmark/add-bookmark",
        method: "POST",
        body,
      }),
    }),
    editBookmark: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `bookmark/${id}/edit-bookmark`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Bookmark"],
    }),
    getBookmark: builder.query({
      query: ({ sort = "recentlyAdded", search } = {}) => {
        const s = (search ?? "").trim();

        return {
          url: "bookmark",
          method: "GET",
          params: {
            sort,
            ...(s ? { search: s } : {}),
          },
        };
      },
      providesTags: ["Bookmark"],
    }),
    addArchive: builder.mutation({
      query: ({ id }) => ({
        url: `bookmark/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["Bookmark"],
    }),
    removeArchive: builder.mutation({
      query: ({ id }) => ({
        url: `bookmark/${id}/unarchive`,
        method: "PATCH",
      }),
      invalidatesTags: ["Bookmark"],
    }),
    deleteBookmark: builder.mutation({
      query: ({ id }) => ({
        url: `bookmark/delete-bookmark/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmark"],
    }),
    visitAction: builder.mutation({
      query: ({ id }) => ({
        url: `bookmark/${id}/visit`,
        method: "POST",
      }),
      providesTags: ["Bookmark"],
    }),
    unpinBookmark: builder.mutation({
      query: ({ id }) => ({
        url: `bookmark/${id}/unpin`,
        method: "POST",
      }),
      invalidatesTags: ["Bookmark"],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useResetUserMutation,
  useResetPasswordMutation,
  useCreateBookmarkMutation,
  useGetBookmarkQuery,
  useAddArchiveMutation,
  useRemoveArchiveMutation,
  useDeleteBookmarkMutation,
  useLogoutUserMutation,
  useVisitActionMutation,
  useUnpinBookmarkMutation,
  useEditBookmarkMutation,
} = api;
