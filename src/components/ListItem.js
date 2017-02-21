/**
 * Created by Administrator on 2017/2/20.
 */
import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";

export default class ListItem extends React.Component {
  static propTypes = {
    row: React.PropTypes.object.isRequired,
    position: React.PropTypes.string.isRequired
  };

  _getImageUri = (row, position) => {
    if (position === '2') {
      return row.images.medium;
    } else {
      return row.image;
    }
  };

  _getTitle = (row, position) => {
    return row.title;
  };

  _getDesc = (row, position) => {
    if (position === '1') {
      return row.publisher;
    } else if (position == '2') {
      return row.genres;
    } else {
      return row.tags.map((item) => item.name);
    }
  };

  _getAuthor = (row, position) => {
    if (position === '1') {
      return row.author;
    } else if (position == '2') {
      if (row.directors && row.directors.length) {
        return row.directors[0].name;
      }
    } else {
      if (row.author && row.author.length) {
        return row.author[0].name;
      }
    }
    return '';
  };

  render() {
    let row = this.props.row;
    let position = this.props.position;
    return (
      <TouchableOpacity style={[styles.row,styles.item]} {...this.props}>
        <View style={styles.center}>
          <Image source={{uri:this._getImageUri(row, position)}} style={styles.book_img}/>
        </View>
        <View style={styles.content}>
          <Text numberOfLines={1}>{this._getTitle(row, position)}</Text>
          <Text style={[styles.publisher]} numberOfLines={1}>{this._getDesc(row, position)}</Text>
          <Text style={[styles.publisher]} numberOfLines={1}>{this._getAuthor(row, position)}</Text>
        </View>
        <Text
          style={[styles.price,{marginTop:10,marginRight:4}]}>{row.rating.average + '分'}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },

  item: {
    height: 120,
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#eee',
    borderBottomWidth: 0.5
  },

  book_img: {
    width: 80,
    height: 100,
    resizeMode: Image.resizeMode.contain
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around'
  },

  publisher: {
    color: '#a3a3a3',
    fontSize: 12
  },

  price: {
    color: '#2bb2a3',
    fontSize: 16
  }
});