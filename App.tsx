import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FavouriteScreen from './src/screens/FavouriteScreen';
import LocationScreen from './src/screens/LocationScreen';
import {useColorScheme} from 'react-native';

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
