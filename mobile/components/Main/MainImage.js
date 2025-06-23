import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { images } from '../../utils/theme';

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
        width: images.main.size,
        height: images.main.size,
        left: images.main.centerX - (images.main.size / 2),
        top: images.main.centerY - (images.main.size / 2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '85%',
    },
});