import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

const InputSection = ({ 
    showInput, 
    inputText, 
    setInputText, 
    convertedText, 
    setConvertedText,
    inputRef, 
    handleInputSubmit, 
    handleInputBlur,
    onTextChange
}) => {
    // 입력이나 결과가 있을 때만 표시
    if (!inputText && !convertedText && !showInput) return null;

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
                    onSubmitEditing={handleInputSubmit}
                    onBlur={handleInputBlur}
                    returnKeyType="done"
                />
                
                {/* 변환 결과 */}
                {convertedText ? (
                    <View style={styles.outputSection}>
                        <Text style={styles.convertedText}>{convertedText}</Text>
                        <TouchableOpacity 
                            style={styles.clearButton}
                            onPress={() => {
                                setInputText('');
                                setConvertedText('');
                                if (onTextChange) onTextChange('');
                            }}
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
    outputSection: {
        marginTop: 40,
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