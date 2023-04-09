import axios from "axios";
// import { parseISO } from "date-fns";

const ROOT_API_URL = `${import.meta.env.VITE_ROOT_API_URL}`;
const TEST_API_USERNAME = `${import.meta.env.VITE_TEST_API_USERNAME}`;
const TEST_API_PASSWORD = `${import.meta.env.VITE_TEST_API_PASSWORD}`;
const API_TIMEOUT = Number(`${import.meta.env.VITE_API_TIMEOUT}`);

export const backendApi = axios.create({
  baseURL: ROOT_API_URL,
  timeout: API_TIMEOUT,
  auth: {
    username: TEST_API_USERNAME,
    password: TEST_API_PASSWORD,
  },
});

//////////
//////////
// Add back if you are having issues with dates being retrieved as strings instead of Date objects.
//////////
//////////

// There are multiple strategies to resolve this issue.
// Read more here: https://github.com/axios/axios/issues/1548, or here: https://stackoverflow.com/questions/70689305/customizing-date-serialization-in-axios

// // Forcing axios to convert dates to Date instead of string
// backendApi.interceptors.response.use((originalResponse) => {
//   handleDates(originalResponse.data);
//   return originalResponse;
// });

// const handleDates = (body: any) => {
//   if (body === null || body === undefined || typeof body !== "object")
//     return body;

//   for (const key of Object.keys(body)) {
//     const value = body[key];
//     if (isIsoDateString(value)) body[key] = parseISO(value);
//     else if (typeof value === "object") handleDates(value);
//   }
// };

// const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?$/;
// const isIsoDateString = (value: any): boolean => {
//   return value && typeof value === "string" && isoDateFormat.test(value);
// };
