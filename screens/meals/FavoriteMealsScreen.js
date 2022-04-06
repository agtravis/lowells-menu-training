import React, { useCallback, useEffect } from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MealItem from '../../components/trainingApp/MealItem';
import HeaderButton from '../../components/UI/HeaderButton';
import * as favoritesActions from '../../store/actions/favorites';
import Colors from '../../constants/Colors';

const FavoriteMealsScreen = (props) => {
  const meals = useSelector((state) => state.favorites.favorites);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('MealDetail', {
      mealId: id,
      mealTitle: title,
    });
  };

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <MealItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
            color={Colors.primary}
          />
          <Button
            title={
              favorites.includes(itemData.item)
                ? 'Remove from Favorites'
                : 'Add to Favorites'
            }
            onPress={() => {
              dispatch(favoritesActions.addToFavorites(itemData.item));
            }}
            color={Colors.primary}
          />
        </MealItem>
      )}
    />
  );
};

FavoriteMealsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Favorite Meals',
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

export default FavoriteMealsScreen;
