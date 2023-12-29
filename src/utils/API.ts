import axios from "axios";

let authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
const API = axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
  headers,
});

export default API;
