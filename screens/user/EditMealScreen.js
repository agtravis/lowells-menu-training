import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Button,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import HeaderButton from '../../components/UI/HeaderButton';
import * as mealsActions from '../../store/actions/meals';
import Allergens from '../../constants/Allergens';

const EditMealScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const editedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  const [menu, setMenu] = useState(editedMeal ? editedMeal.menu : null);
  const [title, setTitle] = useState(editedMeal ? editedMeal.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedMeal ? editedMeal.imageUrl : ''
  );
  const [description, setDescription] = useState(
    editedMeal ? editedMeal.description : ''
  );
  const [allergensArr, setAllergensArr] = useState(
    editedMeal ? editedMeal.allergens : []
  );

  const dispatch = useDispatch();

  const toggleMenuHandler = (menuChoice) => {
    setMenu(menuChoice);
  };

  const pushToAllergensHandler = (newAllergen) => {
    if (allergensArr.includes(newAllergen)) {
      const filteredAllergens = allergensArr.filter(
        (allergen) => allergen !== newAllergen
      );
      setAllergensArr(filteredAllergens);
    } else {
      const newAllergens = [...allergensArr, newAllergen];
      const sortedAllergens = newAllergens.sort((a, b) => (a > b ? 1 : -1));
      setAllergensArr(sortedAllergens);
    }
  };

  const submitHandler = useCallback(() => {
    if (editedMeal) {
      dispatch(
        mealsActions.updateMeal(
          mealId,
          menu,
          title,
          imageUrl,
          description,
          allergensArr
        )
      );
    } else {
      dispatch(
        mealsActions.createMeal(
          menu,
          title,
          imageUrl,
          description,
          allergensArr
        )
      );
    }
  }, [dispatch, mealId, menu, title, imageUrl, description, allergensArr]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const compileMeal = () => {
    const newMeal = {
      menu: menu,
      title: title,
      imageUrl: imageUrl,
      description: description,
      allergensArr: allergensArr,
    };
    console.log(newMeal);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Menu (select one)</Text>
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
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Allergens (select all that apply)</Text>
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
                checked={allergensArr.includes(allergen)}
                onPress={() => pushToAllergensHandler(allergen)}
              />
            ))}
          </View>

          <Button title="push" onPress={compileMeal} />
        </View>
      </View>
    </ScrollView>
  );
};

EditMealScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('mealId')
      ? 'Edit Meal'
      : 'Add Meal',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'ubuntu-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditMealScreen;
