import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchCurrentWeather, fetchWeatherForecast} from '../api';
import Geolocation from '@react-native-community/geolocation';
import {Weather} from '../types';
import {Forcast} from '../types/forcast';

const HomeScreen = () => {
  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const [weatherForecast, setWeatherForecast] = useState<Forcast>();
  const [conditions, setConditions] = useState('01d');
  const [mood, setMood] = useState({
    bg: require('../assets/Images/forest_cloudy.png'),
    color: '#547174',
  });

  useEffect(() => {
    const sub = Geolocation.getCurrentPosition(async info => {
      const data = await fetchCurrentWeather(
        info.coords.latitude,
        info.coords.longitude,
      );
      const forcast = await fetchWeatherForecast(
        info.coords.latitude,
        info.coords.longitude,
      );
      setWeatherForecast(forcast);
      setCurrentWeather(data);

      getCondition(data.weather[0].id, data.weather[0].icon);
      //console.log(forcast.list);
    });

    return () => sub;
  }, []);

  const getCondition = (id: number, icon: string) => {
    if (id <= 622) {
      setMood({
        bg: require('../assets/Images/forest_rainy.png'),
        color: '#57575D',
      });
      return setConditions(icon);
    } else if (id == 800) {
      setMood({
        bg: require('../assets/Images/forest_sunny.png'),
        color: '#47AB2F',
      });
      return setConditions(icon);
    } else {
      setMood({
        bg: require('../assets/Images/forest_cloudy.png'),
        color: '#547174',
      });
      return setConditions(icon);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={mood.bg}
        resizeMode="stretch"
        style={{...styles.head, backgroundColor: mood.color}}>
        <Text style={styles.temp}>
          {Math.round(currentWeather?.main.temp!!)}°
        </Text>
        <Text style={styles.temp_sub}>
          {currentWeather?.weather[0]?.description}
        </Text>
      </ImageBackground>

      <View style={{...styles.body, backgroundColor: mood.color}}>
        <View style={styles.body_temp}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            {currentWeather?.main.temp_min!!}°{'\n'}Min
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            {Math.round(currentWeather?.main.temp!!)}°{'\n'}Current
          </Text>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            {currentWeather?.main.temp_max!!}°{'\n'}Max
          </Text>
        </View>
        <View>
          {weatherForecast?.list?.map(v => {
            //const date = new Date(item.dt * 1000);
            //const dayOfWeek = daysOfWeek[date.getDay()];
            return (
              <Text style={{textAlign: 'center'}} key={v.dt_txt}>
                {v?.weather[0]?.description!!}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  body: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  temp: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  temp_sub: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  body_temp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomColor: '#fff',
    borderTopColor: 'transparent',
    borderWidth: 1,
  },
});
