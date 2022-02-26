import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';

const EditMealScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const editedMeal = useSelector((state) =>
    state.meals.meals.find((meal) => meal.id === mealId)
  );

  const [menu, setMenu] = useState(editedMeal ? editedMeal.menu : '');
  const [title, setTitle] = useState(editedMeal ? editedMeal.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedMeal ? editedMeal.imageUrl : ''
  );
  const [description, setDescription] = useState(
    editedMeal ? editedMeal.description : ''
  );
  const [allergens, setAllergens] = useState(
    editedMeal ? editedMeal.allergens.join() : ''
  );

  const compileMeal = () => {
    const newMeal = {
      menu: menu,
      title: title,
      imageUrl: imageUrl,
      description: description,
      allergens: allergens.split(','),
    };
    console.log(newMeal);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Menu</Text>
          <TextInput
            style={styles.input}
            value={menu}
            onChangeText={(text) => setMenu(text)}
          />
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
          <Text style={styles.label}>ImageURL</Text>
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
          <Text style={styles.label}>Allergens</Text>
          <TextInput
            style={styles.input}
            value={allergens}
            onChangeText={(text) => setAllergens(text)}
          />
        </View>
        <Button title="push" onPress={compileMeal} />
      </View>
    </ScrollView>
  );
};

EditMealScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('mealId')
      ? 'Edit Meal'
      : 'Add Meal',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
          onPress={() => {
            console.log('plop');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
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
