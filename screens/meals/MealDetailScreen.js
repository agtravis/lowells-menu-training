import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  return (
    <View style={styles.container}>
      <Text>{selectedMeal.title}</Text>
    </View>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('mealTitle'),
  };
};

const styles = StyleSheet.create({
  container: {},
});

export default MealDetailScreen;
