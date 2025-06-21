import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { imageLayout } from '../../utils/theme';

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
        width: imageLayout.main.size,
        height: imageLayout.main.size,
        left: imageLayout.main.centerX - imageLayout.main.size / 2,
        top: imageLayout.main.centerY - imageLayout.main.size / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '85%',
        height: '85%',
    },
});