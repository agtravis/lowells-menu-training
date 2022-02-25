export const DELETE_MEAL = 'DELETE_MEAL';

export const deleteMeal = (mealId) => {
  return {
    type: DELETE_MEAL,
    mid: mealId,
  };
};
