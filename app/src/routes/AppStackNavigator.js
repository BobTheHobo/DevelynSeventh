import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//import pages
import Sidebar from '../components/NavigationComponents/Sidebar';
import LoginScreen from '../screens/LoginScreens/LoginScreen';
import StudentSeventhScreen from '../screens/StudentScreens/StudentSeventhScreen';
import TeacherSeventhScreen from '../screens/TeacherScreens/TeacherSeventhScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export const AppStackNavigator = createStackNavigator({
    Login: LoginScreen,
    //StudentSeventh: App,
},
{
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
})

export const App = createBottomTabNavigator(
  {
    What: LoginScreen,
    Settings: StudentSeventhScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'What') {
        iconName = `md-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `md-checkmark-circle${focused ? '' : '-outline'}`;
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
  }
);

/*
const AppStack = createDrawerNavigator({
  login: {screen: LoginScreen},
  seventh: {screen: SeventhScreen},
}, {
  contentComponent: ({navigation}) => <Sidebar navigation={navigation}/>
})
const AppSlider = createAppContainer(AppStack);
*/

//export const AppNavigationContainer = createAppContainer(AppStackNavigator);
export const AppNavigationContainer = createAppContainer(AppStackNavigator); 