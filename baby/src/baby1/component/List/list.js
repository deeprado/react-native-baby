/**
 * Created by marc on 2017/8/5.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ListView,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';

import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Mock from 'mockjs';
import config from "../Common/config";
import request from '../Common/request';
import Item from "./item";
import Detail from "./detail";

const {width, height} = Dimensions.get('window');
// 设置缓存
let cachedResult = {
    nextPage: 1,
    items: [],
    total: 0,
}
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoadingTail: false,//正在加载状态flag
            isRefreshing: false,//上拉加载flag
        };
    }

    componentDidMount() {
        this._fetchData(1)//从服务器获得真实数据
    }

    /**
     * 请求网络
     * @private
     */
    _fetchData(page) {
        if (page !== 0) {
            this.setState({
                isLoadingTail: true,
            });
        } else {
            this.setState({
                isRefreshing: true,
            });
        }
        console.log('异步请求网络get');
        request.get(config.api.base + config.api.list, {
            accessToken: 'jjjj',
            page: page
        }).then(
            (data) => {
                if (data.success) {
                    //加载成功 保存缓存
                    let items = cachedResult.items.slice();
                    if (page !== 0) {
                        items = items.concat(data.data);
                        cachedResult.nextPage += 1
                    } else {
                        items = data.data.concat(items);
                    }
                    cachedResult.items = items;
                    cachedResult.total = data.total;
                    setTimeout(() => {
                        if (page !== 0) {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(
                                    cachedResult.items
                                ),
                                isLoadingTail: false
                            });
                        } else {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(
                                    cachedResult.items
                                ),
                                isRefreshing: false
                            });
                        }
                    }, 2000);
                }
            }
        ).catch(
            (err) => {
                if (page !== 0) {
                    this.setState({
                        isLoadingTail: false
                    });
                } else {
                    this.setState({
                        isRefreshing: false
                    });
                }
                console.log("err" + err);
            }
        )
    }

    //加载更多数据
    _fetchMoreData = () => {
        if (!this._hasMore() || this.state.isLoadingTail) {
            return
        }
        //请求服务器获取数据
        let page = cachedResult.nextPage;
        this._fetchData(page);
    }
    //上拉加载
    _onRefresh = () => {
        if (!this._hasMore() || this.state.isRefreshing) {
            return
        }
        this._fetchData(0);
    }
    //是否有更多数据
    _hasMore() {
        return cachedResult.items.length !== cachedResult.total;
    }

    //渲染底部footer部分
    _renderFooter = () => {
        //没有数据了
        if (!this._hasMore() && cachedResult.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有数据了...</Text>
                </View>
            );
        }
        //不是正在加载中
        if (!this.state.isLoadingTail) {
            return (
                <View systemIcon={styles.loadingMore}/>
            );
        }
        //正在加载
        return (
            <ActivityIndicator
                style={styles.loadingMore}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        视频列表页面
                    </Text>
                </View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    style={styles.listView}
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={20}
                    renderFooter={this._renderFooter}
                    showsVerticalScrollIndicator={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />
            </View>
        );
    }


    /**
     * 渲染每列
     * @param rowData
     * @private
     */
    _renderRow = (rowData) => {
        return (
            <Item rowData={rowData}
                  onSelect={()=>this._loadPage(rowData)}
                  key={rowData._id}
            />
        );
    }
    // 加载导航到页面
    _loadPage(rowData) {
        let {navigator}=this.props;
        if (navigator) {
            navigator.push({
                name: "detail",
                component: Detail,
                params: {
                    rowData: rowData,
                }
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: "#ee735c",
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: "center",
        color: '#fff',
    },

    listView: {
        paddingTop: 20,
        backgroundColor: '#fff'
    },
    item: {
        width: width,
        marginBottom: 10,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 18,
        padding: 10,
        color: "#333"
    },
    thumb: {
        width: width,
        height: width * 0.56,
        resizeMode: 'cover'
    },
    play: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 23,
        color: '#ed7b66'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.5,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    up: {
        fontSize: 22,
        color: '#333'
    },
    commentIcon: {
        fontSize: 22,
        color: '#333'
    },
    handleText: {
        fontSize: 18,
        color: '#333',
        paddingLeft: 12,
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        color: "#fff",
    },
});
