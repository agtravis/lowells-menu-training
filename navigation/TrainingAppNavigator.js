import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import MealsOverviewScreen from '../screens/meals/MealsOverviewScreen';
import FavoriteMealsScreen from '../screens/meals/FavoriteMealsScreen';
import MealDetailScreen from '../screens/meals/MealDetailScreen';
import AdminMealsScreen from '../screens/user/AdminMealsScreen';
import EditMealScreen from '../screens/user/EditMealScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';
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

const AdminNavigator = createStackNavigator(
  {
    AdminMeals: AdminMealsScreen,
    EditMeal: EditMealScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const TrainingAppNavigator = createDrawerNavigator(
  {
    Meals: MealsNavigator,
    Favorites: FavoritesNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      itemsContainerStyle: {
        marginTop: Platform.OS === 'android' ? 40 : 0,
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  TrainingApp: TrainingAppNavigator,
});

export default createAppContainer(MainNavigator);
