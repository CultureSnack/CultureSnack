import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/theme';

export default function MainText() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Culture, reimagined in the language of Gen Z.</Text>
            <Text style={styles.text}>Less jargon, more clarity.</Text>
            <Text style={styles.text}>AI reads it. We tell it simply.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: verticalScale(40),
        paddingLeft: scale(30),
        marginTop: verticalScale(20),
    },
    text: {
        fontFamily: 'PlayfairDisplay-Regular',
        fontSize: scale(18),
        lineHeight: verticalScale(38),
        letterSpacing: scale(0.3),
        color: '#F0F0F0',
        marginBottom: verticalScale(4),
        fontWeight: '400',
        flexWrap: 'wrap',
        textAlign: 'left',
    },
});
