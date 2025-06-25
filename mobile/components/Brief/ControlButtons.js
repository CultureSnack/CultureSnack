import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { theme } from '../../utils/theme';
import { explainAudio, getAudioFile } from '../../apis/ExplainAPICalls';

const { width: screenWidth } = Dimensions.get('window');

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

const ControlButtons = ({ handleKeyboardPress, showInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const recordingRef = useRef(null);

  const startRecording = async () => {
    try {
      console.log('🎙️ 마이크 권한 요청');
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        throw new Error('마이크 권한이 필요합니다.');
      }

      console.log('🔴 녹음 시작');
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(RECORDING_OPTIONS);
      recordingRef.current = recording;
      setIsListening(true);
    } catch (error) {
      console.error('녹음 시작 실패:', error);
      setError(error.message || '녹음 중 오류가 발생했습니다.');
    }
  };

  const stopRecording = async () => {
    try {
      console.log('🛑 녹음 종료');
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      console.log('📁 녹음 파일 URI:', uri);

      setIsListening(false);
      return {
        uri,
        type: 'audio/wav', // 실제 파일 타입과 맞추기
        name: `recording-${Date.now()}.wav`,
      };
    } catch (error) {
      console.error('녹음 종료 실패:', error);
      setError(error.message || '녹음 종료 중 오류가 발생했습니다.');
    }
  };

  const handleMicButtonPress = async () => {
    if (!isListening) {
      await startRecording();
    } else {
      const audioFile = await stopRecording();
      if (!audioFile) return;

      setLoading(true);
      try {
        const result = await explainAudio(audioFile);
        if (result.audio_url) {
          result.audio_url = getAudioFile(result.audio_url);
        }
        setResult(result);
      } catch (e) {
        console.error('오디오 전송 실패:', e);
        setError(e.message || '오류가 발생했습니다.');
      }
      setLoading(false);
    }
  };

  return (
    <>
      {!showInput && (
        <Text style={styles.inputPrompt}>말하거나 입력도 가능해요</Text>
      )}

      <TouchableOpacity
        style={[styles.micButton, isListening && styles.micButtonActive]}
        onPress={handleMicButtonPress}
        disabled={loading}
      >
        <View style={styles.micButtonInner}>
          <View style={[styles.micIcon, isListening && styles.micIconActive]}>
            <View style={styles.micCore} />
            <View style={styles.micBase} />
            {isListening && (
              <View style={styles.micWave}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={handleKeyboardPress}
      >
        <View style={styles.keyboardIcon}>
          <View style={styles.keyboardRow}>
            <View style={styles.key} />
            <View style={styles.key} />
            <View style={styles.key} />
            <View style={styles.key} />
          </View>
          <View style={styles.keyboardRow}>
            <View style={styles.key} />
            <View style={styles.key} />
            <View style={styles.key} />
          </View>
          <View style={styles.keyboardRow}>
            <View style={[styles.key, styles.spaceKey]} />
          </View>
        </View>
        <Text style={styles.keyboardLabel}>입력</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  micButton: {
    position: 'absolute',
    width: 70,
    height: 70,
    left: '50%',
    marginLeft: -35,
    top: 630,
    backgroundColor: theme.colors.primary,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonActive: {
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
    transform: [{ scale: 1.05 }],
  },
  micButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  micIconActive: {
    transform: [{ scale: 1.2 }],
  },
  micCore: {
    width: 16,
    height: 24,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    position: 'absolute',
    top: 0,
  },
  micBase: {
    width: 24,
    height: 6,
    backgroundColor: theme.colors.background,
    borderRadius: 3,
    position: 'absolute',
    bottom: 0,
  },
  micWave: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(218, 165, 32, 0.4)',
    borderRadius: 30,
  },
  wave1: { width: 50, height: 50, borderColor: 'rgba(218, 165, 32, 0.6)' },
  wave2: { width: 40, height: 40, borderColor: 'rgba(218, 165, 32, 0.5)' },
  wave3: { width: 30, height: 30, borderColor: 'rgba(218, 165, 32, 0.4)' },
  keyboardButton: {
    position: 'absolute',
    width: 40,
    height: 50,
    left: 330,
    top: 700,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default ControlButtons;
