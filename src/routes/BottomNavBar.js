import React, { Component } from 'react'
import { BottomNavigation, Text } from 'react-native-paper';

const RecentsRoute = () => <Text>Recents</Text>;
//const login = () => this.props.navigation.navigate('Login');
//const seventh = () => this.props.navigation.navigate('StudentSeventh');

export default class BottomNavBar extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'music', title: 'Music', icon: 'queue-music' },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'recents', title: 'Recents', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: login,
    albums: seventh,
    recents: RecentsRoute,
  });

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