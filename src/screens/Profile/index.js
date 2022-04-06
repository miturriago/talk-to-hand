import React, {useContext, useState, useEffect} from "react";
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
} from "react-native";

function ProfileScreen() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ScrollView>
        <Text>PROFILE</Text>
      </ScrollView>
    </View>
  );
}

export default ProfileScreen;
