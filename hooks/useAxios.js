import axios from "axios";

export const useAxios = async (url, params) => {
  const options = {
    method: "GET",
    url: url,
    params: { params },
    headers: {
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
    },
  };

  await axios
    .request(options)
    .then(function ({ data }) {
      return data;
    })
    .catch(function (error) {
      return error;
    });
};

//https://imdb8.p.rapidapi.com/title/get-releases
