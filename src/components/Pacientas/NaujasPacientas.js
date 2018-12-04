import React, { Component } from 'react';
import { ListView, Text, View, ScrollView, Picker, Switch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, CardSection, FullHeightCard, Card, BigButton, Button, Input } from '../common'; 
import { BottomNavigation } from 'react-native-material-ui';
import Header from '../Header';

class NaujasPacientas extends Component {

  constructor() {
    super();
    this.state = { vardas: null, surname: null, year: null, email: null, loading: false, laik: 0,  error: '' };
  }

  onButtonPress() {
    Actions.lygis1({ vardas : this.state.vardas, surname : this.state.surname, year : this.state.year, email : this.state.email });
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
                value={this.state.vardas}
                onChangeText={(vardas) => this.setState({vardas})}
                // onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
              />
            </CardSection>
            <CardSection>
            <Input
                label="Address"
                placeholder="address or ip"
                value={this.state.surname}
                onChangeText={(surname) => this.setState({surname})}
                // onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
              />
            </CardSection>
            <CardSection>
            <Text style={styles.labelStyle}>Time between ping's in minutes</Text>
              <Picker
                selectedValue={this.state.laik}
                style={styles.inputStyle}
                onValueChange={(itemValue, itemIndex) => this.setState({laik: itemValue})}
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
            <Button onPress={this.onButtonPress.bind(this)} >
                Save Website
              </Button>
              </CardSection>
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
