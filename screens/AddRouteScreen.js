import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';

export default class AddRouteScreen extends React.Component {
  // days stored as 0b0[Sun][Mon][Tues][Wed][Thurs][Fri][Sat]
  // 1 = deliver, 0 = not deliver
  constructor(props) {
    super(props);
    this.state = {
      routeName: '',
      addresses: [],
      papers: ['JN', 'DDN', 'NYT', 'WSJ'],
      newAddress: {
        street1: '',
        city: '',
        state: '',
        zip: '',
        newspapers: []
      }
    }
  }
  
  handleNameChange(text) {
    this.setState({
      routeName: text
    });
  }
  async submitRoute(){
    const {routeName, addresses, newAddress} = this.state
    if(routeName && addresses.length > 0) {
      const data = {
        routeId: routeName, 
        recipients: addresses
      }
      const resp = await axios.post('http://10.36.0.92:8080/route', data)
      if (resp.status === 201) {
        Alert.alert(
          'Submit',
          'Your route has been sent to our servers',
          [
            {text: 'OK'}
          ]
        )
      }
    }
    
  }
  handleAddressChange(field, e) {
    const value = e;
    switch (field) {
      case 'street':
        this.setState(prevState => ({
          newAddress: {
            ...prevState.newAddress,
            street1: value
          }
        }));
        break;
      case 'city':
        this.setState(prevState => ({
          newAddress: {
            ...prevState.newAddress,
            city: value
          }
        }));
        break;
      case 'state':
        this.setState(prevState => ({
          newAddress: {
            ...prevState.newAddress,
            state: value.trim()
          }
        }));
        break;
      case 'zip':
        this.setState(prevState => ({
          newAddress: {
            ...prevState.newAddress,
            zip: value.trim()
          }
        }));
        break;
      default: 
        break;
    }
  }
  handlePaperChange(paper) {
    const address = Object.assign({}, this.state.newAddress);
    const paperIdx = address.newspapers.findIndex((data) => data.newspaperCode === paper.newspaperCode)
    if (paperIdx >= 0){
      address.newspapers = address.newspapers.filter((data) => data.newspaperCode !== paper.newspaperCode);
    } else {
      const newPaper = {
        newspaperCode: paper.newspaperCode,
        days: paper.days ? paper.days : null
      }
      address.newspapers.push(newPaper);
    } 
    this.setState({
      newAddress: {...address}
    })
  }
  addNewAddress() {
    const address = Object.assign({}, this.state.newAddress);
    let errMessage = null;
    if(address.street1 === '') 
      errMessage = 'Please include a number and street';
    else if(address.city === '')
      errMessage = 'Please include a city';
    else if(address.state === '' || address.state.length !== 2)
      errMessage = 'Please include a 2-letter state code';
    else if(address.zip === '' || address.zip.length !== 5 || isNaN(parseInt(address.zip)))
      errMessage = 'Please include a 5-digit numeric zip';
    else if(address.newspapers.length === 0)
      errMessage = 'Please select at least one newspaper';
    
    if (errMessage){
      Alert.alert('Invalid address', errMessage, [{text: 'OK'}]);
    } else {
      this.setState( prevState => ({
        addresses: [...prevState.addresses, {...address}],
        newAddress: {
          street1: '',
          city: '',
          state: '',
          zip: '',
          newspapers: []
        }
      }));
    }
  }
  render() {
    return (
       <View style = {styles.container}>
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Route Name"
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               onChangeText = {() => this.handleNameChange()} >
        </TextInput>
        <ScrollView>
          {this.state.addresses.map((item, index)=> (
            <View key={index}>
              <Text>{`${item.street1} ${item.city}, ${item.state} ${item.zip}`}</Text>
              <Text>{item.newspapers.map((paper, index) => (
                paper.name + (index !== item.newspapers.length - 1 ? ',' : '')
              ))}</Text>
            </View>
          ))}
        </ScrollView>
        <View >
          <TextInput value={this.state.newAddress.street1}
            onChangeText={(e) => this.handleAddressChange('street', e)}
            placeholder='Street'
            underlineColorAndroid = "transparent"
            placeholderTextColor = "gray"
            autoCapitalize = "none"></TextInput>
          <TextInput value={this.state.newAddress.city}
            onChangeText={(e) => this.handleAddressChange('city', e)}
            placeholder='City'
            underlineColorAndroid = "transparent"
            placeholderTextColor = "gray"
            autoCapitalize = "none"></TextInput>
          <TextInput value={this.state.newAddress.state}
            onChangeText={(e) => this.handleAddressChange('state', e)}
            placeholder='State'
            underlineColorAndroid = "transparent"
            placeholderTextColor = "gray"
            autoCapitalize = "none"></TextInput>
          <TextInput value={this.state.newAddress.zip}
            onChangeText={(e) => this.handleAddressChange('zip', e)}
            placeholder='Zip'
            underlineColorAndroid = "transparent"
            placeholderTextColor = "gray"
            autoCapitalize = "none"></TextInput>
          <View>
            {
              this.state.papers.map((paper, index) => (
                <Button
                  key={index}
                  color= {(this.state.newAddress.newspapers.find((data) => data.newspaperCode === paper.newspaperCode)) ? 'green' : 'red'}
                  onPress={() => this.handlePaperChange(paper)}
                  title = {paper.newspaperCode}>
                </Button>
              ))
            }
          </View>
          <Button style={styles.plus} 
            onPress={() => this.addNewAddress()} 
            title='+'></Button>
        </View>
        <Button onPress = {() => this.submitRoute()}
                title = 'Submit'
                color = 'blue'/>
      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  input: {

  },
  plus: {
    borderRadius: 50,
    backgroundColor: '#4CAF50', 
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    display: 'none',
    fontSize: 16,
    margin: '4px 2px'
  }
})