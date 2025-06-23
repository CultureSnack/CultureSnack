import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { layout, typography, pos } from '../../utils/theme';

export default function MainHeader() {
    return (
        <View style={styles.container}>
            <Text 
                style={styles.logo}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.6}
            >
                CultureSnack
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: pos.y(layout.header.topPercent),
        width: '100%',
        height: pos.y(layout.header.heightPercent),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: typography.logo,
});