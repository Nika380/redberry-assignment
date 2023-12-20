import axios from "axios";

const API = axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
});

export default API;
