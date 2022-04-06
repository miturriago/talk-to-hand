import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home';
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
