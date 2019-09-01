import { createStackNavigator, createAppContainer } from 'react-navigation';
//import pages
import Sidebar from '../components/Sidebar';
import LoginScreen from '../screens/LoginScreen';
import StudentSeventhScreen from '../screens/StudentSeventhScreen';

const AppStackNavigator = createStackNavigator({
    Login: LoginScreen,
    StudentSeventh: StudentSeventhScreen,
},
{
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
}

)
/*
const AppStack = createDrawerNavigator({
  login: {screen: LoginScreen},
  seventh: {screen: SeventhScreen},
}, {
  contentComponent: ({navigation}) => <Sidebar navigation={navigation}/>
})

const AppSlider = createAppContainer(AppStack);
*/

export const AppNavigationContainer = createAppContainer(AppStackNavigator);