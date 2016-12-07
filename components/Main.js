import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

const food_background = require ('../Images/foodbackground.png');
const clothing_background = require('../Images/clothing.png');
const social_background = require('../Images/social.png');
const mis_background = require('../Images/mis.png')
const avatar = require('../Images/avatar_fox.png');

class Main extends Component {
  onButtonPress(){
    this.props.navigator.push({
      id:'Question'
    });
  }

  render(){
    return (
      <View style ={styles.container}>

        <View style ={styles.header}>

          <TouchableOpacity onPress ={this.onButtonPress.bind(this)} >
          <Image source={avatar} >
          </Image>
          </TouchableOpacity>
        </View>

        <ScrollView style ={styles.categories}>

          <TouchableOpacity onPress={this.onButtonPress.bind(this)} >
          <Image source= {food_background} style = {styles.food}>
          <Text style={styles.text} >
          FOOD
          </Text>
          </Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onButtonPress.bind(this)} >
          <Image source= {clothing_background} style = {styles.food}>
          <Text style={styles.text} >
          CLOTHING
          </Text>
          </Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onButtonPress.bind(this)} >
          <Image source= {social_background} style = {styles.food}>
          <Text style={styles.text} >
          SOCIAL
          </Text>
          </Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onButtonPress.bind(this)} >
          <Image source= {social_background} style = {styles.food}>
          <Text style={styles.text} >
          SOCIAL
          </Text>
          </Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onButtonPress.bind(this)} >
          <Image source= {mis_background} style = {styles.food}>
          <Text style={styles.text} >
          MISCELLANEOUS
          </Text>
          </Image>
          </TouchableOpacity>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    flex:1,
    backgroundColor: 'burlywood',
    alignItems:'center',
    justifyContent: 'center'
  },
  categories:{
    flex:2,
    backgroundColor: 'transparent'
  },
  food:{
    width: null,
    height:150,
    flex:1,
    opacity: .5,
//    resizeMode: 'contain',
  },

  text:{
    color:'black',
    fontWeight:'bold',
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Cochin',
  }

});


module.exports = Main;
