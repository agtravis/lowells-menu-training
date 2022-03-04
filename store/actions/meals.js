export const DELETE_MEAL = 'DELETE_MEAL';
export const CREATE_MEAL = 'CREATE_MEAL';
export const UPDATE_MEAL = 'UPDATE_MEAL';

export const deleteMeal = (mealId) => {
  return {
    type: DELETE_MEAL,
    mid: mealId,
  };
};

export const createMeal = (menu, title, imageUrl, description, allergens) => {
  return {
    type: CREATE_MEAL,
    mealData: {
      menu,
      title,
      imageUrl,
      description,
      allergens,
    },
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
  return {
    type: UPDATE_MEAL,
    mid: id,
    mealData: {
      menu,
      title,
      imageUrl,
      description,
      allergens,
    },
  };
};
