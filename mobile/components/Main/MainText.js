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
                Z세대의 언어로 다시 쓰는 문화
            </Text>
            <Text 
                style={styles.line2}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
            >
                어려운 말은 줄이고, 이해는 빠르게
            </Text>
            <Text 
                style={styles.line3}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
            >
                AI가 읽고, 쉽게 들려주는 이야기
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
