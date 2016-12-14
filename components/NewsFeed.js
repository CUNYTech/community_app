import React, { Component } from 'react';
import {
  ListView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';

const t = require('tcomb-form-native');
const question = require ('../Images/questionmark.png');
const background = require('../Images/blueback.png');
const answer=require('../Images/answericon.png');

class NewsFeed extends Component{

  onButtonPress2(){
    this.props.navigator.push({
      id:'Answer'
    });
  }
  constructor(props) {
    super(props)
    this.state = {
      value: {
        "id" : '',
        "question" : '',
      }
    }
  }

  componentWillMount(){
    this.state = {
      value: {
        "id" : '',
        "question" : '',
      }
    }
  }

  loadQuestions(){
    const data = {
      "id": '',
      "question": '',
    }
    console.log(data);
    const json = JSON.stringify(data);
    fetch('http://localhost:3000/viewQuestion', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: json
    })
    .then((response) => response.json())
    .then(() => {
      alert('Loading questions');

    })
    .catch((error) => {
    })
    .done()
  }

  render(){
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress ={this.onButtonPress2.bind(this)} >
      <Image source={answer} >
      </Image>
      </TouchableOpacity>
        <ScrollView style ={styles.newsfeed}>
          {this.loadQuestions()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    padding: 40,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    flex: 1
  },
  /*formContainer:{
    flex:1,
  },
  button: {
    borderRadius: 4,
    fontSize:20,
    padding: 20,
    fontWeight:'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },*/
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },

})


module.exports = NewsFeed;
