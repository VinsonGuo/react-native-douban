/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {AppRegistry, Navigator} from "react-native";
import App from "./src/App";
import React from "react";

export default class Douban extends React.Component {
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
