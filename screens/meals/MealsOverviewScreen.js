import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, Platform, Button, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MealItem from '../../components/trainingApp/MealItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Modal from '../../components/UI/Modal';
import * as favoritesActions from '../../store/actions/favorites';
import Colors from '../../constants/Colors';

const MealsOverviewScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const meals = useSelector((state) => state.meals.meals);

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
    console.log('insert filter logic');
    toggleModalHandler();
  }, []);

  useEffect(() => {
    props.navigation.setParams({
      hdrBtnRFn: headerButtonRightFn,
    });
  }, [headerButtonRightFn]);

  const favorites = useSelector((state) => state.favorites.favorites);

  const dispatch = useDispatch();

  return (
    <View>
      <View style={styles.filterButtonContainer}>
        <Button
          title="View Filters"
          onPress={toggleModalHandler}
          color={modalVisible ? Colors.accent : Colors.primary}
        />
      </View>
      <Modal toggleModal={toggleModalHandler} modalVisible={modalVisible} />
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
