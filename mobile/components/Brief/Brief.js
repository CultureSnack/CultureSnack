import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, Text, ActivityIndicator, TextInput, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Audio } from 'expo-av';
import { theme } from '../../utils/theme';
import TopNavigation from './TopNavigation';
import MainContent from './MainContent';
import InputAndButtonsSection from './InputAndButtonsSection';
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

const Brief = ({ scrollToSection, isTableOfContents = false, currentSection }) => {
  const dispatch = useDispatch();

  const inputText = useSelector(selectInputText);
  const result = useSelector(selectResult);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const showInput = useSelector(selectShowInput);
  const isListening = useSelector(selectIsListening);

  const inputRef = useRef(null);
  const recordingRef = useRef(null);
  const soundRef = useRef(null);

  const RECORDING_OPTIONS = {
    android: {
      extension: '.wav',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) throw new Error('마이크 권한이 필요합니다.');
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);
      recordingRef.current = recording;
      dispatch(setIsListening(true));
    } catch (e) {
      dispatch(setIsListening(false));
    }
  };

  const stopRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return null;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      dispatch(setIsListening(false));
      return {
        uri,
        type: 'audio/wav',
        name: `recording-${Date.now()}.wav`,
      };
    } catch (e) {
      dispatch(setIsListening(false));
      return null;
    }
  };

  const handleMicPress = async () => {
    if (!isListening) {
      await startRecording();
    } else {
      const audioFile = await stopRecording();
      if (audioFile) {
        dispatch(requestExplainAudio(audioFile));
      }
    }
  };

  const handleKeyboardPress = () => {
    // 기존 입력이 있어도 새로 입력 모드로 전환
    dispatch(setInputText('')); // 기존 텍스트 클리어
    dispatch(setShowInput(true));
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 150); // 조금 더 긴 지연시간으로 안정성 확보
  };

  const handleConvert = async (text) => {
    try {
      await dispatch(requestExplainText(text));
    } catch (error) {}
  };

  const handleInputSubmit = () => {
    if (inputText && inputText.trim()) {
      // 전송 로직
      handleConvert(inputText);
    }
  };

  const handleInputBlur = () => {
    if (!inputText.trim()) dispatch(setShowInput(false));
  };

  const handleTextChange = (text) => {
    dispatch(setInputText(text));
  };

  const handleClearResult = () => {
    dispatch(clearResult());
  };

  const playAudio = async (url) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      soundRef.current = sound;
      await sound.playAsync();
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.container}>
          <TopNavigation scrollToSection={scrollToSection} isTableOfContents={isTableOfContents} />
          <View style={styles.mainContent}>
            <MainContent 
              showInput={showInput} 
              inputText={inputText} 
              result={result} 
              loading={loading}
              error={error}
              handleInputSubmit={handleInputSubmit}
              handleClearResult={handleClearResult}
              playAudio={playAudio}
            />
            <InputAndButtonsSection
              showInput={showInput}
              inputText={inputText}
              result={result}
              loading={loading}
              error={error}
              inputRef={inputRef}
              isListening={isListening}
              handleInputSubmit={handleInputSubmit}
              handleInputBlur={handleInputBlur}
              onTextChange={handleTextChange}
              handleClearResult={handleClearResult}
              handleMicPress={handleMicPress}
              handleKeyboardPress={handleKeyboardPress}
              playAudio={playAudio}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    width: screenWidth,
    overflow: 'hidden',
    position: 'relative',
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
});

export default Brief;
