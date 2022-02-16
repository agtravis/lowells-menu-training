import MEALS from '../../data/dummy-data';
import { ADD_TO_FAVORITES } from '../actions/favorites';

const initialState = {
  //get favorite meals from database, user favorites
  favorites: MEALS.filter((meal) => meal.id === '001'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const addedMeal = action.meal;

      if (state.favorites.includes(addedMeal)) {
        const reducedFavorites = state.favorites.filter(
          (meal) => meal.id !== addedMeal.id
        );
        return {
          ...state,
          favorites: reducedFavorites,
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, addedMeal],
        };
      }
  }
  return state;
};