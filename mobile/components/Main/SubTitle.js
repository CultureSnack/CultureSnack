import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFont, getFontSize, getLineHeight, getLetterSpacing, scale, verticalScale } from '../../utils/responsive';

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
        fontFamily: getFont('bold'),
        fontSize: getFontSize(20),
        lineHeight: getLineHeight(40),
        letterSpacing: getLetterSpacing(2.0),
        color: '#F0F0F0',
        fontWeight: '700',
        textAlign: 'right',
        // marginBottom: verticalScale(32),
    },
    desc: {
        fontFamily: getFont(),
        fontSize: getFontSize(12),
        lineHeight: getLineHeight(30),
        letterSpacing: getLetterSpacing(0.8),
        color: '#F0F0F0',
        fontWeight: '400',
        textAlign: 'center',
    },
});
