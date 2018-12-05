import React, { Component  } from 'react';
import { Alert, TouchableWithoutFeedback, TouchableOpacity, Text, View, ListView, ScrollView, ActivityIndicator, FlatList, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CenterSection, Card, CardSection, FullHeightCard, BigButton } from '../common'; 
// import { ListItem } from 'react-native-material-ui';
import { List, ListItem, SearchBar } from 'react-native-elements';
import Header from '../Header';
// import ListItem from './ListItem';

class PacientoPaieska extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      address: null,
    };

    this.arrayholder = [];
  }

  // componentDidMount() {
  //   this.makeRemoteRequest();
  // }

  // makeRemoteRequest = () => {
  //   const url = `https://randomuser.me/api/?&results=20`;
  //   const url = `https://tpa.shop4dev.com/api/patients`;
  //   this.setState({ loading: true });

  //   fetch(url)
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({
  //         data: res.results,
  //         error: res.error || null,
  //         loading: false,
  //       });
  //       this.arrayholder = res.results;
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };


  componentDidMount() {
    AsyncStorage.getItem('address').then((address) => {
      if(!address) {
        this.setState({ address: 'https://tpa.shop4dev.com/api/' });

      } else {
        this.setState({ address: address });
      }
    });
    
    AsyncStorage.getItem('token').then((token) => {
      fetch(this.state.address + 'urls', {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
      })
      // .then((response) => response.json())
      .then((response) => {
        // In this case, we check the content-type of the response
        // console.log(response.headers.get('content-type'));
        // if (response.headers.get('content-type').match(/application\/json/)) {
          return response.json();
        // }
        // return response;
        // You can also try "return response.text();"
       })
      .then((datas) => {
        console.log(datas);
        this.setState({ data : datas });
        this.arrayholder = datas;

      })
      .done();
    })
  }

  openWeb(){

  }

  renderRow(patient){
    // console.log(employee);
    // return <Text>{employee.name}</Text>
    return <ListItem patient={patient.item} />;
  }
  

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.toUpperCase()} ${item.ip.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    // inside your render function
    return (
      <View style={{ flex: 1}}>
      <Header title={this.props.title}
        backIco="arrow-back"
        />
      <ScrollView>
      <SearchBar        
        placeholder="Search"        
        lightTheme        
        round        
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}             
      />    
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList          
          data={this.state.data}          
          renderItem={({ item }) => ( 
            // <TouchableOpacity onPress={this.openWeb.bind(this)}>
              <ListItem              
                roundAvatar              
                title={`${item.name} ${item.ip}`}  
                // subtitle={item.email}                           
                // avatar={{ uri: item.picture.thumbnail }}   
                onPress={() => {
                                    console.log(item.id);
                  Actions.newWeb({ idText: item.id, nameText: item.name, descriptionText: item.description, intervalText: item.interval, ipText: item.ip, updateText: 1 });
                }}
                containerStyle={{ borderBottomWidth: 0 }} 
              />          
            // </TouchableOpacity>
          )}          
          keyExtractor={item => item.id.toString()}  
          ItemSeparatorComponent={this.renderSeparator} 
          ListHeaderComponent={this.renderHeader}                             
        />            
      </List>
      </ScrollView>
      </View>
    );
  }

}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default PacientoPaieska;
