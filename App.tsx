import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';

import DrawerLayout from './src/components/DrawerLayout';
import {MainProvider} from './src/hooks/mainContext';

const App = () => {
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
        //console.log('You can use my location');
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
    <MainProvider>
      <NavigationContainer>
        <DrawerLayout />
      </NavigationContainer>
    </MainProvider>
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
