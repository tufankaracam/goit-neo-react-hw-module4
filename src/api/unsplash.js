import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.Authorization = `Client-ID ${
  import.meta.env.VITE_UNSPLASH_CLIENT_ID
}`;

const defaultParams = {
  query: "windows",
  page: 1,
  per_page: 12,
  orientation: "landscape",
};

export default async function getPhotos(searchParams) {
  const params = { ...defaultParams, ...searchParams };
  const result = await axios.get("/search/photos", { params });
  return result.data;
}
