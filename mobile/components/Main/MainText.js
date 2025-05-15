import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function MainText() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Culture, reimagined in the language of Gen Z.</Text>
            <Text style={[styles.text, { top: 18, width: 136 }]}>Less jargon, more clarity.</Text>
            <Text style={[styles.text, { top: 36, width: 149 }]}>AI reads it. We tell it simply.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 31,
        top: 116,
        width: 245,
        height: 54,
    },
    text: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 245,
        height: 18,
        color: '#F0F0F0',
        fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'PlayfairDisplay-Regular',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        textAlign: 'left',
        letterSpacing: 0.2,
    },
});
