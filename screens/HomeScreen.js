import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Toolbar } from "../components/Toolbar";
import { TestShortcutTemplate } from "../components/TestShortcutTemplate";

export default class HomeScreen extends React.Component {
    constructor() {
        super();

    }

    render() {
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore " +
            "et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
            "commodo consequat. Duis aute irure dolor  in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {this.props.navigation.openDrawer()}} text="Home"/>
                <ScrollView>
                    <View>
                        <TestShortcutTemplate navigation={() => {this.props.navigation.navigate('Test #1')}} titleText={"Title test #1"}
                                              tagsText={"#tag1 #tag2"} descriptionText={lorem}/>
                    </View>
                </ScrollView>
                <View style={styles.getResultView}>
                    <Text style={styles.textResult}>Get to know your ranking result</Text>
                    <TouchableOpacity style={styles.buttonResult} onPress={() => this.props.navigation.navigate('Result')}>
                        <Text>Check!</Text>
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
    },
    buttonResult: {
        marginTop: 25,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: "lightgrey",
        paddingVertical: 15,
        paddingHorizontal: 80
    }
});