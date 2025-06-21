import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainLayout, typography, scale } from '../../utils/theme';

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
        height: mainLayout.mainText.height,
        width: '100%',
        paddingLeft: mainLayout.mainText.paddingLeft,
        paddingTop: mainLayout.mainText.paddingTop,
        justifyContent: 'flex-start',
    },
    text: {
        ...typography.mainText,
        marginBottom: scale(2),
    },
});