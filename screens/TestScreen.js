import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Toolbar } from "../components/Toolbar";
import { TestTemplate } from "../components/TestTemplate";

export default class TestScreen extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {this.props.navigation.openDrawer()}} text={"Test #1"}/>
                <TestTemplate/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
