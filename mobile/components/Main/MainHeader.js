import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { designTokens } from '../../utils/theme';

export default function MainHeader() {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>CultureSnack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: designTokens.spacing.headerTop,
    },
    logo: {
        ...designTokens.typography.logo,
    },
});