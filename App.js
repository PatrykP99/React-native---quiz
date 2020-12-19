import React from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image, View, Text, TouchableOpacity, Modal } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

const Drawer = createDrawerNavigator();

    const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
            return value
        }
    } catch (e) {
        return "error"
    }
}
    const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
    }
}


export default class App extends React.Component {
    state = {
        rulesVisible: false,
        assetsLoaded: false
    }

      componentDidMount() {
        Font.loadAsync({
            'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
            'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf')
        }).then(r => {
             this.setState({ assetsLoaded: true });
         })
        getData().then(r => {
            if (r !== 'cdda') {
                this.setState({rulesVisible:true})
            }
        })
    }

    acceptRules = () => {
        storeData('cdda')
            .then(() => this.setState({rulesVisible: false}));
    }

    render() {
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
                    initialRouteName="Home" drawerContentOptions={{activeTintColor: '#e91e63', }}
                    drawerContent={(props) => {
                        return (
                            <DrawerContentScrollView {...props}>
                                <View style={styles.appNameView}>
                                    <Text style={styles.appNameText}>Quiz App</Text>
                                    <Image style={styles.imageStyle} source={require('./assets/quiz.png')}/>
                                </View>
                                <DrawerItemList {...props} />
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
});