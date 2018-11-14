import React from 'react';
import { Text, View, Image, TouchableOpacity, Icon } from 'react-native';

const BackButton = ({ onPress, children }) => {

  return (
    <View style={{paddingHorizontal: 5, paddingVertical: 7}}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => Actions.pop()}>
          <Icon
            name="arrow-left"
            size={20}
            color="#e67e22" />
        </TouchableOpacity>
        </View>
  );
};


export { BackButton };
