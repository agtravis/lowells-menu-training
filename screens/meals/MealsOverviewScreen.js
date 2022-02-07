import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const MealsOverviewScreen = (props) => {
  const meals = useSelector((state) => state.meals.meals);

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

MealsOverviewScreen.navigationOptions = {
  headerTitle: 'All Meals',
};

export default MealsOverviewScreen;
