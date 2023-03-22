import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import LocationScreen from './src/screens/LocationScreen';
import {useColorScheme, PermissionsAndroid} from 'react-native';

const App = () => {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const HeaderStyle = {
    backgroundColor: isDarkMode ? '#eb6d4d' : '#eb6d4d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6,
  };

  const TitleStyle = {
    color: isDarkMode ? '#003049' : '#fff',
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'DVTWeather Location Permission',
          message:
            'DVTWeather App needs access to your location ' +
            'so we can provide you with accurate weather information',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use my location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            headerShown: true,
            headerTitle: 'WIT',
            headerStyle: HeaderStyle,
            headerTitleStyle: TitleStyle,
          }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{
            headerShown: true,
            headerTitle: 'WIT',
            headerStyle: HeaderStyle,
            headerTitleStyle: TitleStyle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/**
 *   const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 *   <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
 */
