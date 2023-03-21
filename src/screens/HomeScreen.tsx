import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchCurrentWeather} from '../api';

const HomeScreen = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);

  const latitude = 37.785834;
  const longitude = -122.406417;

  const getCurrentWeather = async () => {
    const data = await fetchCurrentWeather(latitude, longitude);
    setCurrentWeather(data);
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  return (
    <View>
      <Text>HOME</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
