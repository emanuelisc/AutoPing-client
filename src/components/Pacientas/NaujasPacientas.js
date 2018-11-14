import React, { Component } from 'react';
import { ListView, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, CardSection, FullHeightCard, Card, BigButton, Button, Input } from '../common'; 
import { BottomNavigation } from 'react-native-material-ui';
import Header from '../Header';

class NaujasPacientas extends Component {

  constructor() {
    super();
    this.state = { vardas: null, surname: null, year: null, email: null, loading: false, error: '' };
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
                label="Vardas"
                placeholder="vardas"
                value={this.state.vardas}
                onChangeText={(vardas) => this.setState({vardas})}
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


            </CardSection>
            <CardSection style={{ paddingBottom: 15, paddingTop: 30 }}>
            <Button onPress={this.onButtonPress.bind(this)} >
                Toliau
              </Button>
              </CardSection>
          </Card>

        </ScrollView>

        <BottomNavigation hidden={false} style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <BottomNavigation.Action
              key="today"
              icon="today"
              label="Pagrindinis"
              onPress={this.onPagrindinis.bind(this)}
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

export default NaujasPacientas;
