import React from 'react';
import { View } from 'react-native';

const CenterSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 1,
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CenterSection };
