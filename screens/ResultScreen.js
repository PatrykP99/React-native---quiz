import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import {Table, Row} from 'react-native-table-component';
import { Toolbar } from '../components/Toolbar';

const result =[
    {
        'nick': 'nick1',
        'score': 2,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    },
    {
        'nick': 'nick2',
        'score': 3,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    },
    {
        'nick': 'nick3',
        'score': 6,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    },
    {
        'nick': 'nick4',
        'score': 7,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    },
    {
        'nick': 'nick5',
        'score': 6,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    },
    {
        'nick': 'nick6',
        'score': 6,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    },
    {
        'nick': 'nick7',
        'score': 6,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    },
    {
        'nick': 'nick8',
        'score': 6,
        'total': 20,
        'type': 'test1',
        'date': '12-09-2020'
    }
]


export default class ResultsScreen extends Component {
    constructor() {
        super();

        this.state = {refreshing: false, setRefreshing: false,}
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh = () => {
        this.setState({setRefreshing: true})
        this.wait(2000).then(() => this.setState({setRefreshing: false}));
    }

    item = ({item}) => {
        return <Row data={[item.nick, item.score + '/' + item.total, item.type, item.date]}
                    textStyle={styles.text} style={styles.row} borderStyle={{borderWidth: 1}}/>
    }

    render() {
        return (
            <View style={styles.container} >
                <Toolbar navigation={() => {this.props.navigation.openDrawer()}} text="Result"/>
                <View style={{marginBottom: 40, marginHorizontal: 23, flex: 1}} >
                    <Table borderStyle={{borderWidth: 1, borderColor: '#000'}} >
                        <Row data={['Nick', 'Point', 'Type', 'Date']} style={styles.header} textStyle={styles.text}/>
                    </Table>
                    <Table style = {{borderWidth: 1, marginTop: -1}}>
                            <FlatList data={result}
                                      renderItem={this.item}
                                      keyExtractor={(item, index) => index.toString()}
                                      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
                            />
                    </Table>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {height: 40, backgroundColor: '#f1f8ff'},
    header: {
        height: 50,
        backgroundColor: 'lightgray',
        alignContent: 'center'
    },
    wrapper: {
        flexDirection: 'row'
    },
    dataWrapper: {
        marginTop: -1
    },
    text: {
        textAlign: 'center',
        fontWeight: '200'
    },
    row: {
        height: 100,
        backgroundColor: '#F7F8FA',
        borderLeftWidth: 1,
    }
});