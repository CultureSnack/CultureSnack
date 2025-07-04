from fastapi import APIRouter, File, UploadFile, Request
from services.stt_service import AudioService
from services.gpt_service import explain_cultural_heritage
from services.tts_service import generate_tts
import uuid
import os

router = APIRouter(prefix="/explain", tags=["Audio Explain"])

@router.post("/audio")
def explain_audio(request: Request, file: UploadFile = File(...)):
    filename = f"temp_{uuid.uuid4().hex}.mp3"
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)
    file_path = os.path.join(temp_dir, filename)

    # 파일 저장
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    # Whisper API로 전사
    audio_service = AudioService()
    transcript = audio_service.transcribe_audio(file_path)
    result = explain_cultural_heritage(transcript)
    result["transcript"] = transcript

    # summary 있을 경우 TTS 오디오 생성
    if result.get("summary"):
        audio_name = f"{uuid.uuid4().hex}.mp3"
        generate_tts(result["summary"], audio_name)
        base_url = str(request.base_url).rstrip("/")
        result["audio_url"] = f"{base_url}/audio/{audio_name}"

    # 임시 파일 삭제
    os.remove(file_path)
    return result
