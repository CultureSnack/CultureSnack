import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { getFont, getFontSize, getLineHeight, getLetterSpacing, scale, verticalScale } from '../../utils/responsive';

export default function MainHeader() {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>CultureSnack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: verticalScale(140),
    },
    logo: {
        color: '#DAA520',
        fontFamily: getFont('bold'),
        fontSize: getFontSize(52),
        letterSpacing: getLetterSpacing(1.7),
        fontWeight: '700',
    },
});