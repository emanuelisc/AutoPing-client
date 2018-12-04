import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Card, CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
// import styles from './styles';

class Authentication extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null };
  }

  userSignup() {
    console.log('signup');
    if (!this.state.username || !this.state.password) return;
    fetch('http://tpa.shop4dev.com/public/api/register', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.username,
        email: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.saveItem('id_token', responseData.id_token),
      Alert.alert('Signup Success!', 'Click the button to get a Chuck Norris quote!'),
      Actions.reset('mainWindow');
    })
    .done();
    // Actions.reset('mainWindow');
    // Actions.mainWindow();
  }

  userLogin() {
    console.log('login');
    if (!this.state.username || !this.state.password) return;
    fetch('http://tpa.shop4dev.com/public/api/login', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.saveItem('token', responseData.token),
      Alert.alert('Login Success!', responseData.token),
      Actions.reset('mainWindow');
    })
    .done();
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('surname');
      Alert.alert('Logout Success!!');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  loadPage(){
    Actions.auth();
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
      <Card>

        <Header title={this.props.title} backIco="arrow-back" />
        <CardSection>
          <Text> Welcome </Text>

          <View>
            <TextInput 
              editable={true}
              onChangeText={(username) => this.setState({username})}
              placeholder='Username'
              ref='username'
              returnKeyType='next'
              value={this.state.username}
            />
            <TextInput 
              editable={true}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password'
              ref='password'
              secureTextEntry={true}
              returnKeyType='next'
              value={this.state.password}
            />

            <TouchableOpacity onPress={this.userLogin.bind(this)}>
              <Text> Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.userSignup.bind(this)}>
              <Text> Sign Up </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.userLogout.bind(this)}>
              <Text> Log Out </Text>
            </TouchableOpacity>
          </View>
        </CardSection>
        <CardSection>
          <View>
          <TouchableOpacity onPress={this._retrieveData.bind(this)}>
              <Text> ID </Text>
            </TouchableOpacity>
          </View>
        </CardSection>

                <CardSection>
          <View>
          <TouchableOpacity onPress={this.loadPage.bind(this)}>
              <Text> Load </Text>
            </TouchableOpacity>
          </View>
        </CardSection>
        
      </Card>
    );
  }
}

export default Authentication;
