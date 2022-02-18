import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import MealsOverviewScreen from '../screens/meals/MealsOverviewScreen';
import FavoriteMealsScreen from '../screens/meals/FavoriteMealsScreen';
import MealDetailScreen from '../screens/meals/MealDetailScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'ubuntu-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'ubuntu',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const MealsNavigator = createStackNavigator(
  {
    MealsOverview: MealsOverviewScreen,
    MealDetail: MealDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={'restaurant'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    FavoriteMeals: FavoriteMealsScreen,
    MealDetail: MealDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name={'star'} size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const TrainingAppNavigator = createDrawerNavigator(
  {
    Meals: MealsNavigator,
    Favorites: FavoritesNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      itemsContainerStyle: {
        marginTop: Platform.OS === 'android' ? 40 : 0,
      },
    },
  }
);

export default createAppContainer(TrainingAppNavigator);
