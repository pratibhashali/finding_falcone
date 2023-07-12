import React from 'react';
import { PlanetFour, PlanetOne, PlanetThree, PlanetTwo } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome/Welcome';
import FindFalconeResult from '../screens/Resulit/FindFalconeResult';
import { Routes } from './Routes';
import Link from '../components/Link/Link';

const Stack = createStackNavigator();
const headerRight = () => (
  <Link url="https://www.geektrust.com/" text="GeekTrust" />
);
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        presentation: 'card',
      }}
    >
      <Stack.Screen
        name={Routes.WELCOME}
        component={Welcome}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name={Routes.HOME}
        component={PlanetOne}
        options={{ title: 'Finding Falcone!', headerRight: headerRight }}
      />
      <Stack.Screen
        name={Routes.PLANET_TWO}
        component={PlanetTwo}
        options={{ title: 'Finding Falcone!', headerRight: headerRight }}
      />
      <Stack.Screen
        name={Routes.PLANET_THREE}
        component={PlanetThree}
        options={{ title: 'Finding Falcone!', headerRight: headerRight }}
      />
      <Stack.Screen
        name={Routes.PLANET_FOUR}
        component={PlanetFour}
        options={{ title: 'Finding Falcone!', headerRight: headerRight }}
      />
      <Stack.Screen
        name={Routes.RESULT}
        component={FindFalconeResult}
        options={{ title: 'Finding Falcone!', headerRight: headerRight }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
