import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { layout, typography, pos } from '../../utils/theme';

export default function SubTitle() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Savor culture{"\n"}lightly,{"\n"}Remember{"\n"}deeply
            </Text>
            <Text 
                style={styles.description}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.6}
            >
                A piece of culture you can't forget.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: pos.y(layout.subtitle.topPercent),
        left: pos.x(layout.subtitle.leftPercent),
        right: pos.x(layout.subtitle.rightPercent),
        height: pos.y(layout.subtitle.heightPercent),
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    title: typography.subtitle.multiLine,
    description: typography.description,
});