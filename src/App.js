/**
 * Created by Administrator on 2017/2/20.
 */
import React from "react";
import {PropTypes, StyleSheet, Text, View} from "react-native";
import {TabViewAnimated, TabBar} from "react-native-tab-view";
import BookPage from "./book/BookPage";

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: '1', title: '图书'},
      {key: '2', title: '电影'},
      {key: '3', title: '音乐'}
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({index});
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return <BookPage/>;
      case '2':
        return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]}/>;
      case '3':
        return <View style={[ styles.page, { backgroundColor: '#616ab7' } ]}/>;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1
  }
});