import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { mainLayout, typography } from '../../utils/theme';

export default function MainHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>CultureSnack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: mainLayout.header.height,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: mainLayout.header.paddingTop,
    },
    logo: {
        ...typography.logo,
        textAlign: 'center',
    },
});