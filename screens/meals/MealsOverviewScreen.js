import React, { useCallback, useState, useEffect } from 'react';
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MealItem from '../../components/trainingApp/MealItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Modal from '../../components/UI/Modal';
import * as favoritesActions from '../../store/actions/favorites';
import * as mealsActions from '../../store/actions/meals';
import Colors from '../../constants/Colors';
import Allergens from '../../constants/Allergens';

const MealsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [menu, setMenu] = useState('breakfast');
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    Beef: true,
    Chicken: true,
    Crab: true,
    Dairy: true,
    Egg: true,
    Fish: true,
    Garlic: true,
    Gluten: true,
    Onion: true,
    Pork: true,
    Sesame: true,
    Shrimp: true,
    Soy: true,
  });

  const allMeals = useSelector((state) => state.meals.meals);

  const meals = [];

  for (const meal of allMeals) {
    let includeMeal = true;
    for (const allergen of meal.allergens) {
      if (filters[allergen] === false) {
        includeMeal = false;
      }
    }
    if (includeMeal === true && meal.menu === menu) {
      meals.push(meal);
    }
  }

  const favorites = useSelector((state) => state.favorites.favorites);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('MealDetail', {
      mealId: id,
      mealTitle: title,
    });
  };

  const toggleModalHandler = () => {
    setModalVisible(!modalVisible);
  };

  const headerButtonRightFn = useCallback(() => {
    toggleModalHandler();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Filters"
              iconName="color-wand"
              onPress={() => {
                headerButtonRightFn();
              }}
            />
          </HeaderButtons>
        );
      },
    });
    // props.navigation.setParams({
    //   hdrBtnRFn: headerButtonRightFn,
    // });
  }, [headerButtonRightFn]);

  const toggleMenuHandler = (menuChoice) => {
    setMenu(menuChoice);
  };

  const dispatch = useDispatch();

  const loadMeals = useCallback(async () => {
    setError('');
    setIsRefreshing(true);
    try {
      await dispatch(mealsActions.fetchMeals());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError, mealsActions]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadMeals);

    return () => {
      unsubscribe();
    };
  }, [loadMeals]);

  useEffect(() => {
    setIsLoading(true);
    loadMeals().then(() => {
      setIsLoading(false);
    });
  }, [loadMeals]);

  const filterChangeHandler = (name) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: !filters[name],
    }));
  };

  return (
    <View>
      <View style={styles.toggleContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            containerStyle={{
              width: '40%',
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            center
            size={14}
            textStyle={{ fontSize: 16 }}
            title={'Breakfast'}
            checked={menu === 'breakfast'}
            onPress={() => toggleMenuHandler('breakfast')}
          />
          <CheckBox
            containerStyle={{
              width: '40%',
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            center
            size={14}
            textStyle={{ fontSize: 16 }}
            title={'Lunch'}
            checked={menu === 'lunch'}
            onPress={() => toggleMenuHandler('lunch')}
          />
        </View>
      </View>
      <Modal
        toggleModal={toggleModalHandler}
        modalVisible={modalVisible}
        title="Show items containing:"
      >
        <View style={styles.checkBoxContainer}>
          {Allergens.map((allergen, index) => (
            <CheckBox
              containerStyle={{
                width: '40%',
              }}
              key={index}
              center
              size={10}
              textStyle={{ fontSize: 16 }}
              title={allergen}
              checked={filters[allergen]}
              onPress={() => filterChangeHandler(allergen)}
            />
          ))}
        </View>
      </Modal>
      {isLoading && (
        <View style={{ ...styles.centered, marginTop: -125 }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {meals.length < 1 && (
        <View style={styles.centered}>
          <View style={{ width: '90%' }}>
            <Text style={styles.text}>No Meals to Display!</Text>
            {error.length > 0 && (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginVertical: 25 }}>
                  <Text style={{ ...styles.text, color: 'red' }}>{error}</Text>
                </View>
                <View
                  style={{
                    marginVertical: 25,
                    width: 170,
                  }}
                >
                  <Button
                    title="Try Again"
                    color={Colors.primary}
                    onPress={loadMeals}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      {!isLoading && meals.length >= 1 && (
        <FlatList
          onRefresh={loadMeals}
          refreshing={isRefreshing}
          contentContainerStyle={styles.flatList}
          data={meals}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <MealItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            >
              <Button
                title="View Details"
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }}
                color={Colors.primary}
              />
              <Button
                title={
                  favorites.includes(itemData.item)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'
                }
                onPress={() => {
                  dispatch(favoritesActions.addToFavorites(itemData.item));
                }}
                color={Colors.primary}
              />
            </MealItem>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'ubuntu-bold',
    textAlign: 'center',
  },
  centered: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: { paddingBottom: 75 },
  checkBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Lowell's Menus",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MealsOverviewScreen;
