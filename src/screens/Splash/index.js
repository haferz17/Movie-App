import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar, View, Text, Image } from 'react-native'
import { AppStyles } from '../../config'
import { hp } from '../../utils/Responsive'

const { font, fontSize, fontColor, color } = AppStyles

const Splash = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={color.black} translucent />
            <Text style={styles.text}>MovieApp</Text>
        </SafeAreaView>
    );
};

export { Splash }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        height: hp(15),
        width: hp(15),
        borderRadius: hp(7.5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.light,
        marginBottom: hp(1)
    },
    icon: {
        height: hp(9),
        resizeMode: 'contain',
    },
    text: {
        fontFamily: font.bold,
        fontSize: fontSize.extra,
        color: fontColor.light
    }
})