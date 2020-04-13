/**
 * Created by marc on 2017/8/5.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {cmosLog, cmosConfig} from 'native-cmos-logsdk';
export default class Picture extends Component {
    _logtest() {
        // cmosLog.recordAppEvent("自定义事件Id", "click", "按钮UIButton");
        // cmosLog.recordBusinessEvent("第一个业务日志标题", "第一个业务日志的内容有很多很多，用户可以主动设置");
        cmosLog.beginLoadPageView("我爱你");
    }

    _logtest1(){
        cmosLog.finishLoadPageView("我爱你");
    }

    _logtest2(){
        cmosLog.leavePageView("我爱你");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this._logtest}>
                    我是图片
                </Text>
                <Text style={styles.welcome} onPress={this._logtest1}>
                    再次点击
                </Text>
                <Text style={styles.welcome} onPress={this._logtest2}>
                    离开
                </Text>
            </View>
        );
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
});
