import whisper
import torch
import librosa
import numpy as np
import os

# 전역 변수로 모델 저장 (필요할 때만 로딩)
_model = None

def _get_model():
    """모델을 지연 로딩"""
    global _model
    if _model is None:
        print("🎤 Whisper base 모델 로딩 시작...")
        _model = whisper.load_model("base", device="cuda" if torch.cuda.is_available() else "cpu")
        print("✅ Whisper base 모델 로딩 완료")
    return _model

def transcribe_audio(file_path: str) -> str:
    try:
        print(f"📁 음성 파일 처리 시작: {file_path}")
        
        # ffmpeg 없이 librosa로 오디오 로드
        print("🔄 librosa로 오디오 파일 로딩...")
        audio, sr = librosa.load(file_path, sr=16000)  # Whisper는 16kHz 샘플링 레이트 사용
        print(f"✅ 오디오 로딩 완료: {len(audio)} samples, {sr}Hz")
        
        model = _get_model()
        print("🔄 음성 인식 시작...")
        
        # 직접 오디오 배열을 Whisper에 전달
        result = model.transcribe(audio, language="ko")
        transcript = result["text"]
        print(f"✅ 음성 인식 완료: {transcript}")
        return transcript
    except Exception as e:
        print(f"❌ 음성 인식 실패: {e}")
        import traceback
        print(f"❌ 상세 에러: {traceback.format_exc()}")
        
        # 백업: ffmpeg가 있다면 기존 방식으로 시도
        try:
            print("🔄 백업 방식으로 재시도...")
            model = _get_model()
            result = model.transcribe(file_path, language="ko")
            transcript = result["text"]
            print(f"✅ 백업 방식으로 음성 인식 완료: {transcript}")
            return transcript
        except Exception as backup_e:
            print(f"❌ 백업 방식도 실패: {backup_e}")
            return ""