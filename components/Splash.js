import React, { Component } from 'react';
import {
 TouchableOpacity,
 StyleSheet,
 Text,
 View,
 TextInput,
 Image,
} from 'react-native';

const question = require ('../Images/questionmark.png');
const background = require('../Images/blueback.png');
class Splash extends Component {
 componentWillMount(){
   var navigator = this.props.navigator;
   setTimeout (() => {
     navigator.replace({
       id: 'Login',
     })
   }, 2300);
 }

constructor(props) {
   super(props);
   this.state = {text: ''};
 }

 onButtonPress(){
   this.props.navigator.push({
     id:'Login'
   });
 }

 render() {
   return (
     <Image source={background}>
     <View style={styles.container}>
        <View style={styles.textContainer}>
        </View>
       <Text style={styles.titleContainer}>queri</Text>
       <View style={styles.imageContainer}>
        <Image source={question} style={styles.q}>
       </Image>
       </View>

     </View>
     </Image>

   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex:1,
 },

 titleContainer:{
   fontSize: 90,
   fontWeight:'bold',
   textAlign: 'center',
   color: '#008080'

 },

 imageContainer:{
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: 80,
   backgroundColor: 'transparent',
 },

 textContainer:{
   marginTop:60,
   justifyContent:'center',
   //flex:1,
   backgroundColor:'transparent'
 },

 buttonContainer: {
   flex:1/2,
   justifyContent: 'center',
   alignItems: 'center',
   alignSelf:'stretch',
 },
 q:{
   opacity: .8,
 },


 text: {
   flex: 1,
   textAlign: 'left',
   color: 'gold',
   marginLeft: 10
 },



  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'bold',
    height: 10,
    width:400,
    padding: 25,
    alignItems: 'center',
    flex: 1,
    },
});

module.exports = Splash;
