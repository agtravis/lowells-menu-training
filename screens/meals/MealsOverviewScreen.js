import React, { useCallback, useState, useEffect } from 'react';
import {
  FlatList,
  Platform,
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MealItem from '../../components/trainingApp/MealItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Modal from '../../components/UI/Modal';
import * as favoritesActions from '../../store/actions/favorites';
import Colors from '../../constants/Colors';
import Allergens from '../../constants/Allergens';

const MealsOverviewScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
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
    'Shrimp/prawns': true,
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
    if (includeMeal === true) {
      meals.push(meal);
    }
  }

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
    props.navigation.setParams({
      hdrBtnRFn: headerButtonRightFn,
    });
  }, [headerButtonRightFn]);

  const favorites = useSelector((state) => state.favorites.favorites);

  const dispatch = useDispatch();

  const filterChangeHandler = (name) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: !filters[name],
    }));
  };

  return (
    <View>
      <Modal
        toggleModal={toggleModalHandler}
        modalVisible={modalVisible}
        title="Show items containing:"
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Allergens.map((allergen, index) => (
            <CheckBox
              containerStyle={{
                width: '40%',
              }}
              key={index}
              center
              size={10}
              textStyle={{ fontSize: 8 }}
              title={allergen}
              checked={filters[allergen]}
              onPress={() => filterChangeHandler(allergen)}
            />
          ))}
        </View>
      </Modal>
      <FlatList
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
    </View>
  );
};

const styles = StyleSheet.create({
  filterButtonContainer: {
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
});

MealsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Meals',
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
    headerRight: () => {
      const toggleFn = navData.navigation.getParam('hdrBtnRFn');
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Filters"
            iconName="color-wand"
            onPress={() => {
              toggleFn();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default MealsOverviewScreen;
