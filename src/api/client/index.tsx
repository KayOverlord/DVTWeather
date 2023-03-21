import {ApolloClient, InMemoryCache} from '@apollo/client';
import {processColor} from 'react-native/types';
import {CURRENT_WEATHER_QUERY, FORECAST_QUERY} from '../queries';

const client = new ApolloClient({
  uri: 'https://api.openweathermap.org/data/2.5',
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': `${process.env.API_KEY}`,
  },
});

export const getCurrentWeather = cityName => {
  return client.query({
    query: CURRENT_WEATHER_QUERY,
    variables: {cityName},
  });
};

export const getWeatherForecast = cityName => {
  return client.query({
    query: FORECAST_QUERY,
    variables: {cityName},
  });
};
