import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import mealsReducer from './store/reducers/meals';
import TrainingAppNavigator from './navigation/TrainingAppNavigator';

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <TrainingAppNavigator />
    </Provider>
  );
}
