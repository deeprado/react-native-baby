/**
 * Created by marc on 2017/8/5.
 */
/**
 * 统一作为android和ios的入口
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {Navigator} from "react-native-deprecated-custom-components"
import List from './component/List/list';
import Edit from './component/Edit/edit';
import Picture from './component/Picture/picture';
import Account from './component/Account/account';
import Login from './component/Account/login';
import DfyTabBar from './DfyTabBar';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabNames: ["视频", "录制", "图片", "我的"],
            tabIconNames: ['ios-videocam', 'ios-recording', 'ios-reverse-camera', 'ios-contact'],
        };
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                renderTabBar={()=><DfyTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                tabBarPosition='bottom'
                onChangeTab={
                    (obj)=>{
                        console.log('被选中的tab下标:'+obj.i);
                    }
                }
                onScroll={
                    (position)=>{
                        console.log("滑动时的位置:"+position)
                    }
                }
                locked={false}
                initialPage={3}
                prerenderingSiblingsNumber={1}
            >
                <Navigator
                    tabLabel="list"
                    initialRoute={{name:"list",component:List}}
                    //配置场景
                    configureScene={
                        (route)=>{
                            return({
                                 ...Navigator.SceneConfigs.PushFromRight,
                                    gestures: null
                            });
                        }
                    }
                    renderScene={
                        (route, navigator) =>{
                            let Component = route.component;
                            return <Component {...route.params} navigator={navigator} />
                        }
                    }
                />

                <Edit tabLabel="edit"/>

                <Picture tabLabel="pic"/>

                <Login tabLabel="account"/>
            </ScrollableTabView>
        );
    }
}


