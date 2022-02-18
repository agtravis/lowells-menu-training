import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MealItem from '../../components/trainingApp/MealItem';
import HeaderButton from '../../components/UI/HeaderButton';

const MealsOverviewScreen = (props) => {
  const meals = useSelector((state) => state.meals.meals);

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <MealItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onViewDetail={() => {
            props.navigation.navigate('MealDetail', {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
            });
          }}
          onDelete={() => console.log(itemData.item.id)}
        />
      )}
    />
  );
};

MealsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Meals',
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

export default MealsOverviewScreen;
