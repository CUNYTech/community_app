'use strict';
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View } from 'react-native';

var styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 4
  },

  cellImage: {
    height: 80,
    width: 60,
    marginRight: 8,
    resizeMode: 'contain',
    /* resizes the image inside of any container its in */
  },

  cellTextContainer: {
    flex: 1
  },

  mediaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },

  mediaDescription: {
    fontSize: 12,
    color: '#777',
    flex: 1
  },

  mediaYear: {
    fontWeight: 'bold'
  }

});


//class QuestionCell extends React.Component {
var QuestionCell = React.createClass({

  render: function () {

    return (
          <View>
            <TouchableHighlight
              onPress = { this.props.onSelect }
              onShowUnderlay = { this.props.onHighlight }
              onHideUnderlay = { this.props.onDeHighlight }
            >
              <View style = { styles.cellContainer } >

                  <Image
                    style = { styles.cellImage }
                    source =  {{ uri: this.props.media.artworkUrl100 }}
                  />

                  <View style = { styles.cellTextContainer } >
                      <Text style = { styles.mediaName } numberOfLines = { 1 } >
                        { this.props.media.trackName || this.props.media.collectionName }
                      </Text>
                      <Text style = { styles.mediaDescription } numberOfLines = { 2 } >
                          <Text style = { styles.mediaYear } >
                            { parseInt(this.props.media.releaseDate) }
                          </Text>
                          {" "}-{" "}
                          { this.props.media.longDescription || this.props.media.artistName }
                      </Text>
                  </View>
              </View>
            </TouchableHighlight>
          </View>
      );
   }
});



module.exports = QuestionCell;
