import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator 
        size='large'
      />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  }
};

export { Spinner };
