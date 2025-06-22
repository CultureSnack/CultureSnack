import React, { useRef } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
import { theme, debugInfo } from '../utils/theme';
import MainHeader from '../components/Main/MainHeader';
import MainText from '../components/Main/MainText';
import MainImage from '../components/Main/MainImage';
import SubTitle from '../components/Main/SubTitle';
import DecorativeImage from '../components/Main/DecorativeImage';
import TableOfContents from '../components/TableOfContents/TableOfContents';
import Brief from '../components/Brief/Brief';

// 화면 크기 가져오기
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// 개발 중 디버그 정보 출력
if (__DEV__) {
    debugInfo();
}

const Main = () => {
    const scrollViewRef = useRef(null);

    // 특정 섹션으로 스크롤 이동
    const scrollToSection = (sectionIndex) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                y: screenHeight * sectionIndex,
                animated: true,
            });
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor={theme.colors.background} 
                translucent={false} 
            />
            
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
                decelerationRate="fast"
                snapToInterval={screenHeight}
                snapToAlignment="start"
            >
                {/* 첫 번째 화면 - 메인 */}
                <View style={styles.screen}>
                    <MainHeader />
                    <MainText />
                    <MainImage />
                    <SubTitle />
                    <DecorativeImage />
                </View>

                {/* 두 번째 화면 - 목차 */}
                <View style={styles.screen}>
                    <TableOfContents scrollToSection={scrollToSection} />
                </View>

                {/* 세 번째 화면 - Brief */}
                <View style={styles.screen}>
                    <Brief scrollToSection={scrollToSection} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollView: {
        flex: 1,
    },
    screen: {
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
});

export default Main;