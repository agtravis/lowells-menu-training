import React from 'react';
import { Modal, StyleSheet, Text, View, Button } from 'react-native';

import Colors from '../../constants/Colors';

const CustomModal = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextHeader}>{props.title}</Text>
          <View style={styles.modalContentContainer}>{props.children}</View>
          <View style={styles.actions}>
            <View style={styles.button}>
              <Button
                title="Close"
                color={Colors.primary}
                onPress={() => props.toggleModal()}
              />
            </View>
            {props.functionButtonOneTitle && (
              <View style={styles.button}>
                <Button
                  title={props.functionButtonOneTitle}
                  color={Colors.primary}
                  onPress={() => props.functionButtonOneFunction()}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
  },
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
