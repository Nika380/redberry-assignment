import axios from "axios";

const API = axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
  headers: {
    Authorization:
      "Bearer 6ec3c3c6e39d48e5b2dcd4246717f52c410e31a9304d62516d8c2e755c5e58d4",
  },
});

export default API;
