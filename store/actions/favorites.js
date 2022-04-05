export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const addToFavorites = (meal) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    // const userId = getState().auth.userId;

    // const response = await fetch(
    //   `https://lowells-menu-training-default-rtdb.firebaseio.com/favorites/${userId}.json?auth=${token}`,
    //   {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       meal,
    //     }),
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error('Something went wrong with the creation!');
    // }

    dispatch({
      type: ADD_TO_FAVORITES,
      meal: meal,
    });
  };
};
