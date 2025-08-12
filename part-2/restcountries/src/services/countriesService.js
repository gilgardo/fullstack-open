import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
const restCountriesUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const weaterUrl = "https://api.openweathermap.org/data/2.5";

const getAll = async () => {
  const request = axios.get(`${restCountriesUrl}/all`);
  const response = await request;
  return response.data;
};

const getCountry = async (name) => {
  const request = axios.get(`${restCountriesUrl}/name/${name}`);
  const response = await request;
  return response.data;
};

const getWeather = async (name) => {
  const request = axios.get(
    `${weaterUrl}/weather?q=${name}&appid=${API_KEY}&units=metric`
  );
  const response = await request;
  return response.data;
};

export default {
  getAll,
  getCountry,
  getWeather,
};
