import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import {useMain} from '../hooks/mainContext';

const Drawer = createDrawerNavigator();
const DrawerLayout = () => {
  const {themeColor} = useMain();
  const textColor = '#fff';
  const HeaderStyle = {
    backgroundColor: themeColor,
  };

  const TitleStyle = {
    color: textColor,
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: themeColor,
        },
        drawerLabelStyle: {
          color: textColor,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: HeaderStyle,
          headerTitleStyle: TitleStyle,
          headerTintColor: textColor,
        }}
      />
      <Drawer.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          headerShown: true,
          headerTitle: 'Favourite Locations',
          headerStyle: HeaderStyle,
          headerTitleStyle: TitleStyle,
          headerTintColor: textColor,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
