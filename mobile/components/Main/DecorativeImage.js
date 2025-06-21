import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { imageLayout } from '../../utils/theme';

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
        left: imageLayout.decorativeLeft.x,
        top: imageLayout.decorativeLeft.y,
        width: imageLayout.decorativeSize,
        height: imageLayout.decorativeSize,
    },
    right: {
        position: 'absolute',
        left: imageLayout.decorativeRight.x,
        top: imageLayout.decorativeRight.y,
        width: imageLayout.decorativeSize,
        height: imageLayout.decorativeSize,
    },
    img: {
        width: '100%',
        height: '100%',
    },
});