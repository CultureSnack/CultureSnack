import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { layout, typography, pos } from '../../utils/theme';

export default function MainText() {
    return (
        <View style={styles.container}>
            <Text 
                style={styles.line1}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
            >
                Culture, reimagined in the language of Gen Z.
            </Text>
            <Text 
                style={styles.line2}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
            >
                Less jargon, more clarity.
            </Text>
            <Text 
                style={styles.line3}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
            >
                AI reads it. We tell it simply.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: pos.y(layout.mainText.topPercent),
        left: pos.x(layout.mainText.leftPercent),
        right: pos.x(layout.mainText.rightPercent),
        height: pos.y(layout.mainText.heightPercent),
        justifyContent: 'flex-start',
    },
    line1: {
        ...typography.mainText.line1,
        marginBottom: pos.y(0.5),
    },
    line2: {
        ...typography.mainText.line2,
        marginBottom: pos.y(0.5),
    },
    line3: {
        ...typography.mainText.line3,
        marginBottom: pos.y(0.5),
    },
});
