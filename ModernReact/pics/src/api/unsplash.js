import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization:
      "Client-ID f53fa4270038b8ec33adac59d69d7e60bfabf98aa03d0da636c9e1e4c46e0be8"
  }
});
