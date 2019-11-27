import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://util.ziponia.com";

const httpClient = axios.create({
  baseURL
});

export default httpClient;
