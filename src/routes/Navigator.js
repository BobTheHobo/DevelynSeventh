import React from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginLoadingScreen from '../screens/LoginLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import StudentSeventhScreen from '../screens/StudentSeventhScreen';
import ProfileScreen from '../screens/ProfileScreen'
import AppHeader from '../components/AppHeader';

const AppStack = createStackNavigator({
  Home: StudentSeventhScreen,
  Profile: ProfileScreen
},
{
  initialRouteName: 'Home',
  /*
  defaultNavigationOptions: {
    title: 'D\'Evelyn Seventh',
    headerStyle: {
      backgroundColor: '#094814',
      height: 50
    },
    headerMode: 'float',
    headerTintColor: '#f9f9f9',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  */
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
});

const AuthStack = createStackNavigator({ 
  Auth : LoginScreen,
},
{
  initialRouteName: 'Auth',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
});

export const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      LoginLoading: LoginLoadingScreen,
      StudentSeventh: AppStack,
      Login: AuthStack,
    },
    {
      initialRouteName: 'LoginLoading',
    }
  )
);

