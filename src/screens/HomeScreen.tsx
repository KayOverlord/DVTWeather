import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchCurrentWeather, fetchWeatherForecast} from '../api';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Weather} from '../types';
import {useMain} from '../hooks/mainContext';

const HomeScreen = () => {
  const {setThemeColor, favourites, removeFavourite, addFavourite} = useMain();

  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const [weatherForecast, setWeatherForecast] =
    useState<{day: string; temp: any; icon: string}[]>();

  const [mood, setMood] = useState({
    bg: require('../assets/Images/forest_cloudy.png'),
    color: '#547174',
  });
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

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

      setCurrentWeather(data);

      getCondition(data.weather[0].id, data.weather[0].icon);
      const groupedData: {day: string; temp: any; icon: string}[] = [];
      forcast.list.forEach(
        (item: {
          dt_txt: string;
          main: {temp_max: any};
          weather: {icon: any}[];
        }) => {
          const date = item.dt_txt.slice(0, 10);
          const time = item.dt_txt.slice(11, 19);
          if (time === '12:00:00') {
            const day = new Date(date);

            const dayOfWeek = daysOfWeek[day.getDay()];

            groupedData.push({
              day: dayOfWeek,
              temp: Math.floor(item.main.temp_max),
              icon: item.weather[0].icon,
            });
          }
          setWeatherForecast(groupedData);
        },
      );
    });
    setThemeColor(mood.color);
    return () => sub;
  }, []);

  const getCondition = (id: number, icon: string) => {
    if (id <= 622) {
      setMood({
        bg: require('../assets/Images/forest_rainy.png'),
        color: '#57575D',
      });
      return;
    } else if (id == 800) {
      setMood({
        bg: require('../assets/Images/forest_sunny.png'),
        color: '#47AB2F',
      });
      return;
    } else {
      setMood({
        bg: require('../assets/Images/forest_cloudy.png'),
        color: '#547174',
      });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={mood.bg}
        resizeMode="stretch"
        style={{...styles.head, backgroundColor: mood.color}}>
        <View style={styles.main_temp}>
          <Text style={styles.temp}>
            {Math.floor(currentWeather?.main.temp!!)}°
          </Text>
          <Text style={styles.temp_sub}>
            {currentWeather?.weather[0]?.description}
          </Text>
        </View>
        <Button
          title="Add to Favourite"
          onPress={() => addFavourite(currentWeather?.name!!)}
        />
      </ImageBackground>

      <View style={{...styles.body, backgroundColor: mood.color}}>
        <View style={styles.body_temp}>
          <Text style={styles.body_text}>
            {Math.floor(currentWeather?.main.temp_min!!)}°{'\n'}Min
          </Text>
          <Text style={styles.body_text}>
            {Math.floor(currentWeather?.main.temp!!)}°{'\n'}Current
          </Text>
          <Text style={styles.body_text}>
            {Math.ceil(currentWeather?.main.temp_max!!)}°{'\n'}Max
          </Text>
        </View>
        <View>
          <FlatList
            data={weatherForecast}
            renderItem={({item}) => {
              return (
                <View style={styles.forecast_list}>
                  <View style={styles.forecast_day_view}>
                    <Text style={styles.forecast_text}>{item.day}</Text>
                  </View>
                  <View style={styles.forecast_image_view}>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
                      }}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                  <View style={styles.forecast_temp_view}>
                    <Text style={styles.forecast_text}>{item.temp}°</Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => item.day}
          />
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
    flex: 1.5,
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
  main_temp: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 35,
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
  body_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forecast_list: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  forecast_day_view: {
    width: 90,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  forecast_image_view: {
    width: 100,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forecast_temp_view: {
    width: 90,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  forecast_text: {
    textAlign: 'center',
    fontSize: 17,
  },
});
