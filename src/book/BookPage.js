/**
 * Created by Administrator on 2017/2/20.
 */
import React from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import GiftedListView from 'react-native-gifted-listview';
import Api from "../common/Api";
import Toast from "react-native-easy-toast";
import Logger from "../common/Logger";
import BookItem from "./BookItem";

export default class BookPage extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      keywords: 'c语言'
    }
  }

  _loadData = (page = 1, callback, options) => {
    this.setState({isLoading: true});
    let url = `${Api.book_search}?count=10&q=${this.state.keywords}&start=${10 * (page - 1)}`;
    Logger.d(url);
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let books = data.books;
        Logger.d(books);
        if (books && books.length) {
         /* this.setState({
            isLoading: false,
            dataSource: this.ds.cloneWithRows(books)
          });*/
         callback(books);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _renderRow = (row) => {
    return (<BookItem row={row}/>)
  };

  render() {
    return (
      <View style={{flex:1}}>
        <GiftedListView
          enableEmptySections={true}
          rowView={this._renderRow}
          onFetch={this._loadData}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          withSections={false} // enable sections
          refreshableTintColor="blue"/>
        <Toast ref="toast"/>
      </View>
    )
  }
}