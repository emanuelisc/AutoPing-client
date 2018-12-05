import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import { Actions } from 'react-native-router-flux';
import { Button, BottomNavigation } from 'react-native-material-ui';
import Header from '../Header';
// import styles from './styles';

class LogOut extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null };
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('surname');
      Alert.alert('Success!');
      Actions.auth();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  loadPage(){
    Actions.auth();
  }

  goBack(){
    Actions.pop();
  }

  onPagrindinis() {
    Actions.mainWindow();
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

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  getProtectedQuote() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('http://192.168.0.131:8000/api/protected/random-quote', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer' + token }
      })
      .then((response) => response.text())
      .then((quote) => {
        Alert.alert('Chuck Norris Quote!', quote)
      })
      .done();
    })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
      <Header title={this.props.title} search={false} backIco="arrow-back" />
      <ScrollView>
        <View>
          <Text style={styles.mainText}></Text>
          <Text style={styles.kitasText}>Do you really want to log out?</Text>
        </View>
        {/* <CenterSection> */}
        <View>
      <TouchableOpacity onPress={this.userLogout.bind(this)}>
            <Button 
              onPress={this.userLogout.bind(this)} 
              primary 
              raised 
              text="Yes"
              style={{
                container: styles.buttonContainer,
                text: styles.buttonText
              }}
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.goBack.bind(this)}>
            <Button 
              onPress={this.goBack.bind(this)} 
              default
              raised
              text="No"
              style={{
                container: styles.buttonContainerRed,
                text: styles.buttonTextRed
              }}
            />
            </TouchableOpacity>
            </View>
        {/* </CenterSection> */}
        </ScrollView>

      </View>
    );
  }
}

const styles = {
  mainText: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingBottom: 60
  },
  buttonText: {
    fontSize: 22
  },
  buttonContainer: {
    marginBottom: 15,
    marginTop: 15,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 45,
    paddingRight: 45,
    marginLeft: 30,
    marginRight: 30
  },
  buttonContainerRed: {
    marginBottom: 60,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 45,
    paddingRight: 45,
    borderColor: '#F7412D',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30
  },
  buttonTextRed: {
    fontSize: 22,
    color: '#F7412D'
  },
  kitasText: {
    fontSize: 26,
    marginBottom: 30,
    textAlign: 'center'
  }
};


export default LogOut;
