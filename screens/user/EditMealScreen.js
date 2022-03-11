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
  }
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
      imageURl: editedMeal ? editedMeal.imageUrl : '',
      description: editedMeal ? editedMeal.description : '',
      allergens: editedMeal ? editedMeal.allergens : [],
    },
    inputValidities: {
      menu: editedMeal ? true : false,
      title: editedMeal ? true : false,
      imageUrl: editedMeal ? true : false,
      description: editedMeal ? true : false,
      allergens: editedMeal ? true : false,
    },
    formIsValid: editedMeal ? true : false,
  });

  // const [menu, setMenu] = useState(editedMeal ? editedMeal.menu : null);
  // const [title, setTitle] = useState(editedMeal ? editedMeal.title : '');
  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [imageUrl, setImageUrl] = useState(
  //   editedMeal ? editedMeal.imageUrl : ''
  // );
  // const [description, setDescription] = useState(
  //   editedMeal ? editedMeal.description : ''
  // );
  // const [allergensArr, setAllergensArr] = useState(
  //   editedMeal ? editedMeal.allergens : []
  // );

  const toggleMenuHandler = (menuChoice) => {
    setMenu(menuChoice);
  };

  const toggleModalHandler = () => {
    setModalVisible(!modalVisible);
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

  const titleChangeHandler = (text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: 'title',
    });
  };

  const submitHandler = useCallback(() => {
    if (modalVisible) {
      setModalVisible(false);
    }
    if (!titleIsValid) {
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
          menu,
          title,
          imageUrl,
          description,
          allergensArr,
          titleIsValid
        )
      );
      props.navigation.goBack();
    } else {
      if (!menu) {
        toggleModalHandler();
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
        props.navigation.goBack();
      }
    }
  }, [dispatch, mealId, menu, title, imageUrl, description, allergensArr]);

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
            checked={menu === 'breakfast'}
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
            checked={menu === 'lunch'}
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
            onChangeText={titleChangeHandler}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!titleIsValid && <Text>Please enter a valid title!</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            autoCapitalize="sentences"
            returnKeyType="next"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
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
                checked={allergensArr.includes(allergen)}
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
