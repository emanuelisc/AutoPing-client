import React, { Component } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { FullHeightCard, CenterSection, Spinner } from '../common';
import { Button } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class LoadingPage extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null, loading: false, error: '', address: null };
  }

  componentWillMount(){
    // AsyncStorage.removeItem('address');
    // AsyncStorage.getItem('address').then((address) => {
      // if(!address) {
        // this.setState({ address: 'http://s2.shop4dev.com:2081/' });
        // this.saveItem('address', this.state.address);
        // this.saveItem('address', 'http://s2.shop4dev.com:2081/');
    //   } else {
    //     this.setState({ address: address });
    //   }
    // });


    this.setState({ address: 'http://192.168.0.131:80/' });
    this.saveItem('address', 'http://192.168.0.131:80/');
  }

  componentDidMount() {                   
    console.log('load');
    AsyncStorage.getItem('username').then((username) => {
      if(!username) {
        Actions.login();
      } else {
        AsyncStorage.getItem('password').then((password) => {
          body = JSON.stringify({
            email: username,
            password: password,
          })
          fetch(this.state.address + 'authenticate', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: body
          })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              responseData = response.json();
              this.saveItem('token', responseData.token),
              // Alert.alert('Sėkmingai prisijungėte!', responseData.token),
              Actions.main();
            } else {
              // Alert.alert('Blogi prisijungimo duomenys!', response.text());
              this.setState({ error: '', loading: false })
              Actions.login();
            }
          }).done();
      });
     }
    });
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  _retrieveData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        return value;
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  render () {
    return (
      <FullHeightCard>
        <CenterSection>
          <Text style={styles.mainText}> AutoPing </Text>
          <Spinner />
          
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
  }
};


export default LoadingPage;
