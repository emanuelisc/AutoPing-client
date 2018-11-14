import React, { Component } from 'react';
import { ListView, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, CardSection, FullHeightCard, Card, BigButton, Button, Input } from '../../common'; 
import { BottomNavigation } from 'react-native-material-ui';
import Header from '../../Header';

class Lygis1 extends Component {

  constructor() {
    super();
    this.state = { vardas : null, surname : null, year : null, email : null, loading : false, error: '' };
  }

  componentWillMount() {
    this.setState({ vardas : this.props.vardas, surname : this.props.surname, year : this.props.year, email : this.props.email })
  }

  onButtonPress() {
    Actions.pabaiga({ vardas : this.state.vardas, surname : this.state.surname, year : this.state.year, email : this.state.email });
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
            <Button onPress={this.onButtonPress.bind(this)} >
                Toliau
              </Button>
              </CardSection>
          </Card>

        </ScrollView>
      </View>
    );
  }
}

export default Lygis1;
