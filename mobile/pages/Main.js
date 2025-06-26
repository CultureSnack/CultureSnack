import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme, debugInfo } from '../utils/theme';
import MainHeader from '../components/Main/MainHeader';
import MainText from '../components/Main/MainText';
import MainImage from '../components/Main/MainImage';
import SubTitle from '../components/Main/SubTitle';
import DecorativeImage from '../components/Main/DecorativeImage';
import TableOfContents from '../components/TableOfContents/TableOfContents';
import Brief from '../components/Brief/Brief';
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// 개발 중 디버그 정보 출력
if (__DEV__) {
    debugInfo();
}

const Main = () => {
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();
    const [currentSection, setCurrentSection] = React.useState(0);
    const [isScrollingProgrammatically, setIsScrollingProgrammatically] = React.useState(false);

    // 특정 섹션으로 스크롤 이동
    const scrollToSection = (sectionIndex) => {
        if (scrollViewRef.current) {
            // 프로그래매틱 스크롤 시작
            setIsScrollingProgrammatically(true);
            // 즉시 currentSection 업데이트 (특히 한입요약 버튼용)
            setCurrentSection(sectionIndex);
            scrollViewRef.current.scrollTo({
                y: screenHeight * sectionIndex,
                animated: true,
            });
            // 스크롤 완료 후 플래그 해제 (약간의 여유시간)
            setTimeout(() => {
                setIsScrollingProgrammatically(false);
            }, 800);
        }
    };

    // 스크롤 변화 감지 - 더 부드럽게
    const handleScroll = (event) => {
        // 프로그래매틱 스크롤 중에는 무시
        if (isScrollingProgrammatically) {
            return;
        }
        
        const scrollY = event.nativeEvent.contentOffset.y;
        const section = Math.floor(scrollY / screenHeight + 0.5); // 50% 지점에서 변경
        if (section !== currentSection && section >= 0 && section <= 2) {
            setCurrentSection(section);
        }
    };

    // 네비게이션 바 강제 표시


    // route params에서 scrollToSection이 있으면 자동으로 스크롤
    useEffect(() => {
        if (route.params?.scrollToSection !== undefined) {
            // 즉시 currentSection 업데이트
            setCurrentSection(route.params.scrollToSection);
            // 컴포넌트가 완전히 마운트된 후 스크롤
            setTimeout(() => {
                scrollToSection(route.params.scrollToSection);
            }, 100);
        }
    }, [route.params]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar 
                style="light"
                backgroundColor={theme.colors.background}
                translucent={false}
            />
            <View style={styles.container}>
                <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
                decelerationRate="fast"
                snapToInterval={screenHeight}
                snapToAlignment="start"
                onScroll={handleScroll}
                scrollEventThrottle={100}
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
                    <TableOfContents scrollToSection={scrollToSection} navigation={navigation} />
                </View>

                {/* 세 번째 화면 - Brief */}
                <View style={styles.screen}>
                    <Brief 
                        scrollToSection={scrollToSection} 
                        navigation={navigation}
                        isTableOfContents={currentSection === 1}
                        currentSection={currentSection}
                    />
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
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