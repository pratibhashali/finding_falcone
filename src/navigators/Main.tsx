import React from 'react';
import { Linking, Text } from 'react-native';
import { PlanetFour, PlanetOne, PlanetThree, PlanetTwo } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome/Welcome';
import FindFalconeResult from '../screens/Resulit/FindFalconeResult';

const Stack = createStackNavigator();

const headerRight = () => (
  <Text onPress={() => Linking.openURL('https://www.geektrust.com/')}>
    GeekTrust
  </Text>
);

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        presentation: 'card',
        headerRight: headerRight,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="Home"
        component={PlanetOne}
        options={{ title: 'Finding Falcone!' }}
      />
      <Stack.Screen
        name="SelectPlanetTwo"
        component={PlanetTwo}
        options={{ title: 'Finding Falcone!' }}
      />
      <Stack.Screen
        name="SelectPlanetThree"
        component={PlanetThree}
        options={{ title: 'Finding Falcone!' }}
      />
      <Stack.Screen
        name="SelectPlanetFour"
        component={PlanetFour}
        options={{ title: 'Finding Falcone!' }}
      />
      <Stack.Screen
        name="Result"
        component={FindFalconeResult}
        options={{ title: 'Finding Falcone!' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
