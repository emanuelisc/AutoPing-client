import React, { Component } from 'react';
import { ListView, Text, View, ScrollView, Picker, Switch, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, CardSection, FullHeightCard, Card, BigButton, Button, Input } from '../common'; 
import { BottomNavigation } from 'react-native-material-ui';
import Header from '../Header';

class NaujasPacientas extends Component {

  constructor() {
    super();
    this.state = { name: null, id: null, ip: null, description: null, interval: "5", id: null, loading: false, laik: 0,  error: '', update: 0 };
  }

  onPagrindinis() {
    Actions.mainWindow();
  }

  onPaieska() {
    Actions.pacientoPaieska();
    this.setState({ active: 'people' });
  }
 
  onNustatymai() {
    Actions.nustatymai();
    this.setState({ active: 'settings' });
  }

  componentWillMount() {

    this.setState({ name : this.props.nameText, description : this.props.descriptionText, ip : this.props.ipText, id : this.props.idText, interval : this.props.intervalText, update: this.props.updateText })

    AsyncStorage.getItem('address').then((address) => {
      if(!address) {
        this.setState({ address: 'https://tpa.shop4dev.com/api/' });

      } else {
        this.setState({ address: address });
      }
    });
  //this.setState({ vardas : this.props.vardas, surname : this.props.surname, year : this.props.year, email : this.props.email })
}


addPatient() {
  this.setState({ error: '', loading: true })
  AsyncStorage.getItem('token').then((token) => {
    if(this.state.update === 0) {
      console.log('Add Patient');
      this.addFunction(token);
    } else {
      console.log('Update Patient');
      this.updateFunction(token);
    }
  });
}

updateFunction(token){
  fetch(this.state.address + 'urls/' + this.state.id, {
    method: 'PUT',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({
      name: this.state.name,
      ip: this.state.ip,
      description: this.state.description,
      interval: this.state.interval
    })
  })
  .then((response) => {
    if (response.ok) {
      return response;
    } else {
      Alert.alert('Bad Data!');
      this.setState({ error: '', loading: false })
      // Actions.register();
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    this.setState({ error: '', loading: false })
    Alert.alert('Website Updated!'),
    Actions.webList();
  })
  .catch(() => {
    Alert.alert('Bad Data!');
  });
}

addFunction(token){
  fetch(this.state.address + 'urls', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({
      name: this.state.name,
      ip: this.state.ip,
      description: this.state.description,
      interval: this.state.interval
    })
  })
  .then((response) => {
    // console.log(response);
    if (response.status === 201) {
      return response;
    } else {
      Alert.alert('Bad Data!');
      this.setState({ error: '', loading: false })
      // Actions.register();
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    this.setState({ error: '', loading: false })
    Alert.alert('Website added!'),
    Actions.webList();
  })
  .catch(() => {
    Alert.alert('Bad Data!');
  });
}

deleteUrl(){
  this.setState({ error: '', loading: true })
  AsyncStorage.getItem('token').then((token) => {
      console.log('Add Patient');
      fetch(this.state.address + 'urls/' + this.state.id, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
      })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          this.setState({ error: '', loading: false })
          Alert.alert('Website deleted!'),
          Actions.webList();
        } else {
          Alert.alert('Bad Data!');
          this.setState({ error: '', loading: false })
          // Actions.register();
        }
      })
      .catch(() => {
        Alert.alert('Bad Data!');
      });
  });
}

deleteButton(){
  if(this.state.update === 1) {
    return (
      <CardSection style={{ paddingBottom: 15, paddingTop: 30 }}>
        <Button onPress={this.deleteUrl.bind(this)} >
          Delete Website
        </Button>
      </CardSection>
    );
  } else {
    return;
  }
}

async saveItem(item, selectedValue) {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.error('AsyncStorage error: ' + error.message);
  }
}


  render() {
    return (
      <View style={{ flex: 1 }}>
      <Header title={this.props.title} backIco="arrow-back" />
        <ScrollView>
          <Card>
          <CardSection>
            

          <View>
            <CardSection>
              <Input
                label="Name"
                placeholder="name"
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
                // onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
              />
            </CardSection>
            <CardSection>
            <Input
                label="Address"
                placeholder="address or ip"
                value={this.state.ip}
                onChangeText={(ip) => this.setState({ip})}
                // onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
              />
            </CardSection>
            <CardSection>
            <Input
                label="Description"
                placeholder="short description"
                value={this.state.description}
                onChangeText={(description) => this.setState({description})}
                // onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
              />
            </CardSection>
            <CardSection>
            <Text style={styles.labelStyle}>Time between ping's in minutes</Text>
              <Picker
                selectedValue={this.state.interval}
                style={styles.inputStyle}
                onValueChange={(itemValue, itemIndex) => this.setState({interval: itemValue})}
                mode='dropdown'
              >
                <Picker.Item label="5" value="5" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="45" value="45" />
                <Picker.Item label="60" value="60" />
                <Picker.Item label="120" value="120" />
                <Picker.Item label="1440 (1 day)" value="1440" />
                <Picker.Item label="2880 (2 day)" value="2880" />
                <Picker.Item label="7200 (5 day)" value="7200" />
                <Picker.Item label="10080 (1 week)" value="10080" />
              </Picker>
            </CardSection>
          </View>


            </CardSection>
            <CardSection style={{ paddingBottom: 15, paddingTop: 30 }}>
            <Button onPress={this.addPatient.bind(this)} >
                Save Website
              </Button>
              </CardSection>
                {this.deleteButton()}
          </Card>

        </ScrollView>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    height: 30,
    paddingVertical: 0,
    flex: 1
  },
  labelStyle: {
    fontSize: 20,
    paddingLeft: 20,
    flex: 2,
    marginTop: 30,
    marginBottom: 15
  }
};

export default NaujasPacientas;
