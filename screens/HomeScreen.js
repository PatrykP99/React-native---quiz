import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl } from 'react-native';
import { Toolbar } from "../components/Toolbar";
import { TestShortcutTemplate } from "../components/TestShortcutTemplate";
import _ from 'lodash'
import {getData} from "../utils/Storage";
import NetInfo from "@react-native-community/netinfo";

export default class HomeScreen extends React.Component {
    state = {
        tests: [],
        isLoading: true,
        assetsLoaded: false,
        isConnected: false,
        refreshing: false,
    }
    network;

    componentDidMount() {
        this.componentDidMountHolder()
    }

    componentDidMountHolder(){
        this.network = NetInfo.addEventListener(state => {
            this.setState({isConnected: state.isConnected})
        })

        getData("tests").then(r => {
            this.setState({tests: _.shuffle(JSON.parse(r))})
        })
    }

    onRefresh = () => {
        this.setState({setRefreshing: true})
        this.wait(500).then(() =>{
            this.componentDidMountHolder()
            this.setState({setRefreshing: false})})
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    render() {
        const { tests } = this.state;
        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {this.props.navigation.openDrawer()}} text="Home"/>
                {!this.state.isConnected && (<View style={styles.noNetwork}>
                    <Text style={styles.textNetwork}>No network</Text>
                </View>)}
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
                    <View>
                        {tests.map((item, key) =>
                            <TestShortcutTemplate navigation={() => {this.props.navigation.navigate('Test', {id: item.id, title: item.name})}} titleText={item.name}
                                                   tagsText={item.tags} descriptionText={item.description} key={key}/>
                        )}
                    </View>
                </ScrollView>
                <View style={styles.getResultView}>
                    <Text style={styles.textResult}>Get to know your ranking result</Text>
                    <TouchableOpacity style={styles.buttonResult} onPress={() => this.props.navigation.navigate('Result')}>
                        <Text style={{fontFamily: 'raleway-medium'}}>Check!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    getResultView: {
        backgroundColor: '#E8E8E8',
        paddingVertical: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 2,
    },
    textResult: {
        fontSize: 20,
        fontFamily: 'roboto-medium'
    },
    buttonResult: {
        marginTop: 25,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: "lightgrey",
        paddingVertical: 15,
        paddingHorizontal: 80
    },
    noNetwork: {
        backgroundColor: "#FFFF00",
        marginBottom: 20,
        alignItems: 'center',
    },
    textNetwork: {
        color: '#FF0000',
    }
});