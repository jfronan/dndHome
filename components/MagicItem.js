import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Modal,
  ImageBackground
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MagicItemFullCard } from './MagicItemFullCard.js';
export class MagicItem extends Component {
    constructor(props) {
      super(props);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.parseRarity = this.parseRarity.bind();
      this.parseIcon = this.parseIcon.bind();
      this.state = {
        modalData: {
          show: false
        }
      }
    }
    openModal() {
      if (this.props.parentFunction){
          this.props.parentFunction();
          return;
      }  
      var newState = this.state;
      newState.modalData.show = true;
      this.setState(newState);
    };
    closeModal() {
      var newState = this.state;
      newState.modalData.show = false;
      this.setState(newState);
    };
    parseRarity(rarity){
        rarity = rarity.toLowerCase();
        switch(rarity) {
            case 'legendary':
                return 'orange'
            case 'very rare':
                return 'purple'
            case 'rare':
                return 'gold'
            case 'uncommon':
                return 'blue'
            case 'common':
                return 'grey'
        }
    };
    parseIcon(type){
        type = type.toLowerCase();
        switch(type) {
            case 'wondrous':
                return 'codepen'
            case 'consumable':
                return 'glass-mug'
            case 'equipment':
                return 'tshirt-crew'
        }
    };
      render() {
        return (
            <TouchableHighlight style={[styles.container, {backgroundColor: this.parseRarity(this.props.itemData.rarity)}]} onPress={()=>this.openModal()}>
                <View style={{flex:1}}>
                <Modal
                    visible={this.state.modalData.show}
                    onRequestClose={this.closeModal}
                    animationType='fade'
                    onDismiss={this.closeModal}
                >
                    <ImageBackground style={styles.modalViewContainer} source={require('../assets/images/spaceBack.png')}>
                        <MagicItemFullCard itemData={this.props.itemData}
                        />
                    </ImageBackground>
                </Modal>
                <Text style={styles.text}>
                    {this.props.itemData.nombre}
                </Text>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name={this.parseIcon(this.props.itemData.type)}
                        size={50}
                        color='black'
                    />
                </View>
                </View>
            </TouchableHighlight>
        );
      }
}
let styles = StyleSheet.create({
  container: {
    width: 110,
    margin: 1,
    borderRadius: 10,
    height: 110
  },
  text: {
      backgroundColor: 'white',
      fontSize: 11,
      paddingHorizontal: 2,
      margin: 2,
      borderRadius: 5,
      textAlign: 'center'
  },
  iconContainer: {
      alignItems:'center',
      justifyContent:'center',
      flex: 1
  },
  modalViewContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15
  }
});