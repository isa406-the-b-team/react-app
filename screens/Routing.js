import React, {Component} from 'react';
import { NativeRouter, Switch, Route } from "react-router-native";
import AddRouteScreen from './AddRouteScreen';
import BeginRouteScreen from './BeginRouteScreen';
import SelectRoute from './SelectRoute';
import PaperInventoryScreen from './PaperInventoryScreen';
import MappingScreen from './MappingScreen';

class Routing extends Component {
  render() {
  return <NativeRouter>
    <Switch>
      <Route exact path = '/' component = {SelectRoute} />
      <Route path = '/addroute' component={AddRouteScreen} />
      <Route path = '/beginroute/:routeId' component={BeginRouteScreen}/>
      <Route path = '/papers/:routeId' component={PaperInventoryScreen} />
      <Route path = '/mapping/:startLoc/:destLoc' component={MappingScreen} />
    </Switch>
  </NativeRouter>
  }
}

export default Routing