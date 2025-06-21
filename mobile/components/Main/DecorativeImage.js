import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { images } from '../../utils/theme';

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
        left: images.decorative.leftX,
        top: images.decorative.y,
        width: images.decorative.size,
        height: images.decorative.size,
    },
    right: {
        position: 'absolute',
        left: images.decorative.rightX,
        top: images.decorative.y,
        width: images.decorative.size,
        height: images.decorative.size,
    },
    img: {
        width: '100%',
        height: '100%',
    },
});