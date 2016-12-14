import React, { Component } from 'react';
import {RadioButtons} from 'react-native-radio-buttons';

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

//const register = require ('../Back_End/api/registerUser.js');
const question = require ('../Images/questionmark.png');
const background = require('../Images/blueback.png');
const t = require('tcomb-form-native');

const Form = t.form.Form

const ques = t.struct({
  "question" : t.String,
  "OptionA" : t.String,
  "OptionB" : t.String
})

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        "username" : '',
        "question" : '',
        "OptionA" : '',
        "OptionB" : '',
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        "username" : '',
        "question" : '',
        "OptionA" : '',
        "OptionB" : '',

      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }
  _handleAdd = () => {
    const value = this.refs.form.getValue();
    // If the form is valid...
    if(value){
      const data = {
        "username" : "Flower",
        "question" : value.question,
        "OptionA" : value.OptionA,
        "OptionB" : value.OptionB
      }
      // Serialize and post the data
      console.log(data);
      const json = JSON.stringify(data);
      fetch('http://localhost:3000/addQuestion', {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: json
      })
      .then((response) => response.json())
      .then(() => {
       alert('Question submitted!');
       // Redirect to login screen
       this.props.navigator.pop();

         id:'Main';
      })
      .catch((error) => {
        alert('Error: Question not submitted');
      })
      .done()
    } else {
      // Form validation error
      alert('Please fix the errors listed and try again.')
    }
  }

render(){
  const options = [
      "Where To Eat",
      "Where To Go",
      "What To Wear"
  ];

  function setSelectedOption(selectedOption){
    this.setState({ selectedOption });
  }

  function renderOption(option, selected, onSelect, index){
      const style = selected ? { fontWeight: 'bold'} : {};

      return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
      </TouchableWithoutFeedback>
      );
  }

  function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
  }

  return (

      <Image source={background}>
      <View style={{margin: 20}}>



      </View>

      <View style={styles.formContainer}>
        <Form style
          ref='form'
          type={ques}
          value={this.state.value}
          />
          <Text style={styles.text2}>Categories</Text>
           <RadioButtons
               options={ options }
               onSelection={ setSelectedOption.bind(this) }
               selectedOption={this.state.selectedOption }
               renderOption={ renderOption }
               renderContainer={ renderContainer }
          />

           <Text>Selected option: {this.state.selectedOption || 'none'}</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonBox}>
              <TouchableOpacity onPress={this._handleAdd}>
                <Text style={styles.buttonText}> Submit  </Text>
                </TouchableOpacity>
              </View>
            </View>
      </View>
      </Image>);
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  imageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor: 'transparent'
  },

  textContainer:{
    justifyContent:'center',
    flex:1,
    opacity: .6
  },

  categoryContainer:{
    justifyContent:'center',
    flex:1
  },

  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'stretch',
    padding: 10,
    marginLeft: 30,
  },


  q:{
    opacity: .6,
  },

  text: {
    flex: 1,
    textAlign: 'left',
    color: 'black',
    marginLeft: 10,
    fontSize:20
  },

  text2: {
    textAlign:'left',
    color: '#cc8800',
    fontSize:20,
  },

  formContainer:{
    flex:1,
    marginLeft: 20,
    marginRight:40,
  },

  buttonBox:{
    marginTop: 20,
    marginBottom: 10,
    backgroundColor:'#cc8800',
    width: 150,
    height: 50,
    borderRadius: 10,
  //  marginRight:90,
    paddingTop:10,
    paddingBottom:10,
  },

  buttonText:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    color: '#ffcc66'
  },

});
module.exports = Question;
