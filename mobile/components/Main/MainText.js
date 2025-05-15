import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFont, getFontSize, getLineHeight, getLetterSpacing, scale, verticalScale } from '../../utils/responsive';

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
        marginBottom: verticalScale(60),
        paddingLeft: scale(80),
        marginTop: verticalScale(40),
    },
    text: {
        fontFamily: getFont(),
        fontSize: getFontSize(12),
        lineHeight: getLineHeight(38),
        letterSpacing: getLetterSpacing(0.3),
        color: '#F0F0F0',
        marginBottom: verticalScale(4),
        fontWeight: '400',
        flexWrap: 'wrap',
        textAlign: 'left',
    },
});
