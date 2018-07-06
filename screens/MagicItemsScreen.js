import React from 'react';
import {
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, 
  StatusBar,
  ImageBackground,
  Modal
} from 'react-native';
import { MagicItem } from '../components/MagicItem.js';
import itemInventory from '../constants/ItemsInventory.json';
export default class ItemsScreen extends React.Component {
  constructor() {
    super();
    this.state = { 
      itemList: itemInventory.items
    }
  }
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
    <ImageBackground style={styles.containerPrincipal} source={require('../assets/images/spaceBack.png')}>
      <View style={{flex: 1}}>
        <FlatList contentContainerStyle={styles.contentContainer}
        data={this.state.itemList}
        extraData={this.state}
        numColumns={3}
        keyExtractor={(item,index)=>item.id.toString()}
        renderItem={({item})=> <MagicItem
                                  itemData={item}
                                  />}
        />
      </View>
    </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    paddingTop: 30
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  getStartedText: {
    fontSize: 17,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  }
});
