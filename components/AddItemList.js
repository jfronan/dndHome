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
import { AsyncStorage, Alert } from "react-native"

var itemsList = itemFullList.items;

export default class AddItemList extends React.Component {
    constructor() {
      super();
      this.state = {
        filterCommon: true,
        filterUncommon: true,
        filterRare: true,
        filterVRare: true,
        filterLegendary: true
      }
      this.alterFilter = this.alterFilter.bind(this);
      this.confirmationPrompt = this.confirmationPrompt.bind(this);
      this.addItem = this.addItem.bind(this);
    }
    static navigationOptions = {
      header: null,
    };

    confirmationPrompt(item){
        Alert.alert(
            'Agregar item al inventario?',
            '',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed')},
              {text: 'Si', onPress: () => {this.addItem(item)}},
            ],
            { cancelable: false }
          )
    }

    async addItem(item){
        try {
            var idParsed = JSON.stringify(item.id);
            var itemParsed = JSON.stringify(item);
            await AsyncStorage.setItem(idParsed, itemParsed);
            this.props.addToPlayer(idParsed);
            Alert.alert(
                'Item agregado exitosamente',
                '',
                [
                    {text: 'OK', onPress: ()=>{}}
                ]
            )
        } catch (error) {
            Alert.alert(
                'Error al grabar el item',
                JSON.stringify(error),
                [
                    {text: 'OK', onPress: ()=>{console.log(error)}}
                ]
            )
        }
    }

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
    render(){
        var self = this;
        return(
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
                    data={itemsList.filter((item)=>this.showWithRarity(item.rarity))}
                    numColumns={3}
                    keyExtractor={(item,index)=>item.id.toString()}
                    renderItem={({item})=> <MagicItem
                                            itemData={item}
                                            parentFunction={()=>{self.confirmationPrompt(item)}}
                                            />
                                            }
                />
            </View>
        </ImageBackground>
        )
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
    filterContainer: {
      height: 25,
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 5
    }
})