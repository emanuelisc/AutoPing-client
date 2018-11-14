import React from 'react';
import { View } from 'react-native';

const FullHeightCard = (props) => {
   return (
     <View style={styles.containerStyle}>
      {props.children}
     </View>
   );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
  }
};

export { FullHeightCard };
