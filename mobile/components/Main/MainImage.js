import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useTheme } from '../../utils/ThemeProvider';
import { scale, verticalScale } from '../../utils/theme';

export default function MainImage() {
    // 기준 크기 (갤럭시 S24 Ultra 기준)
    const baseImageSize = 289;
    const baseLeftPosition = 160;
    const baseTopPosition = 380;

    return (
        <View style={[styles.container, {
            left: scale(baseLeftPosition),
            top: verticalScale(baseTopPosition),
            width: scale(baseImageSize),
            height: scale(baseImageSize),
        }]}>
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
    },
    image: {
        width: '80%',
        height: '80%',
    },
});
