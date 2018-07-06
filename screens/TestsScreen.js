import React from 'react';
import { Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Button,
    FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Draggable } from '../components/Draggable.js'

export default class TestsScreen extends React.Component {
  constructor(props) {
    super(props);
    var swipeMeOut = this.swipeMeOut.bind(this);
    this.cantArrastrables = 1;
    this.addButton = this.addButton.bind(this);
    this.state = {
      draggablesFiller: [1]
    };

  }
  swipeMeOut(elemId) {
    var new_state = this.state.draggablesFiller;
    new_stateIndex = new_state.indexOf(parseInt(elemId, 10));
    setTimeout(()=>{
      console.log('se vaaaa')
      if (new_stateIndex > -1) {
        new_state.splice(new_stateIndex, 1);
        console.log(new_state);
        this.setState({draggablesFiller: new_state});
      }
    },50)
  }

  addButton = function() {
    this.cantArrastrables = this.cantArrastrables + 1;
    var new_state = this.state.draggablesFiller;
    new_state.push(this.cantArrastrables);
    this.setState({draggablesFiller: new_state});
    console.log(this.state.draggablesFiller)
  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../assets/images/cloud-background.png')}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.ballContainer}>
        <View style={styles.row}>
        {this.state.draggablesFiller.map(dragComp => {return <Draggable swipeOut={this.swipeMeOut.bind(this)}  number={`${dragComp}`} key={`${dragComp}`} />})}
        </View>
        </View>
      </ScrollView>
      <View style={styles.adderButton}>
        <Button
          onPress={this.addButton}
          title = 'Agrega otro arrastrable'
          color= 'red'
        />
      </View>
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ballContainer: {
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  adderButton: {
    position: 'absolute',
    bottom: 0,
    height: 35
  }
});


