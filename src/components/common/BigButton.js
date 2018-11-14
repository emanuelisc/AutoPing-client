import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BigButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 0,
    alignSelf: 'stretch',
    backgroundColor: '#007aff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    marginBottom: 15
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 20
  }
};

export { BigButton };
