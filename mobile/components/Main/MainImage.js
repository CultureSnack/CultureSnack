import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

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
        left: 52,
        top: 160,
        width: 289,
        height: 289,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
