import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SubTitle() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Savor culture lightly,{"\n"}Remember{"\n"} deeply</Text>
            <Text style={styles.desc}>A piece of culture you can't forget.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 124,
        top: 464,
        width: 245,
        height: 189,
    },
    title: {
        position: 'absolute',
        left: 15,
        top: 0,
        width: 223,
        height: 177,
        color: '#F0F0F0',
        fontFamily: 'Playfair Display',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 42,
        textAlign: 'right',
    },
    desc: {
        position: 'absolute',
        left: 0,
        top: 140,
        width: 245,
        height: 24,
        color: '#F0F0F0',
        fontFamily: 'Playfair Display',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'right',
    },
});
