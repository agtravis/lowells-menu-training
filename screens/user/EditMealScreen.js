import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const EditMealScreen = (props) => {
  console.log(props.navigation.getParam('mealId'));
  return (
    <View style={styles.container}>
      <Text>THE EDIT MEALS SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default EditMealScreen;
