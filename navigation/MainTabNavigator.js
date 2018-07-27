import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MagicItemsScreen from '../screens/MagicItemsScreen'
import SettingsScreen from '../screens/SettingsScreen';

const MagicStack = createStackNavigator({
   Items: MagicItemsScreen,
});

MagicStack.navigationOptions = {
  tabBarLabel: 'Magic Items',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='sword'
    />
  ),
};

const HomeStack = createStackNavigator({
  Items: SettingsScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Homebrew Rules',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='book'
    />
  ),
};

/*
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestsScreen from '../screens/TestsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const TestsStack = createStackNavigator({
  Tests: TestsScreen,
});

TestsStack.navigationOptions = {
  tabBarLabel: 'Tests',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-analytics${focused ? '' : '-outline'}` : 'md-analytics'}
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
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};


*/


export default createBottomTabNavigator({
  MagicStack,
  HomeStack,
  // TestsStack,
  // LinksStack,
  // SettingsStack,
});