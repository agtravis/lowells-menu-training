export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const addToFavorites = (meal) => {
  return {
    type: ADD_TO_FAVORITES,
    meal: meal,
  };
};
