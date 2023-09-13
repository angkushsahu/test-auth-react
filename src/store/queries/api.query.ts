import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api`;

const apiQueries = createApi({
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: () => ({}),
   tagTypes: ["User"],
});

export default apiQueries;
