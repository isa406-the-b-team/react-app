import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements';
import MappingScreen from './MappingScreen';
import axios from 'axios';

export default class MapManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: this.props.match.params.routeId,
      routeList: [],
      currentLoc: -1
    }
    this.getRoute = this.getRoute.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }
  async getRoute() {
    const route = await axios.get(`http://10.36.0.92:8080/route/${encodeURIComponent(this.state.routeId)}`);
    if (route && route.data.data.recipients.length > 1) {
      const list = route.data.data.recipients.map((item) => {
        return `${item.street1} ${item.city} ${item.state} ${item.zip}`
      })
      this.setState({
        routeList: list,
        currentLoc: 0
      })
    }
  }
  nextStep() {
    this.setState({
      currentLoc: this.state.currentLoc + 1
    });
  }
  componentDidMount() {
    this.getRoute();
  }
  render() {
    const {currentLoc, routeList} = this.state;
    const nextLoc = currentLoc + 1;
    if (currentLoc >= 0){
      return <View style={styles.container}>
        <MappingScreen startLoc = {routeList[currentLoc]} destLoc = {routeList[nextLoc]} />
        <Button title= 'Next Stop'
          type="outline"
          onPress={this.nextStep} />
      </View>
    } else {
      return <View></View>
    }
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  },
})