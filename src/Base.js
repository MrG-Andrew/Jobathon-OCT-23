import Axios from "axios";

export const Base = Axios.create({
  baseURL: "https://www.google.com/",
  headers: {
    "Content-Type": "Application/json",
  },
});
