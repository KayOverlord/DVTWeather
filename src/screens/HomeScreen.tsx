import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCurrentWeather, getWeatherForecast} from '../api/client';

const HomeScreen = () => {
  const [cityName, setCityName] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const handleGetCurrentWeather = async () => {
    try {
      const {data} = await getCurrentWeather(cityName);
      setWeatherData(data.weather);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetWeatherForecast = async () => {
    try {
      const {data} = await getWeatherForecast(cityName);
      setForecastData(data.forecast);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCurrentWeather();
  }, []);

  return (
    <View>
      <Text>{weatherData}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
