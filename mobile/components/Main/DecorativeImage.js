import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { designTokens } from '../../utils/theme';

export default function DecorativeImage() {
    return (
        <>
            <View style={styles.left}>
                <Image 
                    source={require('../../assets/decorative-1.png')} 
                    style={styles.img}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.right}>
                <Image 
                    source={require('../../assets/decorative-2.png')} 
                    style={styles.img}
                    resizeMode="contain"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        left: designTokens.layout.decorativeLeft.left,
        top: designTokens.layout.decorativeLeft.top,
        width: designTokens.layout.decorativeLeft.size,
        height: designTokens.layout.decorativeLeft.size,
    },
    right: {
        position: 'absolute',
        left: designTokens.layout.decorativeRight.left,
        top: designTokens.layout.decorativeRight.top,
        width: designTokens.layout.decorativeRight.size,
        height: designTokens.layout.decorativeRight.size,
    },
    img: {
        width: '100%',
        height: '100%',
    },
});