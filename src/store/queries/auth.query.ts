import apiQueries from "./api.query";
import { ILogin, IRequest, ISignup, IUser } from "../../types";

export const authApi = apiQueries.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation<IRequest & { user: IUser }, ILogin>({
         query: (body: ILogin) => {
            return {
               url: "/auth/login",
               method: "POST",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
               body,
            };
         },
         invalidatesTags: ["User"],
      }),
      signup: builder.mutation<IRequest & { user: IUser }, ISignup>({
         query: (body: ISignup) => {
            return {
               url: "/auth/signup",
               method: "POST",
               headers: { "Content-Type": "application/json" },
               credentials: "include",
               body,
            };
         },
         invalidatesTags: ["User"],
      }),
   }),
   overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation } = authApi;
