import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default function DecorativeImage() {
    return (
        <>
            <View style={styles.left}>
                <Image source={require('../../assets/decorative-1.png')} style={styles.img} />
            </View>
            <View style={styles.right}>
                <Image source={require('../../assets/decorative-2.png')} style={styles.img} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        left: -54,
        top: 570,
        width: 262,
        height: 262,
    },
    right: {
        position: 'absolute',
        left: 185,
        top: 570,
        width: 262,
        height: 262,
    },
    img: {
        width: '100%',
        height: '100%',
    },
});
