import {Animated, Easing, Platform} from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginLoadingScreen from '../screens/LoginLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import StudentSeventhScreen from '../screens/StudentSeventhScreen';
import ProfileScreen from '../screens/ProfileScreen'
import ModalScreen from '../screens/ModalScreen'

import AppHeader from '../components/AppHeader';

const PageStack = createStackNavigator({
  Home: StudentSeventhScreen,
  Profile: ProfileScreen,
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

const AppStack = createStackNavigator({
  Pages: PageStack,
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
      Login: AuthStack,
      StudentSeventh: AppStack,
    },
    {
      initialRouteName: 'LoginLoading',
    }
  )
);
