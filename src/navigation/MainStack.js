import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TransitionPresets} from '@react-navigation/stack';
import HomeStack from './HomeStack';
import SupportStack from './SupportStack';
import TranslateStack from './TranslateStack';
import ProfileStack from './ProfileStack';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

//import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: '#34ace4'}}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={'#34ace4'}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: '#34ace4'}}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -26.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 56,
            height: 56,
            borderRadius: 28,
            elevation: 50,
            backgroundColor: '#FFFFFF',
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: '#34ace4',
        }}
        activeOpacity={1}
        onPress={
          //ANIMACIOOOON
          //()=>{navigation.navigate('Waiting');}
          onPress
        }>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  return <BottomTabBar {...props.props} />;
};

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'https://res.cloudinary.com/dos13qenv/image/upload/v1649215933/TalkToHand/home_ddlapt.png'
              : 'https://res.cloudinary.com/dos13qenv/image/upload/v1649215935/TalkToHand/home_1_zqmu1c.png';
          } else if (route.name === 'Translate') {
            iconName = focused
              ? 'https://res.cloudinary.com/dos13qenv/image/upload/v1649215666/TalkToHand/sign-language_2_voudol.png'
              : 'https://res.cloudinary.com/dos13qenv/image/upload/v1649215663/TalkToHand/sign-language_1_wyv2r3.png';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'https://res.cloudinary.com/dos13qenv/image/upload/v1649217530/TalkToHand/user_3_failec.png'
              : 'https://res.cloudinary.com/dos13qenv/image/upload/v1649217499/TalkToHand/user_2_hzvgw1.png';
          } else if (route.name === 'Support') {
            iconName = focused
              ? 'https://res.cloudinary.com/dos13qenv/image/upload/v1649216079/TalkToHand/customer-support_y2epy7.png'
              : 'https://res.cloudinary.com/dos13qenv/image/upload/v1649216080/TalkToHand/customer-support_1_oiydjn.png';
          }
          // You can return any component that you like here!
          return (
            <Image
              source={{uri: iconName}}
              style={{
                width: focused ? 35 : 38,
                height: focused ? 35 : 38,
                tintColor: focused ? 'grey' : '#FFFFFF',
                resizeMode: 'cover',
              }}
            />
          );
        },
        tabBarButton: props => <TabBarCustomButton {...props} />,
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 0,
          bottom: 11,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 50,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Translate"
        component={TranslateStack}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportStack}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function MainStack(props) {
  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  console.log(
    `Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`,
  );

  if (cameraPermission == null || microphonePermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage =
    cameraPermission !== 'authorized' ||
    microphonePermission === 'not-determined';
  return (
    <Drawer.Navigator initialRouteName="Tab">
      <Drawer.Screen
        name="Tab"
        component={TabStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
