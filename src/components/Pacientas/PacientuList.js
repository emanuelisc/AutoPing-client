import React, { Component  } from 'react';
import { TouchableWithoutFeedback, Text, View, ListView, FlatList  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, Card, CardSection, FullHeightCard, BigButton } from '../common'; 
import { ListItem } from 'react-native-material-ui';
import Header from '../Header';

class PacientoPaieska extends Component  {

  render() {
    // inside your render function
    return (
      <View style={{ flex: 1}}>
      <Header title={this.props.title} />
<Card>
  <FlatList style={{ flex: 1 }}>
  <View>
      <ListItem
      container={{ height: 50 }}
        divider
        centerElement={{
          primaryText: 'Primary text',
        }}
        onPress={() => {}}
      />
    </View>
    <View>
      <ListItem
        divider
        centerElement={{
          primaryText: 'Primary text',
        }}
        onPress={() => {}}
      />
    </View>
    <View>
      <ListItem
        divider
        centerElement={{
          primaryText: 'Primary text',
        }}
        onPress={() => {}}
      />
    </View>
    <View>
      <ListItem
        divider
        centerElement={{
          primaryText: 'Primary text',
        }}
        onPress={() => {}}
      />
    </View>
    <View>
      <ListItem
        divider
        centerElement={{
          primaryText: 'Primary text',
        }}
        onPress={() => {}}
      />
    </View>

      </FlatList>
      </Card>
      </View>
    );
  }

}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default PacientoPaieska;
