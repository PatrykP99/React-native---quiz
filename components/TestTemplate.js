import React from 'react';
import {StyleSheet, Text, View, ProgressBarAndroid, TouchableOpacity} from 'react-native';
import { tasks } from "../screens/TestScreen";
const TestTemplate = () => {

    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore " +
        "et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
        "commodo consequat. Duis aute irure dolor  in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


    return(
            <View style={{alignContent: 'center'}}>
                <View style={styles.rowDirect}>
                    <Text style={styles.firstText}>Question 3 of 10</Text>
                    <Text style={styles.firstText}>Time: 28 sec</Text>
                </View>
                <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.15} style={styles.progressBar}
                />
                <Text style={styles.questionText}>This is some example of a long question to fill the content ?</Text>
                <Text style={styles.loremText} numberOfLines={2}>{lorem}</Text>
                <View style={styles.answersView}>
                    <View style={[styles.rowDirect, {marginVertical: 20}]}>
                        <TouchableOpacity onPress={tmp}  style={styles.answerTouchable}><Text style={styles.answerText}>Answer A</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.answerTouchable}><Text style={styles.answerText}>Answer B</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.rowDirect, {marginVertical: 20}]}>
                        <TouchableOpacity style={styles.answerTouchable}><Text style={styles.answerText}>Answer C</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.answerTouchable}><Text style={styles.answerText}>Answer D</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowDirect: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstText:{
        paddingHorizontal: 20,
        fontSize: 21
    },
    progressBar: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    questionText: {
        fontSize: 27,
        textAlign: 'center',
    },
    loremText: {
        marginTop: 35,
        marginHorizontal: 20,
        fontSize: 13,
    },
    answersView: {
        marginVertical: 35,
        marginHorizontal: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 2,
        backgroundColor: '#E8E8E8',
    },
    answerText: {
        fontSize: 15,
    },
    answerTouchable: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 12,
        backgroundColor: "lightgrey",
        borderRadius: 7
    }
});

export {TestTemplate};