/**
 * @format
 */

import 'react-native';

import {fetchCurrentWeather, fetchWeatherForecast} from '../src/api';

describe('weatherApi', () => {
  describe('fetchCurrentWeather', () => {
    it('returns weather data for given latitude and longitude', async () => {
      const lat = 37.7749;
      const lon = -122.4194;
      const response = await fetchCurrentWeather(lat, lon);

      expect(response).not.toBeNull();
      expect(response).toHaveProperty('weather');
      expect(response).toHaveProperty('main');
      expect(response).toHaveProperty('wind');
    });
  });

  describe('fetchWeatherForecast', () => {
    it('returns weather forecast data for given latitude and longitude', async () => {
      const lat = 37.7749;
      const lon = -122.4194;
      const response = await fetchWeatherForecast(lat, lon);

      expect(response).not.toBeNull();
      expect(response).toHaveProperty('list');
    }, 10000);
  });
});
