/**
 * Created by Administrator on 2017/2/20.
 */
import React from "react";
import {PropTypes, StyleSheet, Text, View} from "react-native";
import {TabViewAnimated, TabBar} from "react-native-tab-view";
import ListPage from "./components/ListPage";

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
        return <ListPage keywords={'Java'} position={route.key}/>;
      case '2':
        return <ListPage keywords={'星球大战'} position={route.key}/>;
      case '3':
        return <ListPage keywords={'华语'} position={route.key}/>;
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