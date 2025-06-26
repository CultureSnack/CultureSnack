import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ActivityIndicator, Image } from 'react-native';
import { theme, typography } from '../../utils/theme';
import { Audio } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');

const InputAndButtonsSection = ({
  showInput,
  inputText,
  result,
  loading,
  error,
  inputRef,
  isListening,
  handleInputSubmit,
  handleInputBlur,
  onTextChange,
  handleClearResult,
  handleMicPress,
  handleKeyboardPress,
  playAudio,
}) => {
  return (
    <>
      {/* 숨겨진 TextInput */}
      {showInput && (
        <TextInput
          ref={inputRef}
          style={typography.brief.hiddenTextInput}
          placeholder=""
          value={inputText}
          onChangeText={onTextChange}
          multiline={false}
          blurOnSubmit={true}
          onSubmitEditing={handleInputSubmit}
          onBlur={handleInputBlur}
          returnKeyType="done"
          autoFocus
        />
      )}

      {/* 고정 버튼 영역 - 절대 움직이지 않음 */}
      <View style={typography.brief.container}>
        {/* 입력 안내 프롬프트 */}
        <Text style={typography.brief.inputPrompt}>말하거나 입력도 가능해요</Text>

        {/* Control Buttons */}
        <View style={typography.brief.buttonsRow}>
          <TouchableOpacity
            style={[typography.brief.micButton, isListening && typography.brief.micButtonActive]}
            onPress={() => {
              handleClearResult();
              handleMicPress();
            }}
            disabled={loading}
          >
            <Image
              source={require('../../assets/audio.png')}
              style={[typography.brief.micImage, isListening && typography.brief.micImageActive]}
            />
          </TouchableOpacity>
          <TouchableOpacity style={typography.brief.keyboardButton} onPress={inputText ? handleClearResult : () => {
            // 항상 입력 모드로 전환하고 키패드 표시
            handleKeyboardPress();
          }}>
            <View style={typography.brief.keyboardIcon}>
              <View style={typography.brief.keyboardRow}>
                <View style={typography.brief.key} />
                <View style={typography.brief.key} />
                <View style={typography.brief.key} />
                <View style={typography.brief.key} />
              </View>
              <View style={typography.brief.keyboardRow}>
                <View style={typography.brief.key} />
                <View style={typography.brief.key} />
                <View style={typography.brief.key} />
              </View>
              <View style={typography.brief.keyboardRow}>
                <View style={[typography.brief.key, typography.brief.spaceKey]} />
              </View>
            </View>
            <Text style={typography.brief.keyboardLabel}>입력</Text>
          </TouchableOpacity>
        </View>
        
        {/* 안내 프롬프트를 버튼 아래에 위치 */}
        {isListening && (
          <Text style={typography.brief.inputPromptRow}>음성은 말한 후 다시 버튼을 눌러주세요</Text>
        )}
      </View>
    </>
  );
};



export default InputAndButtonsSection;