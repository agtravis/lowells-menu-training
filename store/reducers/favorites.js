import { ADD_TO_FAVORITES, FETCH_FAVORITES } from '../actions/favorites';
import { DELETE_MEAL } from '../actions/meals';

const initialState = {
  favorites: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      const newFavorites = [...action.favorites];
      return {
        ...state,
        favorites: newFavorites,
      };
    case ADD_TO_FAVORITES:
      const addedMeal = action.meal;

      let isInFavorites = false;
      for (const meal of state.favorites) {
        if (addedMeal.id === meal.id) {
          isInFavorites = true;
        }
      }

      if (isInFavorites) {
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
    case DELETE_MEAL:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.mid
        ),
      };
  }
  return state;
};
