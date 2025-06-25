import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { theme } from '../../utils/theme';
import { explainText } from '../../apis/ExplainAPICalls'; // 백엔드 API 호출 함수
import { Audio } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');

const InputSection = ({ 
    showInput, 
    inputText: initialInputText, 
    result: initialResult, 
    loading: initialLoading,
    error: initialError,
    inputRef, 
    onTextChange,
    onClearResult
}) => {
    const [inputText, setInputText] = useState(initialInputText);
    const [result, setResult] = useState(initialResult);
    const [loading, setLoading] = useState(initialLoading);
    const [error, setError] = useState(initialError);
    const [sound, setSound] = useState(null);

    // 입력이나 결과가 있을 때만 표시
    if (!inputText && !result && !showInput) return null;

    const handleInputSubmit = async () => {
        if (!inputText.trim()) return;
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const requestData = { input: inputText };
            // 여기서 백엔드로 요청
            const response = await explainText(inputText); // 내부적으로 apis.post(`/explain/text`, requestData) 호출
            setResult(response);
        } catch (e) {
            setError(e.message || '오류가 발생했습니다.');
        }
        setLoading(false);
    };

    const handleInputBlur = () => {
        // Blur 시 추가 동작이 필요하면 구현
    };

    const playAudio = async (url) => {
        try {
            if (sound) {
                await sound.unloadAsync();
                setSound(null);
            }
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
            setSound(newSound);
            await newSound.playAsync();
        } catch (e) {
            console.error('오디오 재생 오류:', e);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.inputContent}>
                {/* 입력 텍스트 - 화면에 자연스럽게 표시 */}
                {(showInput || inputText) && (
                    <Text style={styles.inputText}>{inputText}</Text>
                )}
                
                {/* 숨겨진 텍스트 입력 필드 */}
                <TextInput
                    ref={inputRef}
                    style={styles.hiddenTextInput}
                    placeholder=""
                    value={inputText}
                    onChangeText={(text) => {
                        setInputText(text);
                        if (onTextChange) {
                            onTextChange(text);
                        }
                    }}
                    multiline={true}
                    blurOnSubmit={false}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Enter' && !nativeEvent.shiftKey) {
                            handleInputSubmit();
                        }
                    }}
                    onSubmitEditing={handleInputSubmit}
                    onBlur={handleInputBlur}
                    returnKeyType="done"
                />
                
                {/* 로딩 표시 */}
                {loading && (
                    <View style={styles.loadingSection}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={styles.loadingText}>문화유산 정보를 찾고 있어요...</Text>
                    </View>
                )}
                
                {/* 에러 표시 */}
                {error && !loading && (
                    <View style={styles.errorSection}>
                        <Text style={styles.errorText}>오류가 발생했습니다: {error}</Text>
                        <TouchableOpacity 
                            style={styles.retryButton}
                            onPress={() => {
                                if (inputText.trim()) {
                                    handleInputSubmit();
                                }
                            }}
                        >
                            <Text style={styles.retryButtonText}>다시 시도</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
                {/* 변환 결과 */}
                {result && !loading && !error ? (
                    <View style={styles.outputSection}>
                        {/* 음성으로 입력했을 경우 transcript 표시 */}
                        {result.transcript && (
                            <View style={styles.transcriptSection}>
                                <Text style={styles.transcriptLabel}>인식된 음성:</Text>
                                <Text style={styles.transcriptText}>{result.transcript}</Text>
                            </View>
                        )}
                        
                        {/* AI 설명 결과 */}
                        <Text style={styles.convertedText}>{result.summary}</Text>
                        
                        {/* 오디오 재생 버튼 (백엔드에서 TTS로 생성된 오디오) */}
                        {result.audio_url && (
                            <TouchableOpacity
                                style={styles.audioButton}
                                onPress={() => playAudio(result.audio_url)}
                            >
                                <Text style={styles.audioButtonText}>🔊 음성으로 듣기</Text>
                            </TouchableOpacity>
                        )}
                        
                        <TouchableOpacity 
                            style={styles.clearButton}
                            onPress={onClearResult}
                        >
                            <Text style={styles.clearButtonText}>새로 입력하기</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    inputContent: {
        position: 'absolute',
        top: 280, // 메인 콘텐츠와 같은 위치에서 시작
        left: 20,
        right: 20,
        paddingTop: 20,
    },
    inputText: {
        fontSize: screenWidth * 0.038,
        fontFamily: theme.fonts.regular,
        color: '#F7E7CE',
        textAlign: 'center',
        marginBottom: 20,
        minHeight: 30,
    },
    hiddenTextInput: {
        position: 'absolute',
        opacity: 0,
        width: 1,
        height: 1,
        left: -1000, // 화면 밖으로 숨김
    },
    loadingSection: {
        alignItems: 'center',
        marginTop: 40,
        padding: 20,
    },
    loadingText: {
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        marginTop: 10,
        textAlign: 'center',
    },
    errorSection: {
        marginTop: 40,
        padding: 20,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 0, 0, 0.3)',
    },
    errorText: {
        fontSize: 14,
        color: '#ff6b6b',
        fontFamily: theme.fonts.regular,
        textAlign: 'center',
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'center',
    },
    retryButtonText: {
        color: '#ff6b6b',
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        textAlign: 'center',
    },
    outputSection: {
        marginTop: 40,
    },
    transcriptSection: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    transcriptLabel: {
        fontSize: 12,
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        opacity: 0.7,
        marginBottom: 5,
    },
    transcriptText: {
        fontSize: 14,
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
        fontStyle: 'italic',
    },
    convertedText: {
        fontSize: 16,
        color: theme.colors.primary,
        backgroundColor: 'rgba(218, 165, 32, 0.1)',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(218, 165, 32, 0.3)',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 24,
    },
    audioButton: {
        backgroundColor: 'rgba(218, 165, 32, 0.2)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(218, 165, 32, 0.3)',
    },
    audioButtonText: {
        color: theme.colors.primary,
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        textAlign: 'center',
    },
    clearButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    clearButtonText: {
        color: theme.colors.text,
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        textAlign: 'center',
    },
});

export default InputSection;