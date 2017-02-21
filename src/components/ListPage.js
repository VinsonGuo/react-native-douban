/**
 * Created by Administrator on 2017/2/20.
 */
import React from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import GiftedListView from "react-native-gifted-listview";
import Api from "../common/Api";
import ToastUtil from "../common/ToastUtil";
import Logger from "../common/Logger";
import ListItem from "./ListItem";

export default class ListPage extends React.Component {
  static propTypes = {
    keywords: React.PropTypes.string.isRequired,
    position: React.PropTypes.string.isRequired
  };

  constructor(prop) {
    super(prop);
    this.state = {
      keywords: this.props.keywords
    }
  }

  _loadData = (page = 1, callback, options) => {
    this.setState({isLoading: true});
    let host = Api.book_search;
    switch (this.props.position) {
      case '1':
        host = Api.book_search;
        break;
      case '2':
        host = Api.movie_search;
        break;
      case '3':
        host = Api.music_search;
        break;
    }
    let url = `${host}?count=10&q=${this.state.keywords}&start=${10 * (page - 1)}`;
    Logger.d(url);
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        Logger.d(data);
        switch (this.props.position) {
          case '1':
            return data.books;
          case '2':
            return data.subjects;
          case '3':
            return data.musics;
        }
      })
      .then((books) => {
        callback(books);
      })
      .catch((error) => {
        Logger.e(error);
        ToastUtil.show(error.toString());
      });
  };

  _renderRow = (row) => {
    return (
      <ListItem
        row={row}
        onPress={()=>ToastUtil.show(JSON.stringify(row))}
        position={this.props.position}/>
    )
  };

  _onEndReached = () => {
    this.refs.listview._onPaginate()
  };

  render() {
    return (
      <View style={{flex:1}}>

        <GiftedListView
          ref="listview"
          headerView={()=>{
            return(
              <TextInput
                underlineColorAndroid='transparent'
                style={styles.input}
                autoCapitalize='none'
                clearButtonMode='while-editing'
                value={this.state.keywords}
                onChangeText={(keywords)=>this.setState({keywords})}
                onSubmitEditing={()=>{this.refs.listview._refresh()}}/>
             )
          }}
          rowHasChanged={(r1,r2)=>{r1.id !== r2.id}}
          enableEmptySections={true}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={40}
          rowView={this._renderRow}
          onFetch={this._loadData}
          firstLoader={true} // display a loader for the first fetching
          pagination={false} // enable infinite scrolling using touch to load more
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableTintColor="blue"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 14,
    borderColor: '#666',
    borderWidth: 0.5,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 10,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 4
  }
});

