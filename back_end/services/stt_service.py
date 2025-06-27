import whisper
import torch

# 전역 변수로 모델 저장 (필요할 때만 로딩)
_model = None

def _get_model():
    """모델을 지연 로딩"""
    global _model
    if _model is None:
        print("🎤 Whisper small 모델 로딩 시작...")
        _model = whisper.load_model("small", device="cuda" if torch.cuda.is_available() else "cpu")
        print("✅ Whisper small 모델 로딩 완료")
    return _model

def transcribe_audio(file_path: str) -> str:
    try:
        model = _get_model()  # 필요할 때만 모델 로딩
        result = model.transcribe(file_path, language="ko")
        return result["text"]
    except Exception as e:
        print(f"❌ 음성 인식 실패: {e}")
        return ""