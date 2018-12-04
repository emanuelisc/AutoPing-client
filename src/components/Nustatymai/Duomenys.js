import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import { Actions } from 'react-native-router-flux';
import { Button, BottomNavigation } from 'react-native-material-ui';
import Header from '../Header';
// import styles from './styles';

class Duomenys extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null, address: null };
  }

  componentWillMount() {
    AsyncStorage.getItem('address').then((address) => {
      if(!address) {
        this.setState({ address: 'https://tpa.shop4dev.com/api/' });
        this.saveItem('address', this.state.address);
      } else {
        this.setState({ address: address });
      }
    });
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('surname');
      Alert.alert('Sėkmingai atsijungėte!');
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

  saveAddress() {
    this.saveItem('address', this.state.address);
    this.setState({ address: address });
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
      <Header title={this.props.title} search={false} backIco="arrow-back" />
      <ScrollView>
        <View>
          <Text style={styles.kitasText}>Change server address?</Text>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>App my not work with wrong address!</Text>
        </View>
        <View>
          <TextInput 
              editable={true}
              onChangeText={(address) => this.setState({address})}
              placeholder='https://address.tld/api'
              ref='address'
              returnKeyType='next'
              value={this.state.address}
              blurOnSubmit
              style={inputStyles.textStyle}
            />
          <TouchableOpacity onPress={this.saveAddress.bind(this)}>
            <Button 
              onPress={this.saveAddress.bind(this)} 
              primary 
              raised 
              text="Save"
              style={{
                container: styles.buttonContainer,
                text: styles.buttonText
              }}
              />
              </TouchableOpacity>
            </View>
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
    textAlign: 'center',
    marginLeft: 30, 
    marginRight: 30,
    marginTop: 60
  }
};

const inputStyles = {
  textStyle: {
    fontSize: 18,
    borderBottomColor: '#B4B4B4',
    borderBottomWidth: 1,
    marginLeft: 30,
    marginRight: 30
  }
};

export default Duomenys;
