import axios from "axios";

const KEY = "AIzaSyANeUl1t1ERSsJCZgbJw8L7iYG8M2cUXoQ";

// TODO this is not working
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  }
});
