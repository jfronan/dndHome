import React, { PureComponent } from "react";
import {
  Text,
  StyleSheet,
  View,
  Modal
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export class MagicItemFullCard extends PureComponent {
    constructor(props) {
      super(props);
      this.parseRarity = this.parseRarity.bind();
      this.parseIcon = this.parseIcon.bind();
    }
    parseRarity(rarity){
        console.log(rarity)
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
        var attunes = "NO";
        if (this.props.itemData.attune) {
            attunes = "YES"
        };
        return (
            <View style={[styles.container, {backgroundColor: this.parseRarity(this.props.itemData.rarity)}]}>
                <View style={{flex:1}}>
                    <Text style={styles.text}>
                        {this.props.itemData.nombre}
                    </Text>
                    <View style={styles.boxContainer}>
                        <View style={styles.descContainer}>
                            <View style={styles.statBox}>
                                <Text style={styles.subStat}>
                                    Item Type: {this.props.itemData.type}
                                </Text>
                                {this.props.itemData.equipType ? (<Text style={styles.subStat}>Base Item: {this.props.itemData.equipType}</Text>) : null }
                                <Text style={styles.subStat}>
                                    Attune?: {attunes}
                                </Text>
                            </View>
                            <Text style={styles.descField}>
                                {this.props.itemData.desc}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
      }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    borderColor: 'gold'
  },
  text: {
      backgroundColor: '#FFFAF0',
      fontSize: 11,
      paddingHorizontal: 2,
      margin: 2,
      borderRadius: 5,
      textAlign: 'center',
      width: '80%',
      alignSelf: 'center'
  },
  boxContainer: {
      flex: 1,
      padding: 10
  },
  descContainer: {
    flex: 1
  },
  descField: {
    backgroundColor: '#FFFAF0',
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 5
  },
  statBox:{
      flexDirection: 'row',
      marginBottom: 3
  },
  subStat: {
      flex: 1,
      borderRadius: 3,
      paddingHorizontal: 3,
      backgroundColor: '#FFFAF0',
      marginHorizontal: 2
  }

});