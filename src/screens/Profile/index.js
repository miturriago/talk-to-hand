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
import LottieView from 'lottie-react-native';

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../../assets/animation/hands.json')}
        autoPlay
        loop
      />
      <View style={styles.card}>
        <Text style={styles.cardTex}>
          {' '}
          <Text style={styles.cardTextBold}>TalkToHands </Text>
        </Text>
        <Text style={styles.cardTex}> Juan Arteaga</Text>
        <Text style={styles.cardTex}> Carla Duran</Text>
        <Text style={styles.cardTex}> Mauricio Maldonado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  animation: {
    height: Dimensions.get('window').height * 0.5,
    marginLeft: Dimensions.get('window').width * 0.02,
  },

  card: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    padding: 20,
  },

  cardTex: {
    fontSize: 25,
    color: 'grey',
    textAlign: 'center',
    fontWeight: '300',
  },

  cardTextBold: {
    fontSize: 25,
    color: '#29ABE2',
    fontWeight: '600',
  },
});

export default ProfileScreen;
