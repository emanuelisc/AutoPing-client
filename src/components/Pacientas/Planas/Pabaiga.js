import React, { Component } from 'react';
import { Alert, ListView, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, CardSection, FullHeightCard, Card, BigButton, Button, Input } from '../../common'; 
import { BottomNavigation } from 'react-native-material-ui';
import Header from '../../Header';

class Pabaiga extends Component {

  constructor() {
    super();
    this.state = { vardas : null, surname : null, year : null, email : null, loading : false, error: '' };
  }

  componentWillMount() {
      AsyncStorage.getItem('address').then((address) => {
        if(!address) {
          this.setState({ address: 'https://tpa.shop4dev.com/api/' });
  
        } else {
          this.setState({ address: address });
        }
      });
    this.setState({ vardas : this.props.vardas, surname : this.props.surname, year : this.props.year, email : this.props.email })
  }


  addPatient() {
    this.setState({ error: '', loading: true })
    console.log('Add Patient');
    AsyncStorage.getItem('token').then((token) => {
      fetch(this.state.address + 'patient', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer' + token },
        body: JSON.stringify({
          name: this.state.vardas,
          surname: this.state.surname,
          email: this.state.email,
          year: this.state.year
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
        Alert.alert('Paciento duomenys išsaugoti!'),
        Actions.main();
      })
      .catch(() => {
        Alert.alert('Blogi duomenys!');
      });
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
<View style={{ flex: 1 }}>
      <Header title={this.props.title} backIco="arrow-back" />
        <ScrollView>
          <Card>
          <CardSection>
            

          <View>
            <CardSection>
              <Text>{this.props.vardas} {this.props.surname}</Text>
            </CardSection>
          </View>


            </CardSection>
            <CardSection style={{ paddingBottom: 15, paddingTop: 30 }}>
            <Button>
                Eksportuoti į .doc
              </Button>
              <Button onPress={this.addPatient.bind(this)} >
                Išsaugoti pacientą
              </Button>
              <Button>
                Siųsti email
              </Button>
              </CardSection>
          </Card>

        </ScrollView>
      </View>
    );
  }
}

export default Pabaiga;
