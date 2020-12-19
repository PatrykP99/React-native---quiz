import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const TestShortcutTemplate = (props) => {
    const { titleText, tagsText, descriptionText, navigation } = props
    return(
        <TouchableOpacity style={styles.testView} onPress={navigation}>
            <Text style={styles.titleText}>{titleText}</Text>
            <Text style={styles.tagsText}>{'#' + tagsText.join(' #')}</Text>
            <Text style={styles.descriptionText} numberOfLines={2}>{descriptionText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    testView:{
        borderWidth: 1,
        marginBottom: 50,
        marginStart: 20,
        marginEnd: 20
    },
    titleText:{
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginStart: 10,
        fontFamily: 'raleway-medium'
    },
    tagsText:{
        fontSize: 15,
        marginBottom: 20,
        fontFamily: 'roboto-medium',
        textAlign: 'center',
        marginStart: 15,
        color: 'blue'
    },
    descriptionText: {
        fontSize: 15,
        paddingHorizontal: 10,
        textAlign: 'center',
        marginBottom: 20,
        marginStart: 15,
        fontFamily: 'raleway-medium'
    }
})

export {TestShortcutTemplate};