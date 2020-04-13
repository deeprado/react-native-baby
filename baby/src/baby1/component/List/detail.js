/**
 * Created by marc on 2017/8/7.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ActivityIndicator
} from 'react-native';

import VideoPlayer from './VideoPlayerAndroid';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';

const {width, height}= Dimensions.get('window');
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: this.props.rowData,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            paused: false,
            duration: 0.0,
            currentTime: 0.0,
        }

        this._onLoadStart = this._onLoadStart.bind(this);
        this._onLoad = this._onLoad.bind(this);
        this._onProgress = this._onProgress.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._onError = this._onError.bind(this);
    }

    _onLoadStart(){
        console.log('_onLoadStart');
    }

    _onLoad(data){
        console.log('_onLoad----视频总长度:'+data.duration);
        // this.setState({duration: data.duration});
    }

    _onProgress(data){
        console.log('_onProgress----数据对象：'+JSON.stringify(data));
        // this.setState({currentTime: data.currentTime});
        console.log('_onProgress----当前时间：'+data.currentTime);
    }

    _onEnd(){
        console.log('_onEnd');
        alert('onEnd')
    }
    _onError(error){
        console.log('错误：'+JSON.stringify(error));
    }


    render() {
        let rowData = this.state.rowData;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this._backToList}>
                    视频详情页面
                </Text>
                <View style={styles.videoBox}>
                  <VideoPlayer/>
                </View>
            </View>
        );
    }

    //返回list页面
    _backToList = () => {
        let {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    videoBox: {
        width: width,
        height: 360,
    },
    videoBox:{
        width:width,
        height:360,
        backgroundColor:'black'
    },
    video:{
        width:width,
        height:360,
        backgroundColor:'black'
    },

});