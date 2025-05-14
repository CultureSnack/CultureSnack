import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MainHeader() {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>CultureSnack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 21,
        top: 47,
        width: 351,
        height: 67,
    },
    logo: {
        color: '#DAA520',
        fontSize: 56,
        fontWeight: '600',
        fontFamily: 'Playfair Display',
        lineHeight: 67,
    },
});