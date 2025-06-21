import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { designTokens } from '../../utils/theme';

export default function SubTitle() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Savor culture{"\n"} lightly,{"\n"}Remember{"\n"}deeply
            </Text>
            <Text style={styles.desc}>
                A piece of culture you can't forget.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: designTokens.spacing.subTitleTop,
        marginBottom: designTokens.spacing.md,
        paddingRight: designTokens.spacing.decorativeRight,
    },
    title: {
        ...designTokens.typography.subTitle,
        textAlign: 'right',
    },
    desc: {
        ...designTokens.typography.description,
        textAlign: 'center',
    },
});