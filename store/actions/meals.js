import Meal from '../../models/meal';

export const DELETE_MEAL = 'DELETE_MEAL';
export const CREATE_MEAL = 'CREATE_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';
export const SET_MEALS = 'SET_MEALS';

export const fetchMeals = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://lowells-menu-training-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error(
          'There was an error connecting to the database, please contact your administrator.'
        );
      }

      const resData = await response.json();

      if (resData === null || resData.length < 1) {
        dispatch({ type: SET_MEALS, meals: [] });
      } else {
        const loadedMeals = [];

        for (const [key, value] of Object.entries(resData)) {
          loadedMeals.push(
            new Meal(
              key,
              value.menu,
              value.title,
              value.imageUrl,
              value.description,
              value.allergens
            )
          );
        }

        dispatch({ type: SET_MEALS, meals: loadedMeals });
      }
    } catch (err) {
      throw err;
    }
  };
};

export const deleteMeal = (mealId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://lowells-menu-training-default-rtdb.firebaseio.com/meals/${mealId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong with the delete!');
    }

    dispatch({
      type: DELETE_MEAL,
      mid: mealId,
    });
  };
};

export const createMeal = (menu, title, imageUrl, description, allergens) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://lowells-menu-training-default-rtdb.firebaseio.com/meals.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menu,
          title,
          imageUrl,
          description,
          allergens,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong with the creation!');
    }

    const resData = await response.json();

    dispatch({
      type: CREATE_MEAL,
      mealData: {
        id: resData.name,
        menu,
        title,
        imageUrl,
        description,
        allergens,
      },
    });
  };
};

export const updateMeal = (
  id,
  menu,
  title,
  imageUrl,
  description,
  allergens
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://lowells-menu-training-default-rtdb.firebaseio.com/meals/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menu,
          title,
          imageUrl,
          description,
          allergens,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong with the update!');
    }

    dispatch({
      type: UPDATE_MEAL,
      mid: id,
      mealData: {
        menu,
        title,
        imageUrl,
        description,
        allergens,
      },
    });
  };
};
