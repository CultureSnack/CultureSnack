import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { designTokens } from '../../utils/theme';

export default function MainImage() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/main-image.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: designTokens.layout.mainImage.left,
        top: designTokens.layout.mainImage.top,
        width: designTokens.layout.mainImage.size,
        height: designTokens.layout.mainImage.size,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: `${designTokens.layout.mainImage.imageScale * 100}%`,
        height: `${designTokens.layout.mainImage.imageScale * 100}%`,
    },
});