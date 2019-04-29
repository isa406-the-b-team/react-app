/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SelectRoute from '../screens/SelectRoute';
import BeginRouteScreen from '../screens/BeginRouteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddRouteScreen from '../screens/AddRouteScreen';
import PaperInventoryScreen from '../screens/PaperInventoryScreen';
import MappingScreen from '../screens/MappingScreen';

const HomeStack = createStackNavigator({
  Home: SelectRoute,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AddRouteStack = createStackNavigator({
  AddRoute: AddRouteScreen,
});

AddRouteStack.navigationOptions = {
  tabBarLabel: 'Add Route',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const BeginRouteStack = createStackNavigator({
  Links: BeginRouteScreen,
});

BeginRouteStack.navigationOptions = {
  tabBarLabel: 'Begin Route',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const PaperInventoryStack = createStackNavigator({
  PaperInventory: PaperInventoryScreen,
});

//TODO remove before release
/*
The purpose of this tab is to be able to instantly access
screens that otherwise need to be navigated to through
another screen
 */
PaperInventoryStack.navigationOptions = {
  tabBarLabel: 'devTab',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
          }
      />
  ),
};

const MapStack= createStackNavigator({
  Map: MappingScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Mapping',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  AddRouteStack,
  BeginRouteStack,
  PaperInventoryStack,
  SettingsStack,
});
