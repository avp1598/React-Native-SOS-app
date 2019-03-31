import React, { Component } from 'react';
import { createStackNavigator} from 'react-navigation';
import { View,Platform } from 'react-native';
import Register from './registerComponent';
import Login from './loginComponent';
import Profile from './profileComponent';


const MainNavigator = createStackNavigator({
    Home: {screen: Login},
    Register: {screen: Register},
    Profile: {screen: Profile}
  });

  export default class Main extends Component {
    render() {
      return (
          <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
              <MainNavigator />
          </View>
      );
    }
  }