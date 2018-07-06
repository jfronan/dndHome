import React from 'react';
import {FileSystem} from 'expo';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Linking, ImageBackground, Share} from 'react-native';
//import Share, {ShareSheet, Button} from 'react-native-share';
//import {RNFetchBlob} from 'react-native-fetch-blob';

//import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.readPdf = this.readPdf.bind(this);
    this.shareButton = this.shareButton.bind(this);
  }
  static navigationOptions = {
    header: null,
    title: 'Links',
  };

  readPdf = function() {
    Linking.openURL('http://www.orimi.com/pdf-test.pdf');
  }
  shareButton = function() {
    FileSystem.downloadAsync(
      'http://www.orimi.com/pdf-test.pdf',
      FileSystem.documentDirectory + 'test.pdf'
    )
      .then(({ uri }) => {
        console.log('Finished downloading to ', uri);
        FileSystem.getInfoAsync(uri).then((res)=>{
          console.log('hay archivo?: ' + JSON.stringify(res));
        });
        /*
        Share.share({
          url: uri,
          title: 'title here'       
        });
        console.log('Compartiendo pdf');
        */
       Linking.openURL(uri.replace('file:///', 'share:///'))
      })
      .catch(error => {
        console.error(error);
      })
      .finally(()=>{
        FileSystem.deleteAsync(FileSystem.documentDirectory + 'test.pdf');
        FileSystem.getInfoAsync(FileSystem.documentDirectory + 'test.pdf').then((res)=>{
          console.log('PDF borrado del storage? hay archivo?: ' + JSON.stringify(res));
        });
      });
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../assets/images/cloud-background.png')}>
        <View style={styles.adderButton}>
          <TouchableOpacity onPress={this.readPdf} style={[styles.pdfButton, styles.pdfButton1]}>
            <Text>Leer pdf de prueba</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.shareButton} style={[styles.pdfButton, styles.pdfButton2]}>
            <Text>Compartir pdf</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  adderButton: {
    flexDirection: "row",
    position: 'absolute',
    bottom: 0,
    height: 35
  },
  pdfButton: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 3,
    borderColor: 'gold',
    borderRadius: 5,
    marginRight: 10
  },
  pdfButton1: {
    backgroundColor: 'red',
  },
  pdfButton2: {
    backgroundColor: 'green',
  }
});
