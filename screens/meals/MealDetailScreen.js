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
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.includes(selectedMeal);

  const dispatch = useDispatch();

  const toggleInFavoritesHandler = useCallback(() => {
    dispatch(favoritesActions.addToFavorites(selectedMeal));
  }, [dispatch, selectedMeal]);

  useEffect(() => {
    props.navigation.setParams({ isFavorite: isFavorite });
  }, [isFavorite]);

  useEffect(() => {
    props.navigation.setParams({
      toggleFav: toggleInFavoritesHandler,
    });
  }, [toggleInFavoritesHandler]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
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
    headerTitle: navData.navigation.getParam('mealTitle'),
    headerRight: () => {
      // const isFavorite = navData.navigation.getParam('isFavorite');
      // const toggleFn = navData.navigation.getParam('toggleFav');
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="isFavorite"
            iconName={isFavorite ? 'star' : 'star-outline'}
            onPress={toggleFn}
          />
        </HeaderButtons>
      );
    },
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
