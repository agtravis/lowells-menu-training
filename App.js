import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

import mealsReducer from './store/reducers/meals';
import favoritesReducer from './store/reducers/favorites';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  meals: mealsReducer,
  favorites: favoritesReducer,
  auth: authReducer,
});

const fetchFonts = () => {
  return Font.loadAsync({
    ubuntu: require('./assets/fonts/Ubuntu-Regular.ttf'),
    'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    'ubuntu-light': require('./assets/fonts/Ubuntu-Light.ttf'),
  });
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
      <NavigationContainer />
    </Provider>
  );
}
