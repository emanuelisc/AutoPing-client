import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import { Actions } from 'react-native-router-flux';
import { Button, BottomNavigation } from 'react-native-material-ui';
import Header from '../Header';
// import styles from './styles';

class GydytojoDuomenys extends Component {
  constructor() {
    super();
    this.state = { username: null, name: null, surname: null, password_confirmation: null, password: null, address: null };
  }

  componentWillMount() {
    AsyncStorage.getItem('address').then((address) => {
      if(!address) {
        this.setState({ address: 'https://tpa.shop4dev.com/api/' });
      } else {
        this.setState({ address: address });
      }
    });

    AsyncStorage.getItem('username').then((username) => {
      AsyncStorage.getItem('name').then((name) => {
        AsyncStorage.getItem('surname').then((surname) => {
          AsyncStorage.getItem('password').then((password) => {
            this.setState({ username, name, surname, password, password_confirmation : password });
          });
        });
      });
    });
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

  updateUser() {
    this.setState({ error: '', loading: true });
    console.log('update');
    AsyncStorage.getItem('token').then((token) => {
      fetch(this.state.address + 'update', {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer' + token },
        body: JSON.stringify({
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.username,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        })
      })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          Alert.alert('Blogi duomenys!');
          this.setState({ error: '', loading: false })
          // Actions.register();
        }
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ error: '', loading: false })
        this.saveItem('username', this.state.username),
        this.saveItem('password', this.state.password),
        this.saveItem('name', this.state.name),
        this.saveItem('surname', this.state.surname),
        Alert.alert('Duomenys sėkmingai išsaugoti!'),
        Actions.main();
      })
      .catch(() => {
        Alert.alert('Blogi duomenys!');
      });
    })
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
      <View style={{ flex: 1 }}>
      <Header title={this.props.title} search={false} backIco="arrow-back" />
      <ScrollView>
        <View>
          <Text style={styles.mainText}></Text>
          <Text style={styles.kitasText}>Redaguoti gydytojo duomenis</Text>
        </View>
        <View>
          <TextInput 
              editable={true}
              onChangeText={(name) => this.setState({name})}
              placeholder='Vardas'
              ref='name'
              returnKeyType='next'
              value={this.state.name}
              blurOnSubmit
              style={inputStyles.textStyle}
            />
            <TextInput 
              editable={true}
              onChangeText={(surname) => this.setState({surname})}
              placeholder='Pavardė'
              ref='surname'
              returnKeyType='next'
              value={this.state.surname}
              blurOnSubmit
              style={inputStyles.textStyle}
            />
                      <TextInput 
              editable={true}
              onChangeText={(username) => this.setState({username})}
              placeholder='email@gmail.com'
              ref='username'
              returnKeyType='next'
              value={this.state.username}
              blurOnSubmit
              style={inputStyles.textStyle}
            />
          <TouchableOpacity onPress={this.updateUser.bind(this)}>
            <Button 
              onPress={this.updateUser.bind(this)} 
              primary 
              raised 
              text="Pakeisti"
              style={{
                container: styles.buttonContainer,
                text: styles.buttonText
              }}
              />
              </TouchableOpacity>
            </View>
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
    marginRight: 30
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

export default GydytojoDuomenys;
