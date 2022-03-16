import MEALS from '../../data/dummy-data';
import Meal from '../../models/meal';
import { CREATE_MEAL, DELETE_MEAL, UPDATE_MEAL } from '../actions/meals';

const initialState = {
  meals: MEALS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEAL:
      const newMeal = new Meal(
        action.mealData.id,
        action.mealData.menu,
        action.mealData.title,
        action.mealData.imageUrl,
        action.mealData.description,
        action.mealData.allergens
      );
      return {
        ...state,
        meals: state.meals.concat(newMeal),
      };
    case UPDATE_MEAL:
      const mealIndex = state.meals.findIndex((meal) => meal.id === action.mid);
      const updatedMeal = new Meal(
        action.mid,
        action.mealData.menu,
        action.mealData.title,
        action.mealData.imageUrl,
        action.mealData.description,
        action.mealData.allergens
      );
      const updatedMeals = [...state.meals];
      updatedMeals[mealIndex] = updatedMeal;
      return {
        ...state,
        meals: updatedMeals,
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.mid),
      };
  }
  return state;
};
