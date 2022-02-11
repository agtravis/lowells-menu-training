import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../../components/trainingApp/MealItem';

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

MealsOverviewScreen.navigationOptions = {
  headerTitle: 'All Meals',
};

export default MealsOverviewScreen;
