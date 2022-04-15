import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import TrainingAppNavigator from './TrainingAppNavigator';
import MealsOverviewScreen from '../screens/meals/MealsOverviewScreen';

const MyStack = createStackNavigator();

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen name="MealsOverview" component={MealsOverviewScreen} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
