import React from 'react';
import { Alert, Modal, StyleSheet, Text, View, Button } from 'react-native';

import Colors from '../../constants/Colors';

const CustomModal = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        props.toggleModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextHeader}>{props.title}</Text>
          <View style={styles.modalContentContainer}>{props.children}</View>
          <Button
            title="Close"
            color={Colors.primary}
            onPress={() => props.toggleModal()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.accent,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContentContainer: {
    padding: 5,
    marginBottom: 15,
    width: '95%',
  },
  modalTextHeader: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomModal;
