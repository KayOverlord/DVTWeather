import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMain} from '../hooks/mainContext';

const FavouriteScreen = () => {
  const {themeColor, favourites, removeFavourite} = useMain();

  return (
    <View style={{...styles.container, backgroundColor: themeColor}}>
      {favourites.map((favorite, index) => (
        <View style={styles.box} key={index}>
          <Text style={styles.name}>{favorite}</Text>
          <Button title="Remove" onPress={() => removeFavourite(index)} />
        </View>
      ))}
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginVertical: 3,
    backgroundColor: '#bdbdbd1f',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
