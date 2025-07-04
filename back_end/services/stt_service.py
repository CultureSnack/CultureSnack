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

    def convert_audio(self, input_file: str, output_file: str) -> str:
        """
        오디오 파일을 16kHz PCM wav로 변환하여 저장.
        output_file 파라미터가 wav가 아니면 확장자 강제로 wav로 변경.
        반환값: 실제 저장된 wav 파일 경로(str)
        """
        try:
            print(f"🔄 오디오 변환 시작: {input_file} -> {output_file}")
            audio, original_sr = librosa.load(input_file, sr=None)
            print(f"✅ 원본 오디오 로드: {len(audio)} samples, {original_sr}Hz")

            target_sr = 16000
            if original_sr != target_sr:
                audio = librosa.resample(audio, orig_sr=original_sr, target_sr=target_sr)
                print(f"🔄 리샘플링 완료: {original_sr}Hz -> {target_sr}Hz")

            # output_file 확장자를 무조건 .wav로
            if not output_file.lower().endswith('.wav'):
                output_file = output_file.rsplit('.', 1)[0] + '.wav'

            sf.write(output_file, audio, target_sr, format='WAV', subtype='PCM_16')
            print(f"✅ WAV 저장 완료: {output_file}")
            return output_file

        except Exception as e:
            print(f"❌ 오디오 변환 실패: {e}")
            if self._copy_file(input_file, output_file):
                return output_file
            return ""

    def _copy_file(self, src: str, dst: str) -> bool:
        """파일 복사 (변환 실패시 대안)"""
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
        file_path는 반드시 wav 파일이어야 함.
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
# wav_path = audio_service.convert_audio("origin.mp3", "converted.wav")  # 입력 확장자 상관없이 .wav로 변환
# result = audio_service.transcribe_audio(wav_path)
# print(result)

# ========== 주석 처리된 Whisper 코드 ==========

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