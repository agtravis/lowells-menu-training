import React, { useCallback, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import * as favoritesActions from '../../store/actions/favorites';
import HeaderButton from '../../components/UI/HeaderButton';

const MealDetailScreen = (props) => {
  const mealId = props.route.params.mealId;
  const selectedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  const favorites = useSelector((state) => state.favorites.favorites);

  let isInFavorites = false;

  for (const meal of favorites) {
    if (selectedMeal.id === meal.id) {
      isInFavorites = true;
    }
  }

  const dispatch = useDispatch();

  const toggleInFavoritesHandler = useCallback(() => {
    dispatch(favoritesActions.addToFavorites(selectedMeal));
  }, [dispatch, selectedMeal]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="isInFavorites"
              iconName={isInFavorites ? 'star' : 'star-outline'}
              onPress={toggleInFavoritesHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, [toggleInFavoritesHandler, isInFavorites]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
          onPress={toggleInFavoritesHandler}
          color={Colors.primary}
        />
      </View>
      <Text style={styles.description}>{selectedMeal.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.mealTitle,
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
