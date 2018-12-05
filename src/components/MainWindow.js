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
    Actions.newWeb({ idText: "", nameText: "", descriptionText: "", intervalText: "", ip: "", updateText: 0  });
  }

  onPaieska() {
    Actions.webList();
  }

  onNustatymai() {
    Actions.nustatymai();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header title={this.props.title} search={false} />
      <ScrollView>
        <View>
          <Text style={styles.mainText}>AutoPing</Text>
          <Text style={styles.kitasText}>Welcome!</Text>
          <Text style={styles.kitasText2}>To add website into tracking list, press a button bellow.</Text>
        </View>
        {/* <CenterSection> */}
          <Button 
            raised 
            primary 
            onPress={this.onNaujas.bind(this)} 
            text="Add new website" 
            style={{
              container: styles.buttonContainer,
              text: styles.buttonText
            }}
          />
          <Button 
            raised 
            default 
            onPress={this.onPaieska.bind(this)} 
            text="Website list" 
            style={{
              container: styles.buttonContainer,
              text: styles.buttonText
            }}
          />
          <Button 
            raised 
            default 
            onPress={this.onPaieska.bind(this)} 
            text="Statistics" 
            style={{
              container: styles.buttonContainer,
              text: styles.buttonText
            }}
          />
          <Button 
            raised 
            accent 
            onPress={this.onNustatymai.bind(this)} 
            text="Settings" 
            style={{
              container: styles.buttonContainer,
              text: styles.buttonText
            }}
          />
        {/* </CenterSection> */}
        </ScrollView>

      
      <BottomNavigation hidden={false} style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <BottomNavigation.Action
            key="today"
            icon="today"
            label="Main"
            // onPress={this.onPaieska.bind(this)}
        />
        <BottomNavigation.Action
            key="people"
            icon="people"
            label="Statistics"
            onPress={this.onPaieska.bind(this)}
        />
        <BottomNavigation.Action
            key="settings"
            icon="settings"
            label="Settings"
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
    marginBottom: 15,
    textAlign: 'center'
  },
  kitasText2: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  buttonText: {
    fontSize: 18
  },
  buttonContainer: {
    marginBottom: 15,
    marginTop: 15,
    paddingBottom: 25,
    paddingTop: 25,
    marginLeft: 100,
    marginRight: 100
  }
};


export default MainWindow;
