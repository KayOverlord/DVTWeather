import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';

const Drawer = createDrawerNavigator();
const DrawerLayout = () => {
  const HeaderStyle = {
    backgroundColor: '#0000000',
  };

  const TitleStyle = {
    color: '#fff',
  };
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: HeaderStyle,
          headerTitleStyle: TitleStyle,
        }}
      />
      <Drawer.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          headerShown: true,
          headerTitle: 'FavouriteScreen',
          headerStyle: HeaderStyle,
          headerTitleStyle: TitleStyle,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
