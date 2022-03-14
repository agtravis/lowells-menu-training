import React, { useEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import * as mealsActions from '../../store/actions/meals';
import Allergens from '../../constants/Allergens';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const SUBMIT_ATTEMPTED = 'SUBMIT_ATTEMPTED';

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
      ...state,
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  if (action.type === SUBMIT_ATTEMPTED) {
    return {
      ...state,
      submitAttempted: true,
    };
  }
  return state;
};

const EditMealScreen = (props) => {
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
    submitAttempted: false,
  });

  const toggleMenuHandler = (menuChoice) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: menuChoice,
      isValid: true,
      input: 'menu',
    });
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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input(s)!', 'Please check the errors in the form', [
        {
          text: 'Okay',
        },
      ]);
      if (!formState.inputValues.menu) {
        dispatchFormState({
          type: SUBMIT_ATTEMPTED,
        });
      }
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
    }
    props.navigation.goBack();
  }, [dispatch, dispatchFormState, mealId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
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
            {formState.inputValidities.menu === false &&
              formState.submitAttempted && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Must select one!</Text>
                </View>
              )}
          </View>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedMeal ? editedMeal.title : ''}
            initiallyValid={!!editedMeal}
            required
            submitAttempted={formState.submitAttempted}
          />
          <Input
            id="imageUrl"
            label="Image URL"
            errorText="Please enter a valid URL!"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedMeal ? editedMeal.imageUrl : ''}
            initiallyValid={!!editedMeal}
            required
            submitAttempted={formState.submitAttempted}
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            autoCapitalize="sentences"
            onInputChange={inputChangeHandler}
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editedMeal ? editedMeal.description : ''}
            initiallyValid={!!editedMeal}
            required
            minLength={5}
            submitAttempted={formState.submitAttempted}
          />
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
    </KeyboardAvoidingView>
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
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: 'ubuntu',
  },
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
