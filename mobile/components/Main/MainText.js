import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { designTokens } from '../../utils/theme';

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
        marginBottom: designTokens.spacing.contentGap,
        paddingLeft: designTokens.spacing.textLeft,
        marginTop: designTokens.spacing.textMarginTop,
    },
    text: {
        ...designTokens.typography.mainText,
        marginBottom: designTokens.spacing.textMarginBottom,
        flexWrap: 'wrap',
        textAlign: 'left',
    },
});