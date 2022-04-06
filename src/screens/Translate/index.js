import React, {Component} from 'react';
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
const PendingView = () => (
  <View>
    <Text>Wait...</Text>
  </View>
);

class Camara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: false,
      modalVisible: false,
      rute: null,
      isFaceDetected: false,
      disabled: true,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          focusable
          autoFocus={true}
          captureAudio={false}
          style={styles.preview}
          type={
            this.state.type
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flashMode={RNCamera.Constants.FlashMode.on}
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
                    onPress={() =>
                      this.setState({
                        type: !this.state.type,
                      })
                    }
                    style={styles.revert}>
                    <Icon name="sync" size={25} color="white" />
                  </TouchableOpacity>
                </View>

                <View style={styles.model}></View>

                <View style={styles.card}>
                  <Text style={styles.cardText}>HOLA</Text>
                </View>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }

  takePicture = async function (camera) {
    const options = {quality: 0.5};
    const data = await camera.takePictureAsync(options);
    //document. body. appendChild(data);
    this.setState({
      rute: data.uri,
    });

    this.setState({
      modalVisible: true,
    });
  };
}

const styles = StyleSheet.create({
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
    height: Dimensions.get('window').height * 0.91,
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
