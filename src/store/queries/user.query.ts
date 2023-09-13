import apiQueries from "./api.query";
import { IUser } from "../../types";
import { IRequest } from "../../types";

export const userApi = apiQueries.injectEndpoints({
   endpoints: (builder) => ({
      getUser: builder.query<IRequest & { user: IUser }, void>({
         query: () => {
            return {
               url: "/user",
               method: "GET",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            };
         },
         providesTags: ["User"],
      }),
      logout: builder.mutation<IRequest, void>({
         query: () => {
            return {
               url: "/user/logout",
               method: "GET",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            };
         },
         async onQueryStarted(...args) {
            const [_, { dispatch, queryFulfilled }] = args;
            try {
               const { data } = await queryFulfilled;
               const newData = { ...data, user: null };
               let voidEl: void;
               dispatch(
                  userApi.util.updateQueryData("getUser", voidEl, (draft) => {
                     Object.assign(draft, newData);
                  })
               );
            } catch (err) {
               console.error(err);
            }
         },
      }),
      deleteAccount: builder.mutation<IRequest, void>({
         query: () => {
            return {
               url: "/user",
               method: "DELETE",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
            };
         },
         async onQueryStarted(...args) {
            const [_, { dispatch, queryFulfilled }] = args;
            try {
               const { data } = await queryFulfilled;
               const newData = { ...data, user: null };
               let voidEl: void;
               dispatch(
                  userApi.util.updateQueryData("getUser", voidEl, (draft) => {
                     Object.assign(draft, newData);
                  })
               );
            } catch (err) {
               console.error(err);
            }
         },
      }),
   }),
   overrideExisting: false,
});

export const { useDeleteAccountMutation, useGetUserQuery, useLogoutMutation } = userApi;
