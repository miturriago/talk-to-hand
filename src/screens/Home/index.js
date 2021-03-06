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

function HomeScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.animation}
        source={require('../../assets/animation/welcome-animation.json')}
        autoPlay
        loop
      />
      <View style={styles.card}>
        <Text style={styles.cardTex}>
          {' '}
          Bienvenido a <Text style={styles.cardTextBold}>
            TalkToHands,{' '}
          </Text>{' '}
          lugar donde podrás traducir el lenguage de señas colombiano al español
          por medio de tu cámara.
        </Text>
        <Text style={styles.cardTex}>
          <Text style={styles.cardTextBold}>Empecemos... </Text>
        </Text>
        <Text style={styles.cardTex}>
          <Text style={styles.cardTextBold}>⇩</Text>
        </Text>
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
    marginLeft: Dimensions.get('window').width * 0.06,
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
    textAlign: 'center',
    fontSize: 25,
    color: 'grey',
    fontWeight: '300',
  },

  cardTextBold: {
    fontSize: 25,
    color: '#29ABE2',
    fontWeight: '600',
  },
});

export default HomeScreen;
