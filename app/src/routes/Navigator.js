//React native and navigation components
import React, { Component } from 'react'
import {Animated, Easing, Platform} from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

//Login screens
//import LoginLoadingScreen from '../screens/LoginLoadingScreen';
import LoginScreen from '../screens/LoginScreens/LoginScreen';

//Student screens
import StudentSeventhScreen from '../screens/StudentScreens/StudentSeventhScreen';

//Teacher screens
import TeacherSeventhScreen from '../screens/TeacherScreens/TeacherSeventhScreen';
import TeacherRequireScreen from '../screens/TeacherScreens/TeacherRequireScreen';
import TeacherPlanScreen from '../screens/TeacherScreens/TeacherPlanScreen';
import TeacherFindStudentScreen from '../screens/TeacherScreens/TeacherFindStudentScreen';

//Admin screens
import AdminScreen from '../screens/AdminScreens/AdminScreen';

//Shared screens
import ProfileScreen from '../screens/SharedScreens/ProfileScreen';
import AppHeader from '../components/NavigationComponents/AppHeader';

//Navigation screens
import ModalScreen from '../screens/SharedScreens/ModalScreen'

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';



//Student navigation stack
const StudentStack = createStackNavigator({
  Home: StudentSeventhScreen,
  Profile: ProfileScreen,
},
{
  initialRouteName: 'Home',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
});

//Bottom teacher navigator
const TeacherBottomStack = createMaterialBottomTabNavigator(
  {
    Home: TeacherSeventhScreen,
    Plan: TeacherPlanScreen,
    Require: TeacherRequireScreen,
    FindStudent: TeacherFindStudentScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    },
    //Documentation found here: https://reactnavigation.org/docs/en/tab-based-navigation.html
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let IconComponent = Ionicons;
        let iconName;

        if (routeName === 'Home') {
          //if you want to change icon depending on focused/unfocused, use iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          iconName = `md-people`;
          //TODO: Icon badge implementation here
        } else if (routeName === 'Plan'){
          iconName = 'md-information-circle'
        } else if (routeName === 'Require') {
          iconName = `md-person-add`;
        } else if (routeName === 'FindStudent'){
          iconName = 'md-search';
        }

        // Returns any specified icon!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
      //Color changes are handled on the screens itself. It's a total pain, but I can't
      //find a way to include it here.
    }),
    //activeColor: '#f0edf6',
    //inactiveColor: '#3e2465',
    //barStyle: { backgroundColor: '#694fad' },
  }
);

//Teacher navigation stack
const TeacherStack = createStackNavigator({
  Home: TeacherBottomStack,
  Profile: ProfileScreen,
},
{
  initialRouteName: 'Home',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
});

//Admin navigation stack
const AdminStack = createStackNavigator({
  Home: AdminScreen,
  Profile: ProfileScreen,
},
{
  initialRouteName: 'Home',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})

//Login navigation stack
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

//App navigator, controls everything
export const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      //LoginLoading: LoginLoadingScreen,
      Login: AuthStack,
      StudentSeventh: StudentStack,
      TeacherSeventh: TeacherStack,
      Admin: AdminStack
    },
    {
      initialRouteName: 'Login',
    }
  )
);

/*
const AppStack = createStackNavigator({
  Student: StudentStack,
  Teacher: TeacherStack,
  Modal: {screen: ModalScreen},
},
{
  mode: 'modal',
  transparentCard: true,
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index;
  
      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [1, 1, .5],
      });
  
      return { opacity, transform: [{ translateY }] };
    },
  }),
  navigationOptions: { gesturesEnabled: false}
})
*/
