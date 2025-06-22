import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { layout, typography, pos } from '../../utils/theme';

export default function SubTitle() {
    return (
        <View style={styles.container}>
            <Text 
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
            >
            문화를 가볍게 즐기고, 깊이 기억하세요.
            </Text>
            <Text 
                style={styles.description}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.6}
            >
                자꾸 생각나는 문화 한 조각
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...typography.subtitle.multiLine,
        fontSize: typography.subtitle.multiLine.fontSize * 0.8,
        lineHeight: typography.subtitle.multiLine.lineHeight * 0.8,
        textAlign: 'center',
    },
    description: typography.description,
});