import { ADD_TO_FAVORITES } from '../actions/favorites';
import { DELETE_MEAL } from '../actions/meals';

const initialState = {
  // once user in place, watch video 205
  //get favorite meals from database, user favorites
  favorites: [],
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
