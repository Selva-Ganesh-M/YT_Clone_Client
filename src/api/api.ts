import axios from "axios";

export const api = axios.create({
  baseURL: "https://yt-clone-hh6y.onrender.com/api/",
  // timeout: 1000*3,
  withCredentials: true,
  headers: { "X-Custom-Header": "foobar" },
});
