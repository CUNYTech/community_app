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
  question: t.String,
})



class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        creator:'5833981c43af2e01c0f2d754',
        question: '',
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
    if (value) {
      const data = {
        "creator" : value.creator,
        "question" : value.question,
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
       this.props.navigator.push();
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
                this.setState({
                selectedOption
                });
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

               <Text>Categories</Text>
                <RadioButtons
                    options={ options }
                    onSelection={ setSelectedOption.bind(this) }
                    selectedOption={this.state.selectedOption }
                    renderOption={ renderOption }
                    renderContainer={ renderContainer }
               />

                <Text>Selected option: {this.state.selectedOption || 'none'}</Text>



                </View>

                <View style={styles.formContainer}>
                  <Form style
                    ref='form'
                    type={ques}
                    value={this.state.value}
                    />

                    <TouchableOpacity onPress={this._handleAdd}>
                      <Text style={[styles.button, styles.brownButton]}>Submit</Text>
                      </TouchableOpacity>
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'stretch',
    backgroundColor: 'burlywood',
    padding: 10
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
    flex:1,
    textAlign:'left',
    color: 'black',
    fontSize:30,
  },

  formContainer:{
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
  },
  brownButton: {
    backgroundColor: 'burlywood',
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
module.exports = Question;
