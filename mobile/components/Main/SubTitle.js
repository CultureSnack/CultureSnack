import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainLayout, typography, scale } from '../../utils/theme';

export default function SubTitle() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Savor culture{"\n"}lightly,{"\n"}Remember{"\n"}deeply
            </Text>
            <Text style={styles.description}>
                A piece of culture you can't forget.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: mainLayout.subtitle.startY,
        right: mainLayout.subtitle.paddingRight,
        width: '70%',
        height: mainLayout.subtitle.height,
        alignItems: 'flex-end',
    },
    title: {
        ...typography.subtitle,
        textAlign: 'right',
        marginBottom: scale(12),
    },
    description: {
        ...typography.description,
        textAlign: 'center',
    },
});