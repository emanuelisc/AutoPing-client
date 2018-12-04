import React, { Component } from 'react';
import { ListView, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BottomNavigation } from 'react-native-material-ui';
import { CenterSection, FullHeightCard, BigButton } from '../common'; 
import Header from '../Header';

class Nustatymai extends Component {

  onAuthenticate() {
    Actions.Authentication();
  }
  
  onLogOut() {
    Actions.atsijungti();
  }

  onPagrindinis() {
    Actions.mainWindow();
  }

  onDuomenys() {
    Actions.server();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header title={this.props.title}
        backIco="arrow-back"
        />
      <ScrollView>
        {/* <CenterSection> */}
          <BigButton onPress={this.onDuomenys.bind(this)}>Server Address</BigButton>
          <BigButton onPress={this.onLogOut.bind(this)}>Log Out</BigButton>
          <BigButton onPress={this.onAuthenticate.bind(this)}>Test settings!</BigButton>
        {/* </CenterSection> */}
        </ScrollView>

      </View>
    );
  }
}

export default Nustatymai;
