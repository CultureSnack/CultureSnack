import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { theme } from '../utils/theme';
import MainHeader from '../components/Main/MainHeader';
import MainText from '../components/Main/MainText';
import MainImage from '../components/Main/MainImage';
import SubTitle from '../components/Main/SubTitle';
import DecorativeImage from '../components/Main/DecorativeImage';

const Main = () => (
    <View style={styles.container}>
        <StatusBar 
            barStyle="light-content" 
            backgroundColor={theme.colors.background} 
            translucent={false} 
        />
        
        {/* 모든 컴포넌트가 absolute 위치로 배치되어 한 화면에 완벽하게 들어감 */}
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
        position: 'relative', // absolute 위치 기준점
    },
});

export default Main;