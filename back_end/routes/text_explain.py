from fastapi import APIRouter, File, UploadFile, Request
from services.stt_service import transcribe_audio
from services.gpt_service import explain_cultural_heritage
from services.tts_service import generate_tts
import uuid
import os

router = APIRouter(prefix="/explain", tags=["Audio Explain"])

@router.post("/audio")
def explain_audio(request: Request, file: UploadFile = File(...)):
    filename = f"temp_{uuid.uuid4().hex}.mp3"
    file_path = f"temp/{filename}"

    with open(file_path, "wb") as f:
        f.write(file.file.read())

    transcript = transcribe_audio(file_path)
    result = explain_cultural_heritage(transcript)
    result["transcript"] = transcript

    if result["summary"]:
        audio_name = f"{uuid.uuid4().hex}.mp3"
        generate_tts(result["summary"], audio_name)

        # ✅ 절대 URL 구성
        base_url = str(request.base_url).rstrip("/")
        result["audio_url"] = f"{base_url}/audio/{audio_name}"

    os.remove(file_path)
    return result
