import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile';
const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={ProfileScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
