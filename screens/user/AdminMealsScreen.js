import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import MealItem from '../../components/trainingApp/MealItem';
import * as mealsActions from '../../store/actions/meals';
import Colors from '../../constants/Colors';

const AdminMealsScreen = (props) => {
  const meals = useSelector((state) => state.meals.meals);
  const dispatch = useDispatch();

  const selectItemHandler = () => {
    console.log('edit screen');
  };

  const deleteItemHandler = (id) => {
    dispatch(mealsActions.deleteMeal(id));
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
            selectItemHandler();
          }}
        >
          <Button
            title="Edit Details"
            onPress={() => {
              selectItemHandler(itemData.item.id);
            }}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => {
              deleteItemHandler(itemData.item.id);
            }}
            color={Colors.primary}
          />
        </MealItem>
      )}
    />
  );
};

AdminMealsScreen.navigationOptions = (navData) => {
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
  };
};

export default AdminMealsScreen;
