import React, {Component} from 'react';
import { NativeRouter, Switch, Route, BackButton } from "react-router-native";
import AddRouteScreen from './AddRouteScreen';
import BeginRouteScreen from './BeginRouteScreen';
import SelectRoute from './SelectRoute';
import PaperInventoryScreen from './PaperInventoryScreen';
import MapManager from './MapManager'
class Routing extends Component {
  render() {
  return <NativeRouter>
    <BackButton>
      <Switch>
        <Route exact path = '/' component = {SelectRoute} />
        <Route path = '/addroute' component={AddRouteScreen} />
        <Route path = '/beginroute/:routeId' component={BeginRouteScreen}/>
        <Route path = '/papers/:routeId' component={PaperInventoryScreen} />
        <Route path = '/mapping/:routeId' component={MapManager} />
      </Switch>
    </BackButton>
  </NativeRouter>
  }
}

export default Routing