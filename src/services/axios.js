import axios from "axios";

//Busca na api do openweathermap os dados meteorólogicos, de acordo com as coordenadas enviadas
export const getWeather = async (lat, lng) => {
  let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat: lat,
      lon: lng,
      appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
      lang: "pt",
      units: "metric",
    },
  });
  return res.data;
};

//Busca na api do google o endereço, de acordo com as coordenadas enviadas
export const getAddress = async (lat, lng) => {
  let res = axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      lat +
      "," +
      lng +
      "&key=AIzaSyCdVpLGWsO8ElUDwjjKRJtsqs01QynqPXs"
  );
  return res;
};
