import axios from "axios";

let authToken;

if (typeof window !== "undefined") {
  authToken = window.localStorage.getItem("authToken");
}

const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
const API = axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
  headers,
});

export default API;
