import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, ProgressBarAndroid, Text} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import { Toolbar } from '../components/Toolbar';
import NetInfo from "@react-native-community/netinfo";

let networkStatus
export default class ResultsScreen extends Component {
    state = {
        refreshing: false,
        setRefreshing: false,
        results: [],
        isLoading: true,
        isConnected: false
    }

   componentDidMount() {
        this.network = NetInfo.addEventListener(state => {
           this.setState({isConnected: state.isConnected})
            networkStatus = state.isConnected

       })
       this.fetchJson(networkStatus)
   }

    fetchJson = (networkStatus) => {
        if(networkStatus === true){
            fetch('http://tgryl.pl/quiz/results?last=100')
                .then((response) => response.json())
                .then((json) => {
                    this.setState({results: json.reverse()});
                })
                .catch((error) => console.error(error))
                .finally(() => {
                    this.setState({isLoading: false});
                });
        }
    }


    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh = () => {
        this.setState({setRefreshing: true})
        this.wait(500).then(() =>{
            this.fetchJson()
            this.setState({setRefreshing: false})});
    }

    item = ({item}) => {
        if(item.type.toString().includes(',')){
            item.type = item.type.toString().replace(',','\n')
        }
        if(item.date === undefined){
            item.date = item.createdOn.toString().slice(0,10)
        }
        return <Row data={[item.nick, item.score + '/' + item.total, item.type, item.date]}
                    textStyle={[styles.text, {fontFamily: 'raleway-medium'}]} style={styles.row} borderStyle={{borderWidth: 1}}/>
    }


    render() {
        const { results, isLoading } = this.state;
        return (
            <View style={styles.container} >
                <Toolbar navigation={() => {this.props.navigation.openDrawer()}} text="Result"/>
                {!this.state.isConnected && (<View style={styles.noNetwork}>
                    <Text style={styles.textNetwork}>No network</Text>
                </View>)}
                {this.state.isConnected && (<View style={{marginTop: 40, marginHorizontal: 23, flex: 1}}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#000'}}>
                        <Row data={['Nick', 'Point', 'Type', 'Date']} style={styles.header} textStyle={[styles.text, {fontFamily: 'roboto-medium'}]}/>
                    </Table>
                    {isLoading ? <ProgressBarAndroid progress={1}/> :
                        <Table style={{borderWidth: 1, marginTop: -1}}>
                            <FlatList data={results}
                                      renderItem= {this.item}
                                      keyExtractor={(item, index) => index.toString()}
                                      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
                            />
                        </Table>
                    }
                </View>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
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
        backgroundColor: '#F7F8FA',
        borderLeftWidth: 1,
    },
    noNetwork: {
        backgroundColor: "#FFFF00",
        alignItems: 'center'
    },
    textNetwork: {
        color: '#FF0000'
    }
});