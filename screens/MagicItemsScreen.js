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
import itemFullList from '../constants/ItemsInventory.json';
import { AsyncStorage } from "react-native";
import AddItemList from '../components/AddItemList.js';

export default class ItemsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      playerItems: [],
      filterCommon: true,
      filterUncommon: true,
      filterRare: true,
      filterVRare: true,
      filterLegendary: true,
      eraseSelect: [],
      modalAddShow: false
    }
    this.alterFilter = this.alterFilter.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addPlayerItem = this.addPlayerItem.bind(this);
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount(){
    var storageKeys = await AsyncStorage.getAllKeys();
    storageKeys.forEach(key => this.addPlayerItem(key));
  }

  async addPlayerItem(key){
    var listerItem = await JSON.parse(await AsyncStorage.getItem(key));
    var checkXistence = this.state.playerItems.filter((xItem)=>{
      return (xItem.id === listerItem.id);
    })
    if (checkXistence.length) {
      console.log('item repetido')
      // agregar funcion que aumente cantidad en db
      return;
    }
    this.setState({ 
      playerItems: this.state.playerItems.concat([listerItem])
    })
  }

  openModal() {
    this.setState(()=> ({
      modalAddShow: true
    }))
  };
  closeModal() {
    this.setState(()=> ({
      modalAddShow: false
    }))
  };
  
  alterFilter(fName, value){
    this.setState(()=> ({
      [fName]: value
    }))
  }

  showWithRarity(rarityValue) {
    var rarity = rarityValue.toLowerCase();
    if (this.state.filterCommon && (rarity === 'common')){
      return true;
    };
    if (this.state.filterUncommon && (rarity === 'uncommon')){
      return true;
    };
    if (this.state.filterRare && (rarity === 'rare')){
      return true;
    };
    if (this.state.filterVRare && (rarity === 'very rare')){
      return true;
    };
    if (this.state.filterLegendary && (rarity === 'legendary')){
      return true;
    }
    return false;
  }
  render() {
    return (
    <ImageBackground style={styles.containerPrincipal} source={require('../assets/images/spaceBack.png')}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, {backgroundColor: (this.state.filterCommon ? colores.common.common : colores.common.dark)}]} 
                          name="filterCommon" 
                          onPress={()=>{this.alterFilter('filterCommon',(!this.state.filterCommon))}}>
          <Text style={styles.filterText}>Common</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, {backgroundColor: (this.state.filterUncommon ? colores.uncommon.common : colores.uncommon.dark)}]} 
                          name="filterUncommon" 
                          onPress={()=>{this.alterFilter('filterUncommon',(!this.state.filterUncommon))}}>
          <Text style={styles.filterText}>Uncommon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, {backgroundColor: (this.state.filterRare ? colores.rare.common : colores.rare.dark)}]} 
                          name="filterRare" 
                          onPress={()=>{this.alterFilter('filterRare',(!this.state.filterRare))}}>
          <Text style={styles.filterText}>Rare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, {backgroundColor: (this.state.filterVRare ? colores.vRare.common : colores.vRare.dark)}]} 
                          name="filterVRare" 
                          onPress={()=>{this.alterFilter('filterVRare',(!this.state.filterVRare))}}>
          <Text style={styles.filterText}>Very Rare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, {backgroundColor: (this.state.filterLegendary ? colores.legendary.common : colores.legendary.dark)}]} 
                          name="filterLegendary" 
                          onPress={()=>{this.alterFilter('filterLegendary',(!this.state.filterLegendary))}}>
          <Text style={styles.filterText}>Legendary</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
      <FlatList contentContainerStyle={styles.contentContainer}
                    data={this.state.playerItems.filter((item)=>this.showWithRarity(item.rarity))}
                    numColumns={3}
                    keyExtractor={(item,index)=>item.id.toString()}
                    renderItem={({item})=> <MagicItem
                                            itemData={item}
                                            />
                                            }
                />
      </View>
      <View style={styles.botoneraContainer}>
        <TouchableOpacity style={[{backgroundColor: 'lawngreen'}, styles.botoneraButton]} onPress={()=>this.openModal()}>
          <Text>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{backgroundColor: 'red'}, styles.botoneraButton]} onPress={()=>{AsyncStorage.clear(); this.setState({playerItems: []})}}>
          <Text>Eliminar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={this.state.modalAddShow}
        onRequestClose={this.closeModal}
        animationType='fade'
        onDismiss={this.closeModal}
      >
        <AddItemList addToPlayer={(aKey)=>{this.addPlayerItem(aKey)}}/>
      </Modal>

    </ImageBackground>

    );
  }
}
const colores = {
  common:{
    common: 'grey',
    dark: '#4e4e4e',
  },
  uncommon:{
    common: 'blue',
    dark: '#000069',
  },
  rare:{
    common: 'gold',
    dark: '#694100',
  },
  vRare:{
    common: 'purple',
    dark: '#440044',
  },
  legendary:{
    common: 'orange',
    dark: '#692d00',
  },
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
  },
  filterContainer: {
    height: 25,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5
  },
  filterButton:{
    margin: 2,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderColor: 'seashell'
  },
  filterText: {
    fontSize: 12,
    lineHeight: 14,
  },
  botoneraContainer: {
    padding: 1,
    flexDirection: 'row',
    height: 25
  },
  botoneraButton: {
    flex: 1, 
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'midnightblue'
  }
});
