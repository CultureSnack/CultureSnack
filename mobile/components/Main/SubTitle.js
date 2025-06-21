import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/theme';

export default function SubTitle() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Savor culture{"\n"} lightly,{"\n"}Remember{"\n"}deeply</Text>
            <Text style={styles.desc}>A piece of culture you can't forget.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: verticalScale(970),
        marginBottom: verticalScale(20),
        paddingRight: scale(80),
    },
    title: {
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: scale(40),
        lineHeight: verticalScale(60),
        letterSpacing: scale(2.0),
        color: '#F0F0F0',
        fontWeight: '700',
        textAlign: 'right',
    },
    desc: {
        fontFamily: 'PlayfairDisplay-Regular',
        fontSize: scale(20),
        lineHeight: verticalScale(30),
        letterSpacing: scale(0.8),
        color: '#F0F0F0',
        fontWeight: '400',
        textAlign: 'center',
    },
});
