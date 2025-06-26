import React from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

const MainContent = ({ showInput, inputText, result, loading, error, handleInputSubmit, handleClearResult, playAudio }) => {
    // 메인 콘텐츠 표시 조건: 입력/로딩/에러/결과가 모두 없을 때
    const shouldShowMainContent = !inputText && !result && !loading && !error;
    
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
            ) : (
                <>
                    {/* 입력 텍스트 표시 */}
                    {inputText && (
                        <TouchableOpacity onPress={handleClearResult} activeOpacity={0.7}>
                            <Text style={styles.inputText}>{inputText}</Text>
                        </TouchableOpacity>
                    )}

                    {/* 로딩 표시 */}
                    {loading && (
                        <View style={styles.loadingSection}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                            <Text style={styles.loadingText}>쉬운 말 변환 중</Text>
                        </View>
                    )}

                    {/* 에러 표시 */}
                    {error && !loading && (
                        <View style={styles.errorSection}>
                            <Text style={styles.errorTitle}>Error</Text>
                            <Text style={styles.errorMessage}>다시 시도해주세요</Text>
                            <TouchableOpacity
                                style={styles.retryButton}
                                onPress={handleInputSubmit}
                            >
                                <Text style={styles.retryButtonText}>↻ 재요청</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* 결과 표시 */}
                    {result && !loading && !error && (
                        <View style={styles.outputSection}>
                            {result.transcript && (
                                <View style={styles.transcriptSection}>
                                    <Text style={styles.transcriptText}>{result.transcript}</Text>
                                </View>
                            )}
                            <Text style={styles.convertedText}>{result.summary}</Text>
                            {result.audio_url && (
                                <TouchableOpacity
                                    style={styles.audioButton}
                                    onPress={() => playAudio(result.audio_url)}
                                >
                                    <Image
                                        source={require('../../assets/sound.png')}
                                        style={{ width: 32, height: 32, resizeMode: 'contain' }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    description: {
        position: 'absolute',
        width: screenWidth * 0.95,
        left: '50%',
        marginLeft: -(screenWidth * 0.95) / 2,
        top: 220, // 250에서 220으로 위로 이동
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
        top: 265, // 295에서 265로 위로 이동
        fontSize: screenWidth * 0.12,
        fontFamily: theme.fonts.semibold,
        color: theme.colors.primary,
        textAlign: 'center',
    },
    inputText: {
        position: 'absolute',
        top: 170, // 200에서 170으로 위로 이동
        left: '50%',
        width: screenWidth * 0.9,
        marginLeft: -(screenWidth * 0.9) / 2,
        fontSize: 20,
        color: '#F7E7CE',
        padding: 16,
        borderRadius: 8,
        backgroundColor: theme.colors.card,
        textAlign: 'center',
    },
    loadingSection: {
        position: 'absolute',
        top: 280, // 320에서 280으로 위로 이동
        left: '50%',
        width: screenWidth * 0.8,
        marginLeft: -(screenWidth * 0.8) / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#DAA520',
        marginLeft: 8,
    },
    errorSection: {
        position: 'absolute',
        top: 270, // 300에서 270으로 위로 이동
        left: '50%',
        width: screenWidth * 0.95,
        marginLeft: -(screenWidth * 0.95) / 2,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorTitle: {
        fontSize: 28,
        color: '#DAA520',
        fontFamily: theme.fonts.semibold,
        marginBottom: 12,
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: '#DAA520',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 20,
        width: '100%',
        flexWrap: 'wrap',
    },
    retryButton: {
        backgroundColor: 'transparent',
        borderColor: '#DAA520',
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    retryButtonText: {
        fontSize: 12,
        color: '#DAA520',
        fontFamily: theme.fonts.regular,
    },
    outputSection: {
        position: 'absolute',
        top: 220, // 250에서 220으로 위로 이동
        left: '50%',
        width: screenWidth * 0.9,
        marginLeft: -(screenWidth * 0.9) / 2,
        backgroundColor: theme.colors.card,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        maxHeight: 200,
    },
    transcriptSection: {
        marginBottom: 8,
    },
    transcriptText: {
        fontSize: 16,
        color: theme.colors.text,
        textAlign: 'center',
    },
    convertedText: {
        fontSize: 20,
        marginTop: 100,
        color: theme.colors.text,
        marginBottom: 16,
        textAlign: 'center',
    },
    audioButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        top: -285, // 오디오 버튼 위치 조정
        right: -150, // 오른쪽 여백 추가,
    },
});

export default MainContent;