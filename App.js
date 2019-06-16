import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as Permissions from 'expo-permissions';
import Home from './screens/Home';
import CreateTask from './screens/CreateTask';
import TodoStore from './data/TodoStore';

const AppNavigator = createStackNavigator(
  {
    Home,
    CreateTask,
  },
  {
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  async componentWillMount() {
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
  }

  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
  };

  render() {
    return (
      <TodoStore>
        <AppContainer />
      </TodoStore>
    );
  }
}
