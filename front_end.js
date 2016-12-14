//import components needed
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';
import {Provider} from 'react-redux';

var Register = require('./components/Register');
var Login = require('./components/Login');
var Main = require ('./components/Main');
var Question = require('./components/Question');
var Answer = require('./components/Answer');
var Splash = require('./components/Splash');
var QuestionListView = require('./components/QuestionListView');
var NewsFeed= require('./components/NewsFeed');

class Community extends Component {
  render() {
    return (

      <Navigator
        initialRoute= {{
          id:'Splash'
        }}
        renderScene={
          this.navigatorRenderScene
        }
      />
    );
  }

  //Class uses switch statement to navigate between different scenes using their IDs
  navigatorRenderScene(route, navigator){
    _navigator = navigator;
    switch(route.id){
      case'Register':
        return(<Register navigator={navigator} title = "Register" />);

      case'QuestionListView':
        return(<QuestionListView navigator ={navigator} title ="QuestionListView" />);

      case 'Splash':
        return(<Splash navigator={navigator} title = "Splash" />);

      case'Login':
        return(<Login navigator ={navigator} title ="Login" />);

      case'NewsFeed':
        return(<NewsFeed navigator ={navigator} title="NewsFeed"/>);

      case 'Main':
        return(<Main navigator = {navigator} title ="Main" />);

      case 'Answer':
        return(<Answer navigator ={navigator} title ="Answer" />);

      case 'Question':
        return(<Question navigator ={navigator} title ="Question" />);

    }

  }
}

AppRegistry.registerComponent('Community', () => Community);
