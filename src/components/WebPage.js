/**
 * Created by Administrator on 2017/2/21.
 */
import React from "react";
import {View, WebView,BackAndroid} from "react-native";
import NavigationBar from "react-native-navbar";
import Logger from "../common/Logger";

export default class WebPage extends React.Component {

  state = {
    canGoBack: false
  };

  _backHandler = () => {
    if (this.state.canGoBack) {
      this.refs.webview.goBack()
    } else {
      this.props.navigator.pop()
    }
    return true;
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._backHandler)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._backHandler);
  }

  render() {
    Logger.d(this.props.url);
    const _leftButtonConfig = {
      title: '返回',
      tintColor: '#fff',
      handler: () => {this._backHandler()}
    };
    return (
      <View style={{flex:1}}>
        <NavigationBar
          style={{height:50}}
          title={{title:'详情',tintColor:'#fff'}}
          tintColor='#2196f3'
          leftButton={_leftButtonConfig}/>
        <WebView
          ref="webview"
          onNavigationStateChange={(navState)=>this.setState({canGoBack:navState.canGoBack})}
          source={{uri: this.props.url}}/>
      </View>
    )
  }
}