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
    Actions.duomenys();
  }

  onGydytojas() {
    Actions.gydytojas();
  }

  onNaujas() {
    Actions.naujasPacientas();
    this.setState({ active: 'today' });
  }

  onPaieska() {
    Actions.pacientoPaieska();
    this.setState({ active: 'people' });
  }

  onNustatymai() {
    Actions.nustatymai();
    this.setState({ active: 'settings' });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header title={this.props.title}
        backIco="arrow-back"
        />
      <ScrollView>
        {/* <CenterSection> */}
          <BigButton onPress={this.onNaujas.bind(this)}>Dantų formulė</BigButton>
          <BigButton onPress={this.onNaujas.bind(this)}>Paslaugų kainos</BigButton>
          <BigButton onPress={this.onNaujas.bind(this)}>Programos išvaizda</BigButton>
          <BigButton onPress={this.onGydytojas.bind(this)}>Gydytojo duomenys</BigButton>
          <BigButton onPress={this.onDuomenys.bind(this)}>Duomenų saugojimas</BigButton>
          <BigButton onPress={this.onLogOut.bind(this)}>Atsijungti</BigButton>
          <BigButton onPress={this.onAuthenticate.bind(this)}>Testiniai nustatymai!</BigButton>
        {/* </CenterSection> */}
        </ScrollView>

      
      <BottomNavigation hidden={false} style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <BottomNavigation.Action
            key="today"
            icon="today"
            label="Pagrindinis"
            onPress={this.onPagrindinis.bind(this)}
        />
        <BottomNavigation.Action
            key="people"
            icon="people"
            label="Pacientai"
            onPress={this.onPaieska.bind(this)}
        />
        <BottomNavigation.Action
            key="settings"
            icon="settings"
            label="Nustatymai"
            onPress={this.onNustatymai.bind(this)}
        />
    </BottomNavigation>

      </View>
    );
  }
}

export default Nustatymai;
