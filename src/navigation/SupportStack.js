import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import SupportScreen from '../screens/Support';
const Stack = createStackNavigator();

export default function SupportStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={SupportScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
