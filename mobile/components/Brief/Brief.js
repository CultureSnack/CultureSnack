import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../utils/theme';
import TopNavigation from './TopNavigation';
import MainContent from './MainContent';
import InputSection from './InputSection';
import ControlButtons from './ControlButtons';
import {
    setInputText,
    setShowInput,
    setIsListening,
    requestExplainText,
    requestExplainAudio,
    clearResult,
    selectInputText,
    selectResult,
    selectLoading,
    selectError,
    selectShowInput,
    selectIsListening
} from '../../store/modules/explainModule';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const Brief = ({ scrollToSection }) => {
    const dispatch = useDispatch();
    
    // Redux 상태
    const inputText = useSelector(selectInputText);
    const result = useSelector(selectResult);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const showInput = useSelector(selectShowInput);
    const isListening = useSelector(selectIsListening);
    
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const inputRef = useRef(null);

    const handleMicPress = async () => {
        if (!isListening) {
            // 음성 인식 시작
            dispatch(setIsListening(true));
            
            try {
                // 실제 음성 인식 구현 (Web Speech API 사용)
                if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    const recognition = new SpeechRecognition();
                    
                    recognition.lang = 'ko-KR';
                    recognition.continuous = false;
                    recognition.interimResults = false;
                    
                    recognition.onresult = (event) => {
                        const transcript = event.results[0][0].transcript;
                        dispatch(setInputText(transcript));
                        dispatch(setShowInput(true)); // 음성 입력 시에도 입력 화면 표시
                        dispatch(setIsListening(false));
                        handleConvert(transcript);
                    };
                    
                    recognition.onerror = (event) => {
                        console.error('음성 인식 오류:', event.error);
                        dispatch(setIsListening(false));
                        // 오류 시 메인 콘텐츠 복원
                        dispatch(setShowInput(false));
                    };
                    
                    recognition.onend = () => {
                        dispatch(setIsListening(false));
                    };
                    
                    recognition.start();
                } else {
                    // Web Speech API 미지원 시 메인 콘텐츠 복원
                    dispatch(setIsListening(false));
                    dispatch(setShowInput(false));
                }
            } catch (error) {
                console.error('음성 인식 초기화 오류:', error);
                dispatch(setIsListening(false));
            }
        } else {
            // 음성 인식 중지
            dispatch(setIsListening(false));
        }
    };

    const handleKeyboardPress = () => {
        dispatch(setShowInput(true));
        
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
    };

    const handleConvert = async (text) => {
        try {
            console.log('🎯 handleConvert 호출됨, 입력 텍스트:', text);
            // 텍스트 API 호출
            await dispatch(requestExplainText(text));
            console.log('✅ requestExplainText 완료');
        } catch (error) {
            console.error('❌ 문화유산 설명 요청 실패:', error);
        }
    };

    const handleInputSubmit = () => {
        console.log('⌨️ handleInputSubmit 호출됨, inputText:', inputText);
        if (inputText.trim()) {
            console.log('✅ 텍스트가 있음, handleConvert 호출');
            handleConvert(inputText);
        } else {
            console.log('❌ 빈 텍스트, handleConvert 호출 안함');
        }
    };

    const handleInputBlur = () => {
        // 입력이 없으면 입력 모드 종료
        if (!inputText.trim()) {
            dispatch(setShowInput(false));
        }
    };

    const handleBackgroundPress = () => {
        // 빈 화면 터치 시 처리 (필요한 경우만)
    };

    const handleTextChange = (text) => {
        dispatch(setInputText(text));
    };

    const handleClearResult = () => {
        dispatch(clearResult());
    };

    return (
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <View style={styles.container}>
                <TopNavigation scrollToSection={scrollToSection} />
                
                <View style={styles.mainContent}>
                    <MainContent 
                        showInput={showInput} 
                        inputText={inputText} 
                        result={result} 
                    />
                    
                    <InputSection 
                        showInput={showInput}
                        inputText={inputText}
                        result={result}
                        loading={loading}
                        error={error}
                        inputRef={inputRef}
                        handleInputSubmit={handleInputSubmit}
                        handleInputBlur={handleInputBlur}
                        onTextChange={handleTextChange}
                        onClearResult={handleClearResult}
                    />
                    
                    <ControlButtons 
                        isListening={isListening}
                        loading={loading}
                        handleMicPress={handleMicPress}
                        handleKeyboardPress={handleKeyboardPress}
                        showInput={showInput}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
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
    mainContent: {
        flex: 1,
        position: 'relative',
    },
});

export default Brief; 