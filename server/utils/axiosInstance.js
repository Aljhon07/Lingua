const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: `${process.env.DIRECTUS_SERVER_URL}`,
  timeout: 9500,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.DIRECTUS_STATIC_TOKEN}`,
  },
});

module.exports = axiosInstance;
