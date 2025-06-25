import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ActivityIndicator, Image } from 'react-native';
import { theme } from '../../utils/theme';
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
    <View style={inputSectionStyles.container}>
      

      {/* 입력 및 결과, 로딩, 에러 */}
      {(showInput || inputText || result || loading || error) && (
        <View style={inputSectionStyles.inputContent}>
          {/* 입력 텍스트 표시 */}
          {(showInput || inputText) && (
            <Text style={inputSectionStyles.inputText}>{inputText}</Text>
          )}

          {/* 숨겨진 TextInput */}
          {showInput && (
            <TextInput
              ref={inputRef}
              style={inputSectionStyles.hiddenTextInput}
              placeholder=""
              value={inputText}  // 반드시 props.inputText
              onChangeText={onTextChange}  // 반드시 props.onTextChange
              multiline={false}
              blurOnSubmit={true}
              onSubmitEditing={handleInputSubmit}
              onBlur={handleInputBlur}
              returnKeyType="done"
              autoFocus
            />
          )}

          {/* 로딩 표시 */}
          {loading && (
            <View style={inputSectionStyles.loadingSection}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={inputSectionStyles.loadingText}>문화유산 정보를 찾고 있어요...</Text>
            </View>
          )}

          {/* 에러 표시 */}
          {error && !loading && (
            <View style={inputSectionStyles.errorSection}>
              <Text style={inputSectionStyles.errorText}>오류가 발생했습니다: {error}</Text>
              <TouchableOpacity
                style={inputSectionStyles.retryButton}
                onPress={handleInputSubmit}
              >
                <Text style={inputSectionStyles.retryButtonText}>다시 시도</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 결과 표시 */}
          {result && !loading && !error && (
            <View style={inputSectionStyles.outputSection}>
              {result.transcript && (
                <View style={inputSectionStyles.transcriptSection}>
                  {/* <Text style={inputSectionStyles.transcriptLabel}>인식된 음성:</Text> */}
                  <Text style={inputSectionStyles.transcriptText}>{result.transcript}</Text>
                </View>
              )}
              <Text style={inputSectionStyles.convertedText}>{result.summary}</Text>
              {result.audio_url && (
                <TouchableOpacity
                  style={inputSectionStyles.audioButton}
                  onPress={() => playAudio(result.audio_url)}
                >
                  <Image
                    source={require('../../assets/sound.png')}
                    style={{ width: 32, height: 32, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity
                style={inputSectionStyles.clearResultButton}
                onPress={handleClearResult}
              >
                <Text style={inputSectionStyles.clearResultButtonText}>지우기</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </View>
      )}

    {/* 입력 안내 프롬프트 */}
      {!showInput && (
        <Text style={inputSectionStyles.inputPrompt}>말하거나 입력도 가능해요</Text>
      )}
      {/* Control Buttons */}
      <View style={inputSectionStyles.buttonsRow}>
        
        <TouchableOpacity
          style={[inputSectionStyles.micButton, isListening && inputSectionStyles.micButtonActive]}
          onPress={handleMicPress}
          disabled={loading}
        >
          <Image
            source={require('../../assets/audio.png')}
            style={inputSectionStyles.micImage}
          />
          <View style={inputSectionStyles.micButtonInner}>
            <View style={[inputSectionStyles.micIcon, isListening && inputSectionStyles.micIconActive]}>
              <View style={inputSectionStyles.micCore} />
              <View style={inputSectionStyles.micBase} />
              {isListening && (
                <View style={inputSectionStyles.micWave}>
                  <View style={[inputSectionStyles.wave, inputSectionStyles.wave1]} />
                  <View style={[inputSectionStyles.wave, inputSectionStyles.wave2]} />
                  <View style={[inputSectionStyles.wave, inputSectionStyles.wave3]} />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
       <TouchableOpacity style={inputSectionStyles.keyboardButton} onPress={handleKeyboardPress}>
         <View style={inputSectionStyles.keyboardIcon}>
           <View style={inputSectionStyles.keyboardRow}>
             <View style={inputSectionStyles.key} />
             <View style={inputSectionStyles.key} />
             <View style={inputSectionStyles.key} />
             <View style={inputSectionStyles.key} />
           </View>
           <View style={inputSectionStyles.keyboardRow}>
             <View style={inputSectionStyles.key} />
             <View style={inputSectionStyles.key} />
             <View style={inputSectionStyles.key} />
           </View>
           <View style={inputSectionStyles.keyboardRow}>
             <View style={inputSectionStyles.key} />
             <View style={inputSectionStyles.key} />
             <View style={inputSectionStyles.key} />
           </View>
           <View style={inputSectionStyles.keyboardRow}>
             <View style={[inputSectionStyles.key, inputSectionStyles.spaceKey]} />
           </View>
         </View>
         <Text style={inputSectionStyles.keyboardLabel}>입력</Text>
       </TouchableOpacity>
     </View>
    </View>
   );
 };

const inputSectionStyles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: 'absolute',
    bottom: 0,
  },
  inputPrompt: {
    fontSize: 16,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  inputContent: {
    width: '100%',
    marginBottom: 8,
  },
  inputText: {
    fontSize: 20,
    color: theme.colors.text,
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.card,
    marginBottom: 8,
    top: -150, // 부모 기준 상단 정렬
    alignSelf: 'center', // 부모 기준 가로 중앙
  },
  hiddenTextInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  loadingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -250, // 부모 기준 상단 정렬
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 8,
  },
  errorSection: {
    backgroundColor: theme.colors.errorBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 16,
    color: theme.colors.white,
  },
  outputSection: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center', // 가로 중앙 정렬
    justifyContent: 'center', // 세로 중앙 정렬
    alignSelf: 'center', // 부모 기준 가로 중앙
    minHeight: 200, // 충분한 높이 확보(필요시 조정)
    width: '90%', // 넓이 제한(필요시 조정)
    top: -150, // 부모 기준 상단 정렬
  },
  transcriptSection: {
    marginBottom: 8,
  },
  transcriptLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
  },
  transcriptText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  convertedText: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 8,
  },
  audioButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  clearResultButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  clearResultButtonText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  micButton: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    right: -135,
  },
  micButtonActive: {
    backgroundColor: theme.colors.primaryDark,
  },
  micImage: {
    width: 50,
    height: 50,
    tintColor: theme.colors.white,
  },
  micButtonInner: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
    keyboardIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 1,
  },
  key: {
    width: 4,
    height: 3,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
  },
  spaceKey: {
    width: 16,
    height: 3,
  },
  keyboardLabel: {
    fontSize: 8,
    fontFamily: theme.fonts.regular,
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: 2,
  },
  inputPrompt: {
    position: 'absolute',
    width: 200,
    left: '50%',
    marginLeft: -100,
    top: 580,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#F7E7CE',
    textAlign: 'center',
  },
//   keyboardButton: {
//     backgroundColor: theme.colors.secondary,
//     borderRadius: 8,
//     padding: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 64,
//     height: 64,
//   },
//   keyboardIcon: {
//     width: 24,
//     height: 24,
//     tintColor: theme.colors.white,
//   },
//   keyboardLabel: {
//     fontSize: 12,
//     color: theme.colors.white,
//     marginTop: 4,
//   },
//   keyboardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//   },
//   key: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: theme.colors.white,
//   },
//   spaceKey: {
//     flex: 1,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: theme.colors.white,
//     marginHorizontal: 4,
//   },
});

export default InputAndButtonsSection;