import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  url: BASE_URL,
  params: {
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_YOUTUBE_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchVideos = async (searchTerm) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${searchTerm}`, options);
    return data;
  } catch (error) {
    console.error(error);
  }
};
