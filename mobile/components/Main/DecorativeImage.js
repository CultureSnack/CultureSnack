import React from 'react';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import { images, theme } from '../../utils/theme';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

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
            
            {/* 하단 화살표 */}
            <View style={styles.bottomDecoration}>
                <Text style={styles.arrow}>↓</Text>
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
    bottomDecoration: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: screenHeight * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        fontSize: 24,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
});