import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

const MainContent = ({ showInput, isFirstTime, inputText, convertedText }) => {
    // 메인 콘텐츠 표시 조건: 입력도 결과도 없을 때
    const shouldShowMainContent = !inputText && !convertedText;
    
    return (
        <>
            {shouldShowMainContent ? (
                <>
                    <Text 
                        style={styles.description}
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        minimumFontScale={0.8}
                    >
                        문화 관련 설명이 어렵다면 AI가 요약하고 쉬운말로 바꿔드릴게요.
                    </Text>

                    <Text 
                        style={styles.brandTitle}
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        minimumFontScale={0.8}
                    >
                        CultureSnack
                    </Text>
                </>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    description: {
        position: 'absolute',
        width: screenWidth * 0.95,
        left: '50%',
        marginLeft: -(screenWidth * 0.95) / 2,
        top: 280, // 220에서 280으로 60px 아래로
        fontSize: screenWidth * 0.038,
        fontFamily: theme.fonts.regular,
        color: '#F7E7CE',
        textAlign: 'center',
    },
    brandTitle: {
        position: 'absolute',
        width: screenWidth * 0.9,
        left: '50%',
        marginLeft: -(screenWidth * 0.9) / 2,
        top: 325, // 265에서 325로 60px 아래로
        fontSize: screenWidth * 0.12,
        fontFamily: theme.fonts.semibold,
        color: theme.colors.primary,
        textAlign: 'center',
    },

});

export default MainContent; 