import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { theme, debugInfo } from '../utils/theme';
import MainHeader from '../components/Main/MainHeader';
import MainText from '../components/Main/MainText';
import MainImage from '../components/Main/MainImage';
import SubTitle from '../components/Main/SubTitle';
import DecorativeImage from '../components/Main/DecorativeImage';

// 개발 중 디버그 정보 출력
if (__DEV__) {
    debugInfo();
}

const Main = () => (
    <View style={styles.container}>
        <StatusBar 
            barStyle="light-content" 
            backgroundColor={theme.colors.background} 
            translucent={false} 
        />
        
        <MainHeader />
        <MainText />
        <MainImage />
        <SubTitle />
        <DecorativeImage />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        position: 'relative',
    },
});

export default Main;