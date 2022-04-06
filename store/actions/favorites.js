export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const FETCH_FAVORITES = 'FETCH_FAVORITES';

export const fetchFavorites = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://lowells-menu-training-default-rtdb.firebaseio.com/users/${userId}.json`
    );

    if (!response.ok) {
      throw new Error(
        'There was an error connecting to the database, please contact your administrator.'
      );
    }

    const resData = await response.json();

    // console.log(resData.favorites);

    if (resData === null || resData.length < 1) {
      dispatch({ type: FETCH_FAVORITES, favorites: [] });
    } else {
      console.log('exists');
      dispatch({ type: FETCH_FAVORITES, favorites: resData.favorites });
    }
  };
};

export const addToFavorites = (addedMeal) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const stateFavorites = getState().favorites.favorites;
    let newFavorites = [];

    if (stateFavorites.includes(addedMeal)) {
      const reducedFavorites = stateFavorites.filter(
        (meal) => meal.id !== addedMeal.id
      );
      newFavorites = reducedFavorites;
    } else {
      newFavorites = [...stateFavorites, addedMeal];
    }

    const response = await fetch(
      `https://lowells-menu-training-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorites: newFavorites,
        }),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error('Something went wrong with the creation!');
    }

    dispatch({
      type: ADD_TO_FAVORITES,
      meal: addedMeal,
    });
  };
};
