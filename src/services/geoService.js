const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getGeoData(zip) {
  const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${API_KEY}`;
  const geoRes = await axios.get(geoUrl);
  const { lat, lon } = geoRes.data;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const weatherRes = await axios.get(weatherUrl);
  const timezone = weatherRes.data.timezone;

  return {
    latitude: lat,
    longitude: lon,
    timezone
  };
}

module.exports = { getGeoData };