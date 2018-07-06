import React, { PureComponent } from "react";
import {
  Text,
  StyleSheet,
  View,
  PanResponder,
  Animated
} from "react-native";

export class Draggable extends PureComponent {
    constructor(props) {
      super(props);      
      this.state = {
        pan: new Animated.ValueXY()
      };
    }
    componentWillMount() {
        var self = this;
        this.state.pan.setValue({x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 450)})
        this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (e, gesture) => true,
          onPanResponderGrant: (evt, gesture) => {
            this.state.pan.setOffset(this.state.pan.__getValue());
          //  this.state.pan.setValue({ x: 0, y: 0 });
          },
          onPanResponderMove: (e, gesture) => {
            Animated.event([
            null, { dx: this.state.pan.x, dy: this.state.pan.y }
          ])(e, gesture)},
          onPanResponderRelease: (evt, gesture) => {
            var velocityX = Math.abs(gesture.vx);
            var velocityY = Math.abs(gesture.vy);
            var velTotal = velocityX + velocityY;
            if (velTotal > 4) {
              Animated.decay(self.state.pan, {
                velocity: {
                  x: gesture.vx,
                  y: gesture.vy,
                },
                deceleration: 0.999999,
              }).start(self.props.swipeOut(self.props.number));
            } else {
              Animated.decay(self.state.pan, {
                velocity: {
                  x: gesture.vx,
                  y: gesture.vy,
                },
                deceleration: 0.997,
              }).start();
            }
            console.log(velTotal);
          }
        });
      }
      render() {
        const panStyle = {
          // transform: this.state.pan.getTranslateTransform()
          transform: [{
            translateX: this.state.pan.x.interpolate({
              inputRange: [-10, 310],
              outputRange: [-10, 310],
              extrapolate: 'clamp'
            })
          },
          {
            translateY: this.state.pan.y.interpolate({
              inputRange: [-10, 485],
              outputRange: [-10, 485],
              extrapolate: 'clamp'
            })
          }]
        }
        return (
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[panStyle, styles.circle]}>

          <Text style={styles.text}> {this.props.number} </Text>
            </Animated.View>
        );
      }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    position: "absolute",
  },
  text: {
    marginTop: 15,
    textAlign: 'center'
  }
});