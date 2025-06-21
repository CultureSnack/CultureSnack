import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/theme';

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
        marginTop: verticalScale(40),
    },
    logo: {
        color: '#DAA520',
        fontFamily: 'PlayfairDisplay-Bold',
        fontSize: scale(60),
        letterSpacing: scale(4),
        fontWeight: '700',
    },
});