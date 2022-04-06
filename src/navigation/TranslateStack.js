import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Translate from '../screens/Translate';
const Stack = createStackNavigator();

export default function TranslateStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Translate}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
