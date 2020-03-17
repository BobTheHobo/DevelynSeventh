//WARNING: THIS CODE IS EXTREMELY EXPERIMENTAL AND TAKES UP A LOT OF RESOURCES
import React, { Component } from 'react'
import { BottomNavigation, Text } from 'react-native-paper';

//screens
import TeacherSeventhScreen from '../screens/TeacherScreens/TeacherSeventhScreen';
import TeacherRequireScreen from '../screens/TeacherScreens/TeacherRequireScreen';
import TeacherPlanScreen from '../screens/TeacherScreens/TeacherPlanScreen';
import TeacherFindStudentScreen from '../screens/TeacherScreens/TeacherFindStudentScreen';

const SeventhRoute = () => <TeacherSeventhScreen/>;
const PlanRoute = () => <TeacherPlanScreen/>;
const RequireRoute = () => <TeacherRequireScreen/>;
const FindRoute = () => <TeacherFindStudentScreen/>;

export default class BottomNavBar extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'seventh', title: 'Seventh', icon: 'queue-music' },
      { key: 'plan', title: 'Plan', icon: 'album' },
      { key: 'require', title: 'Require', icon: 'history' },
      { key: 'find', title: 'Find Students', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    seventh: SeventhRoute,
    plan: PlanRoute,
    require: RequireRoute,
    find: FindRoute,
  });

  navigateTo = (destination) => {
    this.props.navigation.navigate(destination)
  }

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}