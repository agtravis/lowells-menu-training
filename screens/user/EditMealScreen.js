import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import Modal from '../../components/UI/Modal';
import HeaderButton from '../../components/UI/HeaderButton';
import * as mealsActions from '../../store/actions/meals';
import Allergens from '../../constants/Allergens';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditMealScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const mealId = props.navigation.getParam('mealId');
  const editedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      menu: editedMeal ? editedMeal.menu : null,
      title: editedMeal ? editedMeal.title : '',
      imageUrl: editedMeal ? editedMeal.imageUrl : '',
      description: editedMeal ? editedMeal.description : '',
      allergens: editedMeal ? editedMeal.allergens : [],
    },
    inputValidities: {
      menu: editedMeal ? true : false,
      title: editedMeal ? true : false,
      imageUrl: editedMeal ? true : false,
      description: editedMeal ? true : false,
      allergens: true,
    },
    formIsValid: editedMeal ? true : false,
  });

  const toggleMenuHandler = (menuChoice) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: menuChoice,
      isValid: true,
      input: 'menu',
    });
  };

  const toggleModalHandler = () => {
    setModalVisible(!modalVisible);
  };

  const pushToAllergensHandler = (newAllergen) => {
    if (formState.inputValues.allergens.includes(newAllergen)) {
      const filteredAllergens = formState.inputValues.allergens.filter(
        (allergen) => allergen !== newAllergen
      );
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: filteredAllergens,
        input: 'allergens',
        isValid: true,
      });
    } else {
      const newAllergens = [...formState.inputValues.allergens, newAllergen];
      const sortedAllergens = newAllergens.sort((a, b) => (a > b ? 1 : -1));
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: sortedAllergens,
        input: 'allergens',
        isValid: true,
      });
    }
  };

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  const submitHandler = useCallback(() => {
    if (modalVisible) {
      setModalVisible(false);
    }
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        {
          text: 'Okay',
        },
      ]);
      return;
    }
    if (editedMeal) {
      dispatch(
        mealsActions.updateMeal(
          mealId,
          formState.inputValues.menu,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          formState.inputValues.allergens
        )
      );
      props.navigation.goBack();
    } else {
      if (!formState.inputValues.menu) {
        toggleModalHandler();
      } else {
        dispatch(
          mealsActions.createMeal(
            formState.inputValues.menu,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            formState.inputValues.allergens
          )
        );
        props.navigation.goBack();
      }
    }
  }, [dispatch, mealId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <Modal
        toggleModal={toggleModalHandler}
        modalVisible={modalVisible}
        title="Must Choose One:"
      >
        <View style={styles.checkBoxContainer}>
          <CheckBox
            containerStyle={{
              width: '40%',
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            center
            size={14}
            textStyle={{ fontSize: 14 }}
            title={'Breakfast'}
            checked={formState.inputValues.menu === 'breakfast'}
            onPress={() => {
              toggleMenuHandler('breakfast');
              toggleModalHandler();
            }}
          />
          <CheckBox
            containerStyle={{
              width: '40%',
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            center
            size={14}
            textStyle={{ fontSize: 14 }}
            title={'Lunch'}
            checked={formState.inputValues.menu === 'lunch'}
            onPress={() => {
              toggleMenuHandler('lunch');
              toggleModalHandler();
            }}
          />
        </View>
      </Modal>
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
              checked={formState.inputValues.menu === 'breakfast'}
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
              checked={formState.inputValues.menu === 'lunch'}
              onPress={() => toggleMenuHandler('lunch')}
            />
          </View>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => textChangeHandler('title', text)}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => textChangeHandler('imageUrl', text)}
            autoCapitalize="sentences"
            returnKeyType="next"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => textChangeHandler('description', text)}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
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
                checked={formState.inputValues.allergens.includes(allergen)}
                onPress={() => pushToAllergensHandler(allergen)}
              />
            ))}
          </View>
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
