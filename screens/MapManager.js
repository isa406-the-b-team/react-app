import React, {Component} from 'react';
import {View} from 'react-native'
import {Button} from 'react-native-elements';
import MappingScreen from './MappingScreen';
import axios from 'axios';

export default class MapManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeId: this.props.match.params.routeId,
      routeList: ["3770 Southpointe Pkwy Oxford OH 45056", "501 E. High Street Oxford OH 45056", "550 E. Spring Street Oxford OH 45056"],
      currentLoc: null,
      nextLoc: null
    }
    this.getRoute = this.getRoute.bind(this);
  }
  async getRoute() {
    const route = await axios.get(`http://10.36.0.92:8080/route/${encodeURIComponent(this.state.routeId)}`);
    if (route && route.length > 1) {
      this.setState({
        routeList: route,
        currentLoc: 0
      })
    }
  }
  nextStep() {
    this.setState({
      currentLoc: this.state.currentLoc + 1
    });
    this.forceUpdate();
  }
  componentDidMount() {
    this.getRoute();
  }
  render() {
    const {currentLoc, routeList} = this.state;
    const nextLoc = currentLoc + 1;
    if (currentLoc){
      return <View>
        <MappingScreen startLoc = {routeList[currentLoc]} destLoc = {routeList[nextLoc]} />
        <Button title= 'Next Stop'
          type="outline"
          onPress={this.nextStep()} />
      </View>
    } else {
      return <View></View>
    }
    
  }
}