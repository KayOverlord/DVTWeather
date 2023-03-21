import axios from 'axios';
import {API_KEY} from '@env';

const baseURL = 'https://api.openweathermap.org/data/2.5/';
const apiKey = `${API_KEY}`;

export const fetchCurrentWeather = async (lat: any, lon: any) => {
  try {
    const response = await axios.get(baseURL + '/weather', {
      params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchWeatherForecast = async (lat: string, lon: string) => {
  try {
    const response = await axios.get(baseURL + `/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
