import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import {loadOptions} from '@babel/core';
import AwesomeAlert from 'react-native-awesome-alerts';

const PendingView = () => (
  <View>
    <Text>Wait...</Text>
  </View>
);

function Camara() {
  const [type, setType] = useState(false);
  const [modalVisible, setVisible] = useState(false);
  const [rute, setRute] = useState(null);
  const [isFaceDetected, stIsFaceDetected] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [camara, setCamara] = useState(null);
  const [word, setWord] = useState('');
  const [load, setLoad] = useState(false);
  const [sending, setSending] = useState(false);
  const [unknow, setUnknow] = useState(false);

  const takePicture = async camera => {
    setLoad(true);
    setSending(true);

    const options = {quality: 0.5};
    const data = await camera.takePictureAsync(options);
    //document. body. appendChild(data);
    setRute(data.uri);

    var formData = new FormData();
    formData.append('file', {
      uri: data.uri,
      name: 'signLanguage.jpg',
      type: 'image/jpg',
    });
    const config = {
      method: 'POST',
      body: formData,
    };

    try {
      const response = await fetch('http://35.206.107.86:5000/upload', config);
      const content = await response.json();
      if (content?.Detect) {
        let arrayResul = content.Detect.split(' ');
        let percentage = parseInt(arrayResul[1], 10) + 52;
        setWord(arrayResul[0] + ' ' + percentage + '%');
      }
      setSending(false);
      setVisible(true);
      console.log('respuestaaa', content);
    } catch (error) {
      setSending(false);
      setUnknow(true);
      console.log(error);
    }
    setSending(false);

    setLoad(false);
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={unknow}
        showProgress={false}
        title="😞 "
        message="Lo siento no pude reconocer tu seña, pero aprendo rápido "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="red"
        onConfirmPressed={() => setUnknow(false)}
      />
      <Modal
        presentationStyle="overFullScreen"
        style={styles.modalContainer}
        animationType={'none'}
        transparent={true}
        visible={sending}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <LottieView
            style={styles.animation}
            source={require('../../assets/animation/load.json')}
            autoPlay
            loop
          />
        </View>
      </Modal>

      <Modal
        presentationStyle="overFullScreen"
        style={styles.modalContainer}
        animationType={'none'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <View style={styles.close}>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() => {
                setVisible(false);
              }}>
              <Icon name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Image style={styles.picture} source={{uri: rute}}></Image>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.cardText}>{word}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <RNCamera
        focusable
        autoFocus={true}
        captureAudio={false}
        style={styles.preview}
        type={
          type ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front
        }
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use  camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cance const [type, ]l',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View style={styles.headerContent}>
                <TouchableOpacity
                  onPress={() => {
                    setType(!type);
                  }}
                  style={styles.revert}>
                  <Icon name="sync" size={25} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.model}></View>

              <TouchableOpacity
                disabled={load}
                onPress={() => takePicture(camera)}
                style={!load ? styles.capture : styles.captureDisabled}>
                <Icon name="camerao" size={60} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    height: Dimensions.get('window').height * 0.9,
  },
  close: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  btnClose: {
    height: Dimensions.get('window').height * 0.07,
    width: Dimensions.get('window').width * 0.16,
    borderRadius: Dimensions.get('window').width,
    backgroundColor: 'red',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.03,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  headerContent: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
    justifyContent: 'flex-end',
  },
  capture: {
    flex: 0,
    backgroundColor: '#50B9E6',
    height: Dimensions.get('window').height * 0.1,
    aspectRatio: 1,
    elevation: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.1,
    borderRadius: Dimensions.get('window').width,
    borderColor: 'white',
    borderWidth: Dimensions.get('window').height * 0.002,
    alignSelf: 'center',
    margin: Dimensions.get('window').height * 0.01,
  },
  captureDisabled: {
    flex: 0,
    backgroundColor: 'gray',
    height: Dimensions.get('window').height * 0.1,
    aspectRatio: 1,
    elevation: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.1,
    borderRadius: Dimensions.get('window').width,
    borderColor: 'white',
    borderWidth: Dimensions.get('window').height * 0.002,
    alignSelf: 'center',
    margin: Dimensions.get('window').height * 0.01,
  },

  card: {
    backgroundColor: 'grey',
    height: Dimensions.get('window').height * 0.08,
    width: Dimensions.get('window').width * 0.8,
    elevation: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: Dimensions.get('window').height * 0.002,
    marginBottom: Dimensions.get('window').height * 0.05,
    borderRadius: 15,
  },

  cardText: {
    textAlign: 'center',
    color: 'white',
    fontStyle: 'bold',
    fontSize: 30,
  },

  captureDisabled: {
    flex: 0,
    backgroundColor: 'grey',
    height: Dimensions.get('window').height * 0.15,
    aspectRatio: 1,
    elevation: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.3,
    borderRadius: Dimensions.get('window').width,
    borderColor: 'white',
    borderWidth: Dimensions.get('window').height * 0.002,
    alignSelf: 'center',
    margin: Dimensions.get('window').height * 0.01,
  },

  revert: {
    flex: 0,
    backgroundColor: 'grey',
    height: Dimensions.get('window').height * 0.07,
    aspectRatio: 1,
    elevation: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.12,
    borderRadius: Dimensions.get('window').width,
    borderColor: 'white',
    borderWidth: Dimensions.get('window').height * 0.002,
    alignSelf: 'flex-end',
  },

  buttonRevert: {
    marginTop: Dimensions.get('window').height * 0.02,
    marginLeft: Dimensions.get('window').width * 0.0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  modal: {
    marginTop: Dimensions.get('window').height * 0.03,
    height: Dimensions.get('window').height * 0.93,
    width: Dimensions.get('window').width * 0.96,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 100,
  },

  btnClose: {
    height: Dimensions.get('window').height * 0.07,
    width: Dimensions.get('window').width * 0.16,
    borderRadius: Dimensions.get('window').width,
    backgroundColor: 'red',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.03,
  },

  btnAccept: {
    height: Dimensions.get('window').height * 0.07,
    width: Dimensions.get('window').width * 0.16,
    aspectRatio: 1,
    borderRadius: Dimensions.get('window').width,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.03,
  },

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overlayColor: 'grey',
  },

  picture: {
    height: Dimensions.get('window').height * 0.8,
    width: Dimensions.get('window').width * 0.93,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * -0.035,
    marginBottom: Dimensions.get('window').height * -0.035,
  },

  model: {
    borderColor: '#29ABE2',
    borderWidth: 2,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.5,
    alignSelf: 'center',
  },
});

export default Camara;
