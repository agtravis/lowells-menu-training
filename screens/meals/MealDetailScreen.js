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

import Colors from '../../constants/Colors';

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add to Favorites"
          onPress={() => {
            console.log('add to favorites');
          }}
          color={Colors.primary}
        />
      </View>
      <Text style={styles.description}>{selectedMeal.description}</Text>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('mealTitle'),
  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default MealDetailScreen;
