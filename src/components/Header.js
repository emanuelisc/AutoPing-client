import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Toolbar } from 'react-native-material-ui';

class Header extends Component {

  onBack() {
    Actions.pop();
  }

  render() {
    return (
      <Toolbar
        leftElement={this.props.backIco}
        centerElement={this.props.title}
        searchable={this.props.searchable}
        rightElement={{
            menu: {
                icon: "more-vert",
                labels: ["Informacija", "DUK", "Privatumo Politika", "Praneškite apie klaidą"]
            }
        }}
        onLeftElementPress={() => { this.onBack() }}
        onRightElementPress={ (label) => { console.log(label) }}
      />
    );
  }
}

export default Header;
