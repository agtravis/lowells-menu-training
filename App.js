import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import mealsReducer from './store/reducers/meals';
import favoritesReducer from './store/reducers/favorites';
import TrainingAppNavigator from './navigation/TrainingAppNavigator';

const rootReducer = combineReducers({
  meals: mealsReducer,
  favorites: favoritesReducer,
});

const fetchFonts = () => {
  return Font.loadAsync({
    ubuntu: require('./assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    'ubuntu-light': require('./assets/fonts/Ubuntu-Light.ttf'),
  });
};

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <TrainingAppNavigator />
    </Provider>
  );
}
