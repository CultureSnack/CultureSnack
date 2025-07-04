import os
import librosa
import soundfile as sf
import shutil
import numpy as np
import requests

class AudioService:
    def __init__(self):
        self.openai_api_key = (os.environ.get("OPENAI_API_KEY") or "").strip()
        self.api_url = os.environ.get(
            "WHISPER_API_URL", "https://api.openai.com/v1/audio/transcriptions"
        )

    def convert_audio(self, input_file: str, output_file: str) -> bool:
        try:
            print(f"🔄 오디오 변환 시작: {input_file} -> {output_file}")
            audio, original_sr = librosa.load(input_file, sr=None)
            print(f"✅ 원본 오디오 로드: {len(audio)} samples, {original_sr}Hz")

            target_sr = 16000
            if original_sr != target_sr:
                audio = librosa.resample(audio, orig_sr=original_sr, target_sr=target_sr)
                print(f"🔄 리샘플링 완료: {original_sr}Hz -> {target_sr}Hz")

            if output_file.lower().endswith('.mp3'):
                self._save_as_mp3(audio, target_sr, output_file)
            else:
                sf.write(output_file, audio, target_sr)
            print(f"✅ 오디오 변환 완료: {output_file}")
            return True

        except Exception as e:
            print(f"❌ 오디오 변환 실패: {e}")
            return self._copy_file(input_file, output_file)

    def _save_as_mp3(self, audio, sample_rate, output_file):
        try:
            from pydub import AudioSegment
            audio_int16 = (audio * 32767).astype(np.int16)
            audio_segment = AudioSegment(
                audio_int16.tobytes(),
                frame_rate=sample_rate,
                sample_width=2,
                channels=1
            )
            audio_segment.export(output_file, format="mp3", bitrate="128k")
            print(f"✅ MP3 저장 완료: {output_file}")

        except ImportError:
            print("⚠️ pydub 없음, WAV로 저장")
            wav_file = output_file.replace('.mp3', '.wav')
            sf.write(wav_file, audio, sample_rate)
        except Exception as e:
            print(f"❌ MP3 저장 실패: {e}")
            wav_file = output_file.replace('.mp3', '.wav')
            sf.write(wav_file, audio, sample_rate)

    def _copy_file(self, src: str, dst: str) -> bool:
        try:
            shutil.copy2(src, dst)
            print(f"✅ 파일 복사 완료: {src} -> {dst}")
            return True
        except Exception as e:
            print(f"❌ 파일 복사 실패: {e}")
            return False

    def transcribe_audio(self, file_path: str) -> str:
        """
        Whisper API(OpenAI 등)로만 동작!
        로컬 모델은 사용하지 않음.
        """
        try:
            print(f"🌐 Whisper API 요청: {file_path}")
            headers = {"Authorization": f"Bearer {self.openai_api_key}"}
            files = {
                'file': open(file_path, 'rb'),
                'model': (None, 'whisper-1'),
                'language': (None, 'ko')
            }
            response = requests.post(self.api_url, headers=headers, files=files)
            if response.ok:
                transcript = response.json().get("text", "")
                print(f"✅ Whisper API 인식 결과: {transcript}")
                return transcript
            else:
                print(f"❌ Whisper API 실패: {response.status_code}, {response.text}")
                return ""
        except Exception as e:
            print(f"❌ Whisper API 에러: {e}")
            return ""

# ========== 사용 예시 ==========
# audio_service = AudioService()
# 변환: audio_service.convert_audio("origin.wav", "converted.mp3")
# 인식: result = audio_service.transcribe_audio("converted.mp3")
# print(result)


# import whisper
# import torch
# import librosa
# import numpy as np
# import os

# # 전역 변수로 모델 저장 (필요할 때만 로딩)
# _model = None

# def _get_model():
#     """모델을 지연 로딩"""
#     global _model
#     if _model is None:
#         print("🎤 Whisper base 모델 로딩 시작...")
#         _model = whisper.load_model("base", device="cuda" if torch.cuda.is_available() else "cpu")
#         print("✅ Whisper base 모델 로딩 완료")
#     return _model

# def transcribe_audio(file_path: str) -> str:
#     try:
#         print(f"📁 음성 파일 처리 시작: {file_path}")
        
#         # ffmpeg 없이 librosa로 오디오 로드
#         print("🔄 librosa로 오디오 파일 로딩...")
#         audio, sr = librosa.load(file_path, sr=16000)  # Whisper는 16kHz 샘플링 레이트 사용
#         print(f"✅ 오디오 로딩 완료: {len(audio)} samples, {sr}Hz")
        
#         model = _get_model()
#         print("🔄 음성 인식 시작...")
        
#         # 직접 오디오 배열을 Whisper에 전달
#         result = model.transcribe(audio, language="ko")
#         transcript = result["text"]
#         print(f"✅ 음성 인식 완료: {transcript}")
#         return transcript
#     except Exception as e:
#         print(f"❌ 음성 인식 실패: {e}")
#         import traceback
#         print(f"❌ 상세 에러: {traceback.format_exc()}")
        
#         # 백업: ffmpeg가 있다면 기존 방식으로 시도
#         try:
#             print("🔄 백업 방식으로 재시도...")
#             model = _get_model()
#             result = model.transcribe(file_path, language="ko")
#             transcript = result["text"]
#             print(f"✅ 백업 방식으로 음성 인식 완료: {transcript}")
#             return transcript
#         except Exception as backup_e:
#             print(f"❌ 백업 방식도 실패: {backup_e}")
#             return ""