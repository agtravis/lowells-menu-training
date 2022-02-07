import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';

import MealsOverviewScreen from '../screens/meals/MealsOverviewScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
  {
    MealsOverview: MealsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(MealsNavigator);
