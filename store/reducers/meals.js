import MEALS from '../../data/dummy-data';
import { DELETE_MEAL } from '../actions/meals';

const initialState = {
  meals: MEALS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.mid),
      };
  }
  return state;
};
