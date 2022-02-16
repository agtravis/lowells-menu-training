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
  // const [isFavorite, setIsFavorite] = useState(false);
  const selectedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  const isFavorite = useSelector((state) => {
    if (state.favorites.favorites.includes(selectedMeal)) {
      return true;
    } else {
      return false;
    }
  });

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          onPress={() => {
            dispatch(favoritesActions.addToFavorites(selectedMeal));
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
