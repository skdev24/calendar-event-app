import React from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  cardMain: {
    position: 'absolute',
    top: 100,
    width: 327,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    zIndex: 1000,
    elevation: 1000
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

// = ({ isModalVisible, children }) =>
export default class Task extends React.Component {
  render() {
    const { isModalVisible, children, setModalVisible } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={() => null}
      >
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
          style={[
            styles.container,
            {
              ...Platform.select({
                android: {
                  // paddingTop: shouldMove ? 240 : null,
                }
              })
            }
          ]}
        >
          <View style={styles.cardMain}>{children}</View>
        </Pressable>
      </Modal>
    );
  }
}
