import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as favoritesActions from '../../store/actions/favorites';

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.includes(selectedMeal);

  const dispatch = useDispatch();

  const toggleInFavorites = () =>
    dispatch(favoritesActions.addToFavorites(selectedMeal));

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          onPress={toggleInFavorites}
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
    // add header button to add or remove from favorites
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
    fontFamily: 'ubuntu-light',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default MealDetailScreen;
