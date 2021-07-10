import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { nativeStackConfig } from './nativeStackConfig';

import Routes from './routes';
import { CreateTask, Home } from '@calendar/screens';
import { useStore } from '@calendar/store';

const Stack = createStackNavigator();

function MainNavigatorWrapper() {
  return (
    <Stack.Navigator {...nativeStackConfig}>
      <Stack.Screen component={Home} name={Routes.HOME} />
      <Stack.Screen component={CreateTask} name={Routes.CREATE_TASK} />
    </Stack.Navigator>
  );
}

const AppContainer = React.forwardRef((props, ref) => (
  <NavigationContainer ref={ref}>
    <MainNavigatorWrapper initialRoute={props.initialRoute} />
  </NavigationContainer>
));

AppContainer.displayName = 'AppContainer';

export default React.memo(AppContainer);
