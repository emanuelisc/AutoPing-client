import React, { Component } from 'react';
import { ListView, Text, View, Avatar, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, FullHeightCard, BigButton } from './common'; 
import { Drawer, BottomNavigation, Card, Toolbar, Button } from 'react-native-material-ui';
import Header from './Header';

class MainWindow extends Component {

  onAuthenticate() {
    Actions.Authentication();
  }

  onNaujas() {
    Actions.naujas();
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
      <Header title={this.props.title} search={false} />
      <ScrollView>
        <View>
          <Text style={styles.mainText}>TPA</Text>
          <Text style={styles.kitasText}>Sveiki atvyke!</Text>
        </View>
        {/* <CenterSection> */}
          <BigButton onPress={this.onNaujas.bind(this)}>Naujas Pacientas</BigButton>
          <BigButton onPress={this.onPaieska.bind(this)}>Ieškoti</BigButton>
          <BigButton onPress={this.onNustatymai.bind(this)}>Nustatymai</BigButton>
        {/* </CenterSection> */}
        </ScrollView>

      
      <BottomNavigation hidden={false} style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <BottomNavigation.Action
            key="today"
            icon="today"
            label="Pagrindinis"
            // onPress={this.onPaieska.bind(this)}
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

const styles = {
  mainText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center'
  },
  kitasText: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: 'center'
  }
}

export default MainWindow;
