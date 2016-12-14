'use strict'
import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
const question = require ('../Images/questionmark.png');
const background = require('../Images/blueback.png');
let value;
class Answer extends Component{


  buttonA(){
     value =0;
     console.log(value);
     const json = JSON.stringify(value);
     fetch('http://localhost:3000/vote', {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
       },
       body: json
     })
     .then((response) => response.json())
     .then(() => {
       alert('Vote went through!');
       this.props.navigator.pop();
     })
     .catch((error) => {
       alert('Error: Vote not submitted');
     })
     .done()

  }

  buttonB(){
     value=1;
     console.log(value);
     const json = JSON.stringify(value);
     fetch('http://localhost:3000/vote', {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
       },
       body: json
     })
     .then((response) => response.json())
     .then(() => {
       alert('Vote went through!');
       this.props.navigator.pop();
     })
     .catch((error) => {
       alert('Error: Vote not submitted');
     })
     .done()

  }

/*  _handleAdd = () => {
      // Serialize and post the data
    //if(value)
      console.log(value);
      const json = JSON.stringify(value);
      fetch('http://35.160.57.103:8000/vote', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => response.json())
      .then(() => {
        alert('Vote went through!');
        this.props.navigator.pop();
      })
      .catch((error) => {
        alert('Error: Vote not submitted');
      })
      .done()

    }
*/

  render(){
    return(
      <Image source={background}>
        <View style={styles.container}>
          <View style ={styles. titlebar}>
            <Text style={styles.title}> TITLE </Text>
          </View>
          <View style ={styles.quesContainer}>
            <View style={styles.quesBox}>
              <Text style={styles.quesText}>
              Choice A
              </Text>
            </View>
            <View style={styles.quesBox}>
              <Text style={styles.quesText}>
              Choice B
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonBox}>
              <TouchableOpacity onPress={this.buttonA}>
                <Text style={styles.buttonText}> VOTE </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity onPress={this.buttonB}>
                <Text style={styles.buttonText}> VOTE </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}> 4 votes </Text>
            <Text style={styles.counterText}> 10 votes</Text>
          </View>
        </View>
      </Image>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  titlebar:{
    backgroundColor:"#008080",
    paddingTop:30,
    paddingBottom:10,
  },
  title:{
    color:"#e69900",
    fontWeight:'bold',
    textAlign:'center',
    fontSize: 20,
  },
  imageContainer:{
  //  alignItems: 'center',
  //  justifyContent: 'space-between',
    flex:1,
    backgroundColor: 'transparent',
    paddingTop: 25,
  },
  quesContainer:{
  //  flex:1,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'flex-start',
  //  backgroundColor: 'white'
  },
  quesBox:{
    backgroundColor:'burlywood',
    marginTop:20,
    marginRight:20,
    width:140,
    height:270,
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10,
  },
  quesText:{
    color: '#ac7339',
    textAlign:'center',
    fontSize: 25,
  },
  buttonContainer:{
  //  flex:1,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center',
  //  backgroundColor: 'black',
  },
  buttonBox:{
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#cc8800',
    width: 120,
    height: 40,
    borderRadius: 10,
    marginRight:20,
    paddingTop:10,
    paddingBottom:10,
  },
  buttonText:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    color: '#ffcc66'
  },
  counterContainer:{
  //  flex:1,
  //  backgroundColor:'orange',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-start'
  },
  counterText:{
    fontSize:20,
    marginRight: 15,
    color: '#008080',
  }

});

module.exports = Answer;
