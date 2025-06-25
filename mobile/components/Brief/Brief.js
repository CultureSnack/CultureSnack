import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo-av';
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

const Brief = ({ scrollToSection }) => {
  const dispatch = useDispatch();
  const inputText = useSelector(selectInputText);
  const result = useSelector(selectResult);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const showInput = useSelector(selectShowInput);
  const isListening = useSelector(selectIsListening);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const inputRef = useRef(null);
  const recordingRef = useRef(null);

  const handleMicPress = async () => {
    if (!isListening) {
      dispatch(setIsListening(true));
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) throw new Error('마이크 권한이 필요합니다.');

        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);
        recordingRef.current = recording;
      } catch (error) {
        console.error('🎙️ 녹음 시작 오류:', error);
        dispatch(setIsListening(false));
      }
    } else {
      try {
        const recording = recordingRef.current;
        if (!recording) return;

        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        const audioFile = {
          uri,
          type: 'audio/wav',
          name: `recording-${Date.now()}.wav`,
        };

        dispatch(setIsListening(false));
        dispatch(requestExplainAudio(audioFile));
      } catch (error) {
        console.error('🛑 녹음 종료 오류:', error);
        dispatch(setIsListening(false));
      }
    }
  };

  const handleKeyboardPress = () => {
    dispatch(setShowInput(true));
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleConvert = async (text) => {
    try {
      await dispatch(requestExplainText(text));
    } catch (error) {
      console.error('❌ 설명 요청 실패:', error);
    }
  };

  const handleInputSubmit = () => {
    if (inputText.trim()) {
      handleConvert(inputText);
    }
  };

  const handleInputBlur = () => {
    if (!inputText.trim()) {
      dispatch(setShowInput(false));
    }
  };

  const handleBackgroundPress = () => {};
  const handleTextChange = (text) => dispatch(setInputText(text));
  const handleClearResult = () => dispatch(clearResult());

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={styles.container}>
        <TopNavigation scrollToSection={scrollToSection} />
        <View style={styles.mainContent}>
          <MainContent showInput={showInput} inputText={inputText} result={result} />
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
