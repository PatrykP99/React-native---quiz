import React from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image, View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultScreen';
import TestScreen from './screens/TestScreen';

const Drawer = createDrawerNavigator();
export default class App extends React.Component {

    render() {
        return (
            <NavigationContainer>
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
                    <Drawer.Screen name="Result" component={ResultsScreen}/>
                    <Drawer.Screen name="Test #1" component={TestScreen}/>
                    <Drawer.Screen name="Test #2" component={TestScreen}/>
                    <Drawer.Screen name="Test #3" component={TestScreen}/>
                    <Drawer.Screen name="Test #4" component={TestScreen}/>
                    <Drawer.Screen name="Test #5" component={TestScreen}/>
                    <Drawer.Screen name="Test #6" component={TestScreen}/>
                    <Drawer.Screen name="Test #7" component={TestScreen}/>
                    <Drawer.Screen name="Test #8" component={TestScreen}/>
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
    }
});