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

    if (resData.favorites) {
      const responseAllMeals = await fetch(
        'https://lowells-menu-training-default-rtdb.firebaseio.com/meals.json'
      );

      if (!responseAllMeals.ok) {
        throw new Error(
          'There was an error connecting to the database, please contact your administrator.'
        );
      }
      const resDataAllMeals = await responseAllMeals.json();
      // console.log(resDataAllMeals);
      // CHECK FAVORITES FOR MEALS THAT DON'T EXIST HERE
    }

    if (resData === null || resData.length < 1) {
      dispatch({ type: FETCH_FAVORITES, favorites: [] });
    } else {
      dispatch({ type: FETCH_FAVORITES, favorites: resData.favorites });
    }
  };
};

export const addToFavorites = (addedMeal) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const responseFavorites = await fetch(
      `https://lowells-menu-training-default-rtdb.firebaseio.com/users/${userId}.json`
    );

    if (!responseFavorites.ok) {
      throw new Error(
        'There was an error connecting to the database, please contact your administrator.'
      );
    }

    const resDataFavorites = await responseFavorites.json();

    let newFavorites = [addedMeal];

    if (resDataFavorites.favorites) {
      const { favorites } = resDataFavorites;

      let isInFavorites = false;

      for (const meal of favorites) {
        if (addedMeal.id === meal.id) {
          isInFavorites = true;
        }
      }

      if (isInFavorites) {
        newFavorites = favorites.filter((meal) => meal.id !== addedMeal.id);
      } else {
        newFavorites = [...favorites, addedMeal];
      }
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
    } else {
      dispatch({
        type: ADD_TO_FAVORITES,
        meal: addedMeal,
      });
    }
  };
};
