import gql from 'graphql-tag';

export const CURRENT_WEATHER_QUERY = gql`
  query CurrentWeatherQuery($cityName: String!) {
    weather(cityName: $cityName) {
      temperature
      feelsLike
      humidity
      windSpeed
      weatherDescription
    }
  }
`;

export const FORECAST_QUERY = gql`
  query ForecastQuery($cityName: String!) {
    forecast(cityName: $cityName) {
      date
      temperature
      humidity
      weatherDescription
    }
  }
`;
