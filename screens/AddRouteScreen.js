import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

export default class AddRouteScreen extends React.Component {
  state = {
    routeName: '',
    addresses: [{
      id: 1,
      street: '123 Fake Ave.',
      city: 'Oxford',
      state: 'OH',
      zip: '45056',
      newspapers: ['JN', 'NYT']
    }, {
      id: 0,
      street: '',
      city: '',
      state: '',
      zip: null,
      newspapers: []
    }],
    papers: ['JN', 'DD', 'NYT', 'WSJ']
  }
  handleNameChange = (text) => {
    this.setState({
      routeName: text
    });
  }
  submitRoute = () => {
    Alert.alert(
      'Submit',
      'Your route has been sent to our servers',
      [
        {text: 'OK'}
      ]
    )
  }
  handlePaperChange = (id, paperName) => {
    const addresses = this.state.addresses;
    const addressIdx = addresses.findIndex((data) => data.id = id);
    const address = addresses[addressIdx];
    const paperIdx = address.newspapers.findIndex((data) => data === paperName)
    if (paperIdx >= 0){
      address.newspapers = address.newspapers.filter((data) => data !== paperName);
    } else {
      address.newspapers.push(paperName);
    }
    addresses[addressIdx] = address;
    this.setState({
      addresses: addresses
    });
  }
  render() {
    return (
       <View>
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Route Name"
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               onChangeText = {this.handleNameChange} >
        </TextInput>
        <ScrollView>
          {this.state.addresses.map((item, index)=> (
            <View key={item.id}>
              <TextInput value={item.street}></TextInput>
              <TextInput value={item.city}></TextInput>
              <TextInput value={item.state}></TextInput>
              <TextInput value={item.zip}></TextInput>
              <View>
                {
                  this.state.papers.map((paperName, index) => (
                    <Button
                      key={index}
                      color= {(item.newspapers.find((data) => data === paperName)) ? 'green' : 'red'}
                      onPress={() => this.handlePaperChange(item.id, paperName)}
                      title = {paperName}>
                    </Button>
                  ))
                }
              </View>
            </View>
          ))}
        </ScrollView>
        <Button onPress = {this.submitRoute}
                title = 'Submit'
                color = 'blue'/>
      </View>
    )}
}

const styles = StyleSheet.create({
  input: {

  }
})