import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';



const Toolbar = (props) => {
    const { text, navigation } = props
    return(
        <View style={styles.toolbarView}>
            <TouchableOpacity style={styles.toolbarButton} onPress={navigation}>
                <Image style={styles.imageStyle} source={require('../assets/menu.png')}/>
            </TouchableOpacity>
            <Text style={styles.toolbarText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    toolbarView:{
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent:'center',
        marginBottom: 50,
        backgroundColor: '#E8E8E8',
    },
    toolbarText:{
        fontSize: 35,
        marginTop: 25,
        marginRight: 70,
        flexGrow: 1,
        textAlign: 'center'

    },
    toolbarButton:{
        fontSize:24,
        height: 50,
        width: 50,
        marginTop: 25,
        marginLeft: 20,
    },
    imageStyle: {
        height: 50,
        width: 50,
    }
})

export {Toolbar};