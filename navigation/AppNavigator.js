import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { MealsNavigator, FavoritesNavigator } from './TrainingAppNavigator';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <MealsNavigator />
      {/*<FavoritesNavigator />*/}
    </NavigationContainer>
  );
};

export default AppNavigator;
