import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
const env = process.env.NEXT_PUBLIC_ENV || "dev";

export default fetchBaseQuery({
  // baseUrl: process.env.NEXT_PUBLIC_SERVER_URL_PROD, // local api base url
  baseUrl:
    env === "dev"
      ? process.env.NEXT_PUBLIC_SERVER_URL_DEV || "http://localhost:8080"
      : process.env.NEXT_PUBLIC_SERVER_URL_PROD || "http://localhost:8080",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.global.authToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
