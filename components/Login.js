//Login Page
import React, { Component } from 'react';
import {
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

const Form = t.form.Form

const newUser = t.struct({
  "username" : t.String,
  "password" :  t.String,
})

const options = {
  fields : {
    password : {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false,
      secureTextEntry: true
    },
  }
}


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: {
        "username" : '',
        "email" : '',
        "password" : '',
        "confirmPassword" : ''
      }
    }
  }

  componentWillUnmount() {
    this.setState = {
      value: {
        "username" : '',
        "password" : null,
      }
    }
  }

  _onChange = (value) => {
    this.setState({
      value
    })
  }

  onButtonPress2(){
    this.props.navigator.push({
      id:'Register'
    });
  }

  _handleAdd = () => {
    const value = this.refs.form.getValue();
    // If the form is valid...
    if(value){
      const data = {
        "username" : value.username,
        "password" : value.password
      }
      // Serialize and post the data
      console.log(data);
      const json = JSON.stringify(data);
      fetch('http://localhost:3000/login', {
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
        // Redirect to main screen
        this.props.navigator.push({
          id:'Main'
        });
      })
      .catch((error) => {
        alert('There was an error logging in.');
      })
      .done()
    }else{
      // Form validation error
      alert('Please fix the errors listed and try again.');
    }
  }

  render(){
    return (
      <Image source= {background}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={question} style={styles.q}>
            </Image>
          </View>

          <View style={styles.formContainer}>
            <Form style
              ref='form'
              type={newUser}
              options={options}
              value={this.state.value}
              onChange={this._onChange}
            />
          </View>
            <TouchableOpacity onPress={this._handleAdd}>
              <Text style={[styles.button, styles.brownButton]}>Sign In</Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
              <TouchableOpacity onPress={this.onButtonPress2.bind(this)} style={styles.registerContainer}>
              <Text style={{fontSize: 15}}>
              New User? Click here to register!
              </Text>
              </TouchableOpacity>
              </View>

              <View style={styles.imageContainer}>
              </View>

            </View>
        </Image>
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
  formContainer:{
    flex:1,
  },
  imageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor: 'transparent'
  },
  button: {
    borderRadius: 10,
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
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})


module.exports = Login;
