import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Toolbar } from "../components/Toolbar";
import { TestShortcutTemplate } from "../components/TestShortcutTemplate";

export default class HomeScreen extends React.Component {
    constructor() {
        super();

        this.state = {tests: [], isLoading: true, assetsLoaded: false}
    }

    fetchJson = () => {
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ tests: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    async  componentDidMount() {
        this.fetchJson()

    }

    render() {
        const { tests } = this.state;
        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {this.props.navigation.openDrawer()}} text="Home"/>
                <ScrollView>
                    <View>
                        {tests.map((item, key) =>
                            <TestShortcutTemplate navigation={() => {this.props.navigation.navigate('Test', {id: item.id, title: item.name})}} titleText={item.name}
                                                   tagsText={item.tags} descriptionText={item.description} index={key}/>
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
    }
});