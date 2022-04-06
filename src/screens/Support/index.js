import React, {useContext, useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  RefreshControl,
} from 'react-native';

function SupportScreen({navigation}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <ScrollView>
        <Text>SUPPORT</Text>
      </ScrollView>
    </View>
  );
}

export default SupportScreen;
