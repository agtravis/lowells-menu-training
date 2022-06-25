import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import MealsOverviewScreen, {
  screenOptions as mealsOverviewScreenOptions,
} from '../screens/meals/MealsOverviewScreen';
import FavoriteMealsScreen, {
  screenOptions as favoriteMealsScreenOptions,
} from '../screens/meals/FavoriteMealsScreen';
import MealDetailScreen, {
  screenOptions as mealDetailScreenOptions,
} from '../screens/meals/MealDetailScreen';
import AdminMealsScreen, {
  screenOptions as adminMealsScreenOptions,
} from '../screens/user/AdminMealsScreen';
import EditMealScreen, {
  screenOptions as editMealScreenOptions,
} from '../screens/user/EditMealScreen';
import AuthScreen, {
  screenOptions as authScreenOptions,
} from '../screens/user/AuthScreen';
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
  headerTintColor: Platform.OS === 'android' ? Colors.accent : Colors.primary,
};

const MealsStackNavigator = createStackNavigator();

const MealsNavigator = () => {
  return (
    <MealsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MealsStackNavigator.Screen
        name="MealsOverview"
        component={MealsOverviewScreen}
        options={mealsOverviewScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={mealDetailScreenOptions}
      />
    </MealsStackNavigator.Navigator>
  );
};

const FavoritesStackNavigator = createStackNavigator();

const FavoritesNavigator = () => {
  return (
    <FavoritesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <FavoritesStackNavigator.Screen
        name="FavoriteMeals"
        component={FavoriteMealsScreen}
        options={favoriteMealsScreenOptions}
      />
      <FavoritesStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={mealDetailScreenOptions}
      />
    </FavoritesStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="AdminMeals"
        component={AdminMealsScreen}
        options={adminMealsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditMeal"
        component={EditMealScreen}
        options={editMealScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const TrainingAppDrawerNavigator = createDrawerNavigator();

export const TrainingAppNavigator = () => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const setAdminStatus = async (userId) => {
    if (userId) {
      const response = await fetch(
        'https://lowells-menu-training-default-rtdb.firebaseio.com/users.json'
      );

      const resData = await response.json();
      if (resData[userId].isAdmin) {
        setUserIsAdmin(true);
      }
    }
  };

  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    setAdminStatus(userId);
  }, [userId]);

  const dispatch = useDispatch();
  return (
    <TrainingAppDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
        activeTintColor: Colors.primary,
        itemsContainerStyle: {
          marginTop: Platform.OS === 'android' ? 40 : 0,
        },
      }}
    >
      <TrainingAppDrawerNavigator.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name={'restaurant'} size={23} color={props.color} />
          ),
        }}
      />
      <TrainingAppDrawerNavigator.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name={'star'} size={23} color={props.color} />
          ),
        }}
      />
      {userIsAdmin && (
        <TrainingAppDrawerNavigator.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={props.color}
              />
            ),
          }}
        />
      )}
    </TrainingAppDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator options={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
