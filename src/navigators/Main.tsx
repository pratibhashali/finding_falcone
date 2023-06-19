import React from 'react';
import { Example } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome/Welcome';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, presentation: 'modal' }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="Home"
        component={Example}
        options={{ title: 'Select Planet One' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
