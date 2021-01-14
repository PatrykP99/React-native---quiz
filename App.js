import React from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image, View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import * as Font from 'expo-font';
import _ from "lodash";
import {getData, storeData} from "./utils/Storage";
import NetInfo from "@react-native-community/netinfo";

const Drawer = createDrawerNavigator();

export default class App extends React.Component {
    state = {
        rulesVisible: false,
        assetsLoaded: false,
        quizList: [],
    }
    network;

    componentDidMount() {
        Font.loadAsync({
            'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
            'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf')
        }).then(r => {
            this.setState({assetsLoaded: true});
        })

        getData("rules").then(r => {
            if (r !== 'cdda') {
                this.setState({rulesVisible: true})
            }
        })

        this.network = NetInfo.addEventListener(state => {
            this.setState({isConnected: state.isConnected})
        })

        this.fetchDate()

        getData("tests").then(r => {
            this.setState({quizList: _.shuffle(JSON.parse(r))})
        })
    }

    fetchDate = () => {
        let currentDate = new Date()
        getData("updateDate").then(r => {
            if (r !== currentDate.getDay() + ":" + currentDate.getMonth() + ":" + currentDate.getFullYear()) {
                let ids = []
                fetch('http://tgryl.pl/quiz/tests')
                    .then((response) => response.json())
                    .then((json) => {
                        storeData(JSON.stringify(json), "tests").then(r => {
                            this.setState({quizList: _.shuffle(json)})
                        })
                        ids = this.state.quizList.map((item) => item.id)
                    })
                    .then(() => {
                        this.fetchSimpleTest(ids)
                    })
                    .then(() => {
                        storeData(currentDate.getDay() + ":" + currentDate.getMonth() + ":" + currentDate.getFullYear(),"updateDate").then(r => {
                        })
                    })
                    .catch((error) => console.error(error))
            }
        })
    }

    fetchJson = () => {
        const { isConnected, quizList } = this.state;
        if(isConnected === true) {
            let ids = []
            fetch('http://tgryl.pl/quiz/tests')
                .then((response) => response.json())
                .then((json) => {
                    storeData(JSON.stringify(json), "tests").then(r => {
                        this.setState({quizList: _.shuffle(json)})
                    })
                    ids = quizList.map((item) => item.id)
                })
                .then(() => {
                    this.fetchSimpleTest(ids)
                })
                .catch((error) => console.error(error))
        }
    }

    fetchSimpleTest = (ids) =>{
        ids.map((item) =>
            fetch('http://tgryl.pl/quiz/test/' + item)
                .then((response) => response.json())
                .then((json) => {
                    storeData(JSON.stringify(json), item).then(r => {
                    })
                 })
                .catch((error) => console.error(error))
        )
    }

    acceptRules = () => {
        storeData('cdda', "rules")
            .then(() => this.setState({rulesVisible: false}))
    }

    generateTest = (props) => {
        const { quizList } = this.state;
        let simpleTest = _.shuffle(quizList)
        simpleTest = simpleTest[0]
        props.navigate('Test', {id: simpleTest.id, title: simpleTest.name})
    }

    render() {
        if (!this.state.assetsLoaded) {
            return <ActivityIndicator/>;
        }
        return (
            <NavigationContainer>
                <Modal  visible={this.state.rulesVisible}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize: 24}}>Rules:</Text>
                        <Text style={{paddingVertical: 20, paddingBottom:50, fontSize: 16}}>1.Ruleeeeeeeeeeee</Text>
                        <TouchableOpacity style={styles.registerButton} onPress={() => this.acceptRules()}>
                            <Text>Yes boii</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerContent={(props) => {
                        return (
                            <DrawerContentScrollView {...props}>
                                <View style={styles.appNameView}>
                                    <Text style={styles.appNameText}>Quiz App</Text>
                                    <Image style={styles.imageStyle} source={require('./assets/quiz.png')}/>
                                    {!this.state.isConnected && (<View style={styles.noNetwork}>
                                        <Text style={styles.textNetwork}>No network</Text>
                                    </View>)}
                                </View>
                                <TouchableOpacity style={styles.drawerButtons} onPress={() => this.generateTest(props.navigation)}>
                                    <Text>Wygeneruj losowy test</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.drawerButtons} onPress={() => this.fetchJson()}>
                                    <Text>Zaktualizuj testy</Text>
                                </TouchableOpacity>
                                <DrawerItem label={"Home"} onPress={() => props.navigation.navigate('Home')}/>
                                <DrawerItem label={"Result"} onPress={() => props.navigation.navigate('Result')}/>
                                <Text style={styles.drawerText}>Testy :</Text>
                                {this.state.quizList.map((item, key) =>
                                    <DrawerItem label={item.name} onPress={() => props.navigation.navigate('Test', {id: item.id, title: item.name})} key={key}>
                                        <Text>{item.name + item.id}</Text>
                                    </DrawerItem>
                                )}
                            </DrawerContentScrollView>
                        );
                    }}
                >
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Result" component={ResultsScreen} options={{unmountOnBlur:true}}/>
                    <Drawer.Screen name="Test" component={TestScreen} options={{unmountOnBlur:true}}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appNameView: {
        height: 160,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    appNameText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingEnd: 13,

    },
    imageStyle: {
        width: 120,
        height: 120
    },
    modalView: {
        backgroundColor: "#f1f8ff",
        padding: 50,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    registerButton: {
        backgroundColor: "lightgrey",
        borderRadius: 7,
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
    },

    drawerButtons: {
        marginTop: 20,
        paddingVertical: 20,
        marginHorizontal: 40,
        alignItems: 'center',
        backgroundColor: "lightgrey",
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 16
    },
    drawerText: {
        marginHorizontal: 20,
        alignSelf: 'center',
        fontSize: 16
    },
    noNetwork: {
        backgroundColor: "#FFFF00",
        paddingHorizontal: 104,
        marginVertical: 20,
        alignItems: 'center'
    },
    textNetwork: {
        color: '#FF0000'
    }
});