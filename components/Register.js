// Register Page
import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import validator from 'validator';

const t = require('tcomb-form-native');
const question = require ('../Images/questionmark.png');
const background = require('../Images/blueback.png');

const Form = t.form.Form


const newUser = t.struct({
  "username" : t.String,
  "email" : t.String,
  "password" :  t.String
})

const options = {
fields : {
  email : {
    autoCapitalize: 'none',
    autoCorrect: false
  },
  password: {
    autoCapitalize: 'none',
    password: true,
    autoCorrect: false,
    secureTextEntry : true
  },
  confirmPassword:{
    autoCapitalize: 'none',
    password: true,
    autoCorrect: false,
    secureTextEntry: true
  }
 }
}

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: {
        "username" : '',
        "password" : '',
        "email" : ''
      }
    }
  }

 componentWillUnmount() {
   this.setState = {
     value: {
      "username" : '',
      "password" : null,
      "email" : ''
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
  if(!validator.isEmail(value.email)){
    alert('Invalid email.');
    return;
  }
  if(value){
    const data = {
      "username" : value.username,
      "password" : value.password,
      "email" : value.email
    }
    // Serialize and post the data
    console.log(data);
    const json = JSON.stringify(data);
    fetch('http://localhost:3000/register', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: json
    })
    .then((response) => response.json())
    .then(() => {
      alert('Success! You may now log in.');
      // Redirect to login screen
      this.props.navigator.pop();
      id:'Login';
    })
    .catch((error) => {
      alert('There was an error creating your account.');
    })
    .done()
  }else{
    // Form validation error
    alert('Please fix the errors listed and try again.');
  }
}

render(){
  return (
    <Image source={background}>
      <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={question} style={styles.q}>
            </Image>
          </View>
            <Form
              ref='form'
              type={newUser}
              options={options}
              value={this.state.value}
              onChange={this._onChange}
            />
           <TouchableOpacity onPress={this._handleAdd}>
              <Text style={[styles.button, styles.brownButton]}>Create account</Text>
           </TouchableOpacity>
        </ScrollView>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    flex: 1
  },

  imageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor: 'transparent'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontSize:20,
    fontWeight:'bold'
  },
  brownButton: {
    backgroundColor: 'burlywood'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = Register;
