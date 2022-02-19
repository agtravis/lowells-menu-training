import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import MealItem from '../../components/trainingApp/MealItem';
import Colors from '../../constants/Colors';

const AdminMealsScreen = (props) => {
  const meals = useSelector((state) => state.meals.meals);

  const selectItemHandler = () => {
    console.log('edit screen');
  };

  const deleteItemHandler = () => {
    console.log('delete item');
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
              selectItemHandler();
            }}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => {
              deleteItemHandler();
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
