import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Toolbar } from '../components/Toolbar';

export default class ResultsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Nick', 'Points', 'Type', 'Date'],
            tableData: [
                ['nick1', '2/20', 'test1', '12-09-2020'],
                ['nick2', '3/20', 'test1', '12-07-2020'],
                ['nick3', '7/20', 'test1', '12-06-2020'],
                ['nick5', '5/20', 'test1', '11-07-2020'],
                ['nick6', '20/20','test1', '11-07-2020'],
                ['nick7', '11/20','test1', '11-07-2020'],
                ['nick8', '20/20','test1', '11-07-2020'],
            ],
            widthArr: [90, 90, 90, 95],
        }
    }

    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {this.props.navigation.openDrawer()}} text="Result"/>
                <ScrollView horizontal={true}>
                    <View style={{marginBottom: 40, marginHorizontal: 23}}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#000'}}>
                            <Row data={state.tableHead} widthArr={state.widthArr} heightArr={state.heightArr} style={styles.header} textStyle={styles.text}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1}}>
                                <Rows data={state.tableData} widthArr={state.widthArr}  heightArr={state.heightArr} style={styles.row} textStyle={styles.text}/>
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
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
        backgroundColor: '#F7F8FA'
    }
});