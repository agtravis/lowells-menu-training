import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { MealsNavigator } from './TrainingAppNavigator';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <MealsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
