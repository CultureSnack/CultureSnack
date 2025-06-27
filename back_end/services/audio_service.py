import os
import librosa
import soundfile as sf
from typing import Optional

class AudioService:
    def __init__(self):
        self.local_mode = os.environ.get("LOCAL_MODE", "false").lower() == "true"
    
    def convert_audio(self, input_file: str, output_file: str) -> bool:
        """오디오 파일 변환 (librosa 사용)"""
        try:
            print(f"🔄 오디오 변환 시작: {input_file} -> {output_file}")
            
            # librosa로 오디오 파일 로드
            audio, original_sr = librosa.load(input_file, sr=None)
            print(f"✅ 원본 오디오 로드: {len(audio)} samples, {original_sr}Hz")
            
            # 16kHz로 리샘플링 (Whisper 최적화)
            target_sr = 16000
            if original_sr != target_sr:
                audio = librosa.resample(audio, orig_sr=original_sr, target_sr=target_sr)
                print(f"🔄 리샘플링 완료: {original_sr}Hz -> {target_sr}Hz")
            
            # 출력 파일 저장 (포맷에 따라 다르게 처리)
            if output_file.lower().endswith('.mp3'):
                # MP3 저장 (pydub 사용)
                self._save_as_mp3(audio, target_sr, output_file)
            else:
                # WAV 등 다른 포맷 저장
                sf.write(output_file, audio, target_sr)
            
            print(f"✅ 오디오 변환 완료: {output_file}")
            return True
            
        except Exception as e:
            print(f"❌ 오디오 변환 실패: {e}")
            # 실패시 원본 파일 복사
            return self._copy_file(input_file, output_file)
    
    def _save_as_mp3(self, audio, sample_rate, output_file):
        """MP3 포맷으로 저장"""
        try:
            from pydub import AudioSegment
            import numpy as np
            
            # float32를 int16으로 변환
            audio_int16 = (audio * 32767).astype(np.int16)
            
            # AudioSegment 생성
            audio_segment = AudioSegment(
                audio_int16.tobytes(),
                frame_rate=sample_rate,
                sample_width=2,  # 16-bit
                channels=1  # mono
            )
            
            # MP3로 내보내기
            audio_segment.export(output_file, format="mp3", bitrate="128k")
            print(f"✅ MP3 저장 완료: {output_file}")
            
        except ImportError:
            # pydub가 없으면 WAV로 저장
            print("⚠️ pydub 없음, WAV로 저장")
            wav_file = output_file.replace('.mp3', '.wav')
            sf.write(wav_file, audio, sample_rate)
        except Exception as e:
            print(f"❌ MP3 저장 실패: {e}")
            # 백업으로 WAV 저장
            wav_file = output_file.replace('.mp3', '.wav')
            sf.write(wav_file, audio, sample_rate)
    
    def _copy_file(self, src: str, dst: str) -> bool:
        """파일 복사 (변환 실패시 대안)"""
        try:
            import shutil
            shutil.copy2(src, dst)
            print(f"✅ 파일 복사 완료: {src} -> {dst}")
            return True
        except Exception as e:
            print(f"❌ 파일 복사 실패: {e}")
            return False 