import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Image } from 'react-native';
import { theme, typography } from '../../utils/theme';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const Brief = ({ scrollToSection }) => {
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleMicPress = () => {
        setIsListening(!isListening);
        // 음성 인식 로직 추가 예정
    };

    return (
        <View style={styles.container}>
            {/* 상단 네비게이션 */}
            <View style={styles.topNavigation}>
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => scrollToSection && scrollToSection(1)}
                >
                    <Text style={styles.navText}>Snack Guide</Text>
                </TouchableOpacity>
                
                <View style={styles.navDivider} />
                
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => scrollToSection && scrollToSection(1)}
                >
                    <Text style={styles.navText}>Pick Your Snack</Text>
                </TouchableOpacity>
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

            {/* 메인 콘텐츠 */}
            <View style={styles.mainContent}>
                <Text style={styles.description}>
                    문화 관련 설명이 어렵다면 AI가 요약하고 쉬운말로 바꿔드릴게요.
                </Text>

                <Text style={styles.brandTitle}>CultureSnack</Text>

                <Text style={styles.inputPrompt}>말하거나 입력도 가능해요</Text>

                {/* 텍스트 입력 영역 */}
                <TextInput
                    style={styles.textInput}
                    placeholder="여기에 입력하세요..."
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={inputText}
                    onChangeText={setInputText}
                    multiline={true}
                    textAlignVertical="top"
                />

                {/* 마이크 버튼 */}
                <TouchableOpacity 
                    style={[styles.micButton, isListening && styles.micButtonActive]}
                    onPress={handleMicPress}
                >
                    <Text style={styles.micIcon}>🎤</Text>
                </TouchableOpacity>

                {/* 키보드 아이콘 */}
                <TouchableOpacity style={styles.keyboardButton}>
                    <View style={styles.keyboardIcon}>
                        <View style={styles.keyboardRow}>
                            <View style={styles.key} />
                            <View style={styles.key} />
                            <View style={styles.key} />
                        </View>
                        <View style={styles.keyboardRow}>
                            <View style={styles.key} />
                            <View style={styles.key} />
                            <View style={styles.key} />
                        </View>
                    </View>
                </TouchableOpacity>
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
    topNavigation: {
        position: 'absolute',
        top: 80,
        left: 30,
        right: 100,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },
    navItem: {
        flex: 1,
    },
    navText: typography.brief.navText,
    navDivider: {
        width: 2,
        height: 30,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 20,
    },
    topRightLogo: {
        position: 'absolute',
        top: 60,
        right: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 40,
        height: 40,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 100,
    },
    description: {
        ...typography.brief.description,
        marginBottom: 60,
        paddingHorizontal: 20,
    },
    brandTitle: {
        ...typography.brief.brandTitle,
        marginBottom: 80,
    },
    inputPrompt: {
        ...typography.brief.inputPrompt,
        marginBottom: 30,
    },
    textInput: {
        width: '90%',
        height: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
        padding: 20,
        color: theme.colors.text,
        fontSize: 16,
        marginBottom: 30,
    },
    micButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    micButtonActive: {
        backgroundColor: '#FF6B6B',
        transform: [{ scale: 1.1 }],
    },
    micIcon: {
        fontSize: 32,
        color: theme.colors.background,
    },
    keyboardButton: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardIcon: {
        width: 24,
        height: 16,
    },
    keyboardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    key: {
        width: 6,
        height: 6,
        backgroundColor: theme.colors.primary,
        borderRadius: 1,
    },
});

export default Brief; 