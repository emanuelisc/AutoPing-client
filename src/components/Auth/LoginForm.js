import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { FullHeightCard, CenterSection, Spinner } from '../common';
import { Button } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null, loading: false, error: '' };
  }

  onRegister() {
    Actions.register();
  }

  componentWillMount(){
    AsyncStorage.getItem('address').then((address) => {
      if(!address) {
        this.setState({ address: 'http://192.168.0.131:80/' });
        this.saveItem('address', this.state.address);
      } else {
        this.setState({ address: address });
      }
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <View>
      <TouchableOpacity onPress={this.userLogin.bind(this)}>
            <Button 
              onPress={this.userLogin.bind(this)} 
              primary 
              raised 
              text="Login"
              style={{
                container: styles.buttonContainer,
                text: styles.buttonText
              }}
              />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onRegister.bind(this)}>
            <Button 
              onPress={this.onRegister.bind(this)} 
              default
              raised
              text="Register"
              style={{
                container: styles.buttonContainerRed,
                text: styles.buttonTextRed
              }}
            />
            </TouchableOpacity>
            </View>
    );
  }

  userLogin() {
    this.setState({ error: '', loading: true })
    console.log('login');
    if (!this.state.username || !this.state.password) return;
    console.log(this.state.username);
    console.log(this.state.password);
    fetch(this.state.address + 'authenticate', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        // username: 'emanuelisc@gmail.com',
        // password: 'pass',
      })
    })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response;
      } else {
        Alert.alert('Bad credentials!');
        this.setState({ error: '', loading: false })
        // Actions.login();
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.setState({ error: '', loading: false }),
      this.saveItem('token', responseData.token),
      this.saveItem('username', this.state.username),
      this.saveItem('password', this.state.password),
      // Alert.alert('Sėkmingai prisijungėte!'),
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

            {this.renderButton()}
          </View>
        </CenterSection>
      </FullHeightCard>
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

export default LoginForm;
