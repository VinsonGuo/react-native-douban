/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {AppRegistry, Navigator, BackAndroid} from "react-native";
import App from "./src/App";
import React from "react";

export default class Douban extends React.Component {

  _backHandler = () => {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 0) {
      this.navigator.pop();
      return true;
    }
    return false;
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._backHandler)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._backHandler);
  }

  render() {
    return (
      <Navigator
        ref={(nav)=>this.navigator = nav}
        initialRoute={{component:App}}
        renderScene={(route, navigator)=>{
          let Component = route.component;
          return <Component {...route.params} navigator={navigator}/>
        }}
      />
    )
  }
}
AppRegistry.registerComponent('douban', () => Douban);
