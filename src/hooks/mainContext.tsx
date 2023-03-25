import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {MainContextType, MainProviderProps} from '../types';

const Context = createContext<MainContextType>({
  themeColor: '',
  setThemeColor: () => {},
  favourites: [],
  removeFavourite: () => {},
  addFavourite: () => {},
});

export const useMain = () => {
  return useContext(Context);
};

export const MainProvider = ({children}: MainProviderProps) => {
  const [themeColor, setThemeColor] = useState('#2b2b2b');
  const [favourites, setFavourites] = useState<string[]>([]);
  const FAVOURITES_STORAGE_KEY = 'favourites';

  useEffect(() => {
    getFavourites();
  }, [favourites]);

  const getFavourites = async () => {
    const savedFavorites = await AsyncStorage.getItem('favourites');
    if (savedFavorites) {
      setFavourites(JSON.parse(savedFavorites));
    }
  };

  const removeFavourite = async (index: number) => {
    const newFavourites = [...favourites];
    newFavourites.splice(index, 1);
    await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites));
    setFavourites(newFavourites);
    return;
  };

  const addFavourite = (location: string) => {
    let newFavourites = [...favourites];
    if (location !== null && location !== undefined)
      newFavourites = [...favourites, location];

    console.log(newFavourites);
    AsyncStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(newFavourites),
    ).catch(error => console.log(error));
  };

  const value = {
    themeColor,
    setThemeColor,
    favourites,
    removeFavourite,
    addFavourite,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
