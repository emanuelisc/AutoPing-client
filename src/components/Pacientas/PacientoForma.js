import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { CardSection, Input, Card, Button } from '../common'; 

class PacientoForma extends Component {

  constructor() {
    super();
    this.state = { name: null, surname: null, year: null, email: null, loading: false, error: '' };
  }

  render () {
    return (
      <View>
        <CardSection>
          <Input
            label="Vardas"
            placeholder="vardas"
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
            // onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>
        <CardSection>
        <Input
            label="Pavardė"
            placeholder="pavardė"
            value={this.state.surname}
            onChangeText={(surname) => this.setState({surname})}
            // onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
          />
        </CardSection>
        <CardSection>
        <Input
            label="Gimimo metai"
            placeholder="1990-01-01"
            value={this.state.year}
            onChangeText={(year) => this.setState({year})}
            // onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
          />
        </CardSection>
      </View>
    );
  }
}

export default PacientoForma;
