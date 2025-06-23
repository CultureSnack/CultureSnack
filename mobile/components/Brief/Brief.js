import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { theme } from '../../utils/theme';
import TopNavigation from './TopNavigation';
import MainContent from './MainContent';
import InputSection from './InputSection';
import ControlButtons from './ControlButtons';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const Brief = ({ scrollToSection }) => {
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [convertedText, setConvertedText] = useState('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const inputRef = useRef(null);

    const handleMicPress = async () => {
        if (!isListening) {
            // 음성 인식 시작
            setIsListening(true);
            
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
                        setInputText(transcript);
                        setShowInput(true); // 음성 입력 시에도 입력 화면 표시
                        setIsListening(false);
                        handleConvert(transcript);
                    };
                    
                    recognition.onerror = (event) => {
                        console.error('음성 인식 오류:', event.error);
                        setIsListening(false);
                        // 오류 시 메인 콘텐츠 복원
                        setIsListening(false);
                        setShowInput(false);
                    };
                    
                    recognition.onend = () => {
                        setIsListening(false);
                    };
                    
                    recognition.start();
                } else {
                    // Web Speech API 미지원 시 메인 콘텐츠 복원
                    setIsListening(false);
                    setShowInput(false);
                }
            } catch (error) {
                console.error('음성 인식 초기화 오류:', error);
                setIsListening(false);
            }
        } else {
            // 음성 인식 중지
            setIsListening(false);
        }
    };

    const handleKeyboardPress = () => {
        setShowInput(true);
        setIsKeyboardVisible(true);
        
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
    };

    const handleConvert = (text) => {
        // AI 변환 시뮬레이션
        const converted = "어려운 문화 설명을 쉽게 바꿔드릴게요! 🎭✨";
        setConvertedText(converted);
    };

    const handleInputSubmit = () => {
        if (inputText.trim()) {
            handleConvert(inputText);
        }
    };

    const handleInputBlur = () => {
        setIsKeyboardVisible(false);
        // 입력이 없으면 입력 모드 종료
        if (!inputText.trim()) {
            setShowInput(false);
        }
    };

    const handleBackgroundPress = () => {
        // 빈 화면 터치 시 처리 (필요한 경우만)
    };

    const handleTextChange = (text) => {
        // 텍스트 변경 처리
    };

    return (
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <View style={styles.container}>
                <TopNavigation scrollToSection={scrollToSection} />
                
                <View style={styles.mainContent}>
                    <MainContent 
                        showInput={showInput} 
                        inputText={inputText} 
                        convertedText={convertedText} 
                    />
                    
                    <InputSection 
                        showInput={showInput}
                        inputText={inputText}
                        setInputText={setInputText}
                        convertedText={convertedText}
                        setConvertedText={setConvertedText}
                        inputRef={inputRef}
                        handleInputSubmit={handleInputSubmit}
                        handleInputBlur={handleInputBlur}
                        onTextChange={handleTextChange}
                    />
                    
                    <ControlButtons 
                        isListening={isListening}
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