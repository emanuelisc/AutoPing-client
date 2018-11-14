import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { FullHeightCard, CenterSection, BigButton, Input, Spinner } from '../common';
import { Button } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = { name: null, surname: null, username: null, activation_code: null, password_confirmation: null, password: null, loading: false, error: '', address: null };
  }

  componentWillMount(){
    AsyncStorage.getItem('address').then((address) => {
      if(!address) {
        this.setState({ address: 'http://s2.shop4dev.com:2081/' });
        this.saveItem('address', this.state.address);
      } else {
        this.setState({ address: address });
      }
    });
  }

  onLogin() {
    Actions.login();
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <View>
      <TouchableOpacity onPress={this.userSignup.bind(this)}>
            <Button 
              onPress={this.userSignup.bind(this)} 
              primary 
              raised 
              text="Register"
              style={{
                container: styles.buttonContainer,
                text: styles.buttonText
              }}
              />
              </TouchableOpacity>
              <Text style={styles.questionText}>Already have an account?</Text>
              <TouchableOpacity onPress={this.onLogin.bind(this)}>
            <Button 
              onPress={this.onLogin.bind(this)} 
              default
              raised
              text="Login"
              style={{
                container: styles.buttonContainerRed,
                text: styles.buttonTextRed
              }}
            />
            </TouchableOpacity> 
            </View>
    );
  }

  userSignup() {
    this.setState({ error: '', loading: true })
    console.log('signup');
    if (!this.state.username || !this.state.password) return;
    fetch(this.state.address + 'users', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.username,
        activation_code: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      })
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        Alert.alert('Bad credentials!');
        this.setState({ error: '', loading: false })
        // Actions.register();
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ error: '', loading: false })
      this.saveItem('token', responseData.token),
      this.saveItem('username', this.state.username),
      this.saveItem('password', this.state.password),
      Alert.alert('Login successful!', responseData.token),
      Actions.main();
    })
    .catch(() => {
      Alert.alert('Bad credentials!');
    });
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  render () {
    return (
      <FullHeightCard>
        <CenterSection>
          <Text style={styles.mainText}> AutoPing </Text>

          <View>

            <TextInput 
              editable={true}
              onChangeText={(username) => this.setState({username})}
              placeholder='Email'
              ref='username'
              returnKeyType='next'
              value={this.state.username}
              blurOnSubmit
              style={inputStyles.textStyle}
            />
            <TextInput 
              editable={true}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password'
              ref='password'
              secureTextEntry={true}
              returnKeyType='next'
              value={this.state.password}
              blurOnSubmit
              style={inputStyles.textStyle}
            />
            <TextInput 
              editable={true}
              onChangeText={(password_confirmation) => this.setState({password_confirmation})}
              placeholder='Password repeat'
              ref='password_confirmation'
              secureTextEntry={true}
              returnKeyType='next'
              value={this.state.password_confirmation}
              blurOnSubmit
              style={inputStyles.textStyle}
            />
            {this.renderButton()}
          </View>
        </CenterSection>
      </FullHeightCard>
    );
  }
}

const styles = {
  questionText: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 10
  },
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
    paddingRight: 45
  },
  buttonContainerRed: {
    marginBottom: 60,
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 45,
    paddingRight: 45,
    borderColor: '#F7412D',
    borderWidth: 1
  },
  buttonTextRed: {
    fontSize: 22,
    color: '#F7412D'
  }
};

const inputStyles = {
  textStyle: {
    fontSize: 18,
    borderBottomColor: '#B4B4B4',
    borderBottomWidth: 1
  }
};

export default RegisterForm;
