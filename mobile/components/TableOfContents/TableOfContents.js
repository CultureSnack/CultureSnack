import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { theme, typography } from '../../utils/theme';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const TableOfContents = ({ scrollToSection }) => {
    return (
        <View style={styles.container}>
            {/* 왼쪽 세로 타이틀 */}
            <View style={styles.leftTitle}>
                <Text style={styles.verticalTitle}>Table of Contents</Text>
            </View>

            {/* 오른쪽 상단 로고 */}
            <TouchableOpacity 
                style={styles.topRightLogo}
                onPress={() => scrollToSection && scrollToSection(0)}
            >
                <Image 
                    source={require('../../assets/logo.png')} 
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* 상단 가로선 */}
            <View style={styles.topLine} />

            {/* 메인 콘텐츠 */}
            <View style={styles.mainContent}>
                {/* 한입 요약 */}
                <TouchableOpacity 
                    style={styles.contentItem}
                    onPress={() => scrollToSection && scrollToSection(2)}
                >
                    <Text style={styles.itemTitle}>한입 요약{'\n'}(Brief Bite)</Text>
                    <Text style={styles.itemDescription}>어려운 문화를 쉬운 말로</Text>
                </TouchableOpacity>

                {/* 내 문화 취향 찾기 */}
                <TouchableOpacity 
                    style={[styles.contentItem, styles.disabledItem]}
                    onPress={() => {}}
                >
                    <Text style={styles.itemTitle}>내 문화 취향 찾기{'\n'}(Pick Your Snack)</Text>
                    <Text style={styles.itemDescription}>나는 문화를 어떻게 즐기는 사람일까?</Text>
                    <Text style={styles.comingSoon}>준비중</Text>
                </TouchableOpacity>

                {/* 컬처스낵 사용 설명서 */}
                <TouchableOpacity 
                    style={[styles.contentItem, styles.disabledItem]}
                    onPress={() => {}}
                >
                    <Text style={styles.itemTitle}>컬처스낵 사용 설명서{'\n'}(Snack Guide)</Text>
                    <Text style={styles.itemDescription}>처음이라면? 먼저 확인!</Text>
                    <Text style={styles.comingSoon}>준비중</Text>
                </TouchableOpacity>
            </View>

            {/* 왼쪽 장식 */}
            <View style={styles.leftDecoration}>
                <Image 
                    source={require('../../assets/decorative-1.png')} 
                    style={styles.decorativeImage}
                    resizeMode="contain"
                />
            </View>
            
            {/* 오른쪽 장식 */}
            <View style={styles.rightDecoration}>
                <Image 
                    source={require('../../assets/decorative-2.png')} 
                    style={styles.decorativeImage}
                    resizeMode="contain"
                />
            </View>

            {/* 하단 화살표 */}
            <View style={styles.bottomDecoration}>
                <Text style={styles.arrow}>↓</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        position: 'relative',
        width: screenWidth,
        height: screenHeight,
    },
    leftTitle: {
        position: 'absolute',
        left: -107,
        top: '40%',
        transform: [{ translateY: -100 }, { rotate: '90deg' }],
        zIndex: 10,
    },
    verticalTitle: typography.tableOfContents.verticalTitle,
    topRightLogo: {
        position: 'absolute',
        top: 60,
        right: 30,
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    topLine: {
        position: 'absolute',
        top: 140,
        left: 128,
        right: 30,
        height: 2,
        backgroundColor: theme.colors.primary,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 120,
        paddingRight: 40,
        paddingTop: 180,
        paddingBottom: 100,
    },
    contentItem: {
        width: '100%',
        marginBottom: 25,
        alignItems: 'flex-start',
    },
    itemTitle: {
        ...typography.tableOfContents.itemTitle,
        marginBottom: 12,
    },
    itemDescription: {
        ...typography.tableOfContents.itemDescription,
        width: '100%',
        flexWrap: 'wrap',
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
    leftDecoration: {
        position: 'absolute',
        left: screenWidth * -0.06,
        top: screenHeight * 0.85,
        width: screenWidth * 0.32,
        height: screenWidth * 0.32,
    },
    rightDecoration: {
        position: 'absolute',
        right: screenWidth * -0.07,
        top: screenHeight * 0.85,
        width: screenWidth * 0.32,
        height: screenWidth * 0.32,
    },
    decorativeImage: {
        width: '100%',
        height: '100%',
    },
    arrow: {
        fontSize: 24,
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    disabledItem: {
        opacity: 0.5,
    },
    comingSoon: {
        ...typography.tableOfContents.comingSoon,
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
    },
});

export default TableOfContents; 