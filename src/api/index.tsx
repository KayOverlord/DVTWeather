import axios from 'axios';
import {API_KEY} from '@env';

const baseURL = 'https://api.openweathermap.org/data/2.5/';
const apiKey = `${API_KEY}`;

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(baseURL + '/weather', {
      params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchWeatherForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(baseURL + `/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
