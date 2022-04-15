import React from 'react';
import { FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import MealItem from '../../components/trainingApp/MealItem';
import * as mealsActions from '../../store/actions/meals';
import Colors from '../../constants/Colors';

const AdminMealsScreen = (props) => {
  const meals = useSelector((state) => state.meals.meals);
  const dispatch = useDispatch();

  const editMealHandler = (id) => {
    props.navigation.navigate('EditMeal', { mealId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(mealsActions.deleteMeal(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <MealItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onSelect={() => {
            editMealHandler(itemData.item.id);
          }}
        >
          <Button
            title="Edit Details"
            onPress={() => {
              editMealHandler(itemData.item.id);
            }}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
            color={Colors.primary}
          />
        </MealItem>
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Add/Remove Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditMeal');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default AdminMealsScreen;
