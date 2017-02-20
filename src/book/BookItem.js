/**
 * Created by Administrator on 2017/2/20.
 */
import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";

export default class BookItem extends React.Component {
  static propTypes = {
    row: React.PropTypes.object
  };

  render() {
    let row = this.props.row;
    return (
      <TouchableOpacity style={[styles.row,styles.item]} {...this.props}>
        <View style={styles.center}>
          <Image source={{uri:row.image}} style={styles.book_img}/>
        </View>
        <View style={styles.content}>
          <Text numberOfLines={1}>{row.title}</Text>
          <Text style={[styles.publisher]} numberOfLines={1}>{row.publisher}</Text>
          <Text style={[styles.publisher]} numberOfLines={1}>{row.author}</Text>
        </View>
        <Text style={[styles.price,{marginTop:10,marginRight:4}]}>{row.price}</Text>
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