from fastapi import APIRouter, File, UploadFile, Request
from services.stt_service import AudioService
from services.gpt_service import explain_cultural_heritage
from services.tts_service import generate_tts
import uuid
import os

router = APIRouter(prefix="/explain", tags=["Audio Explain"])

@router.post("/audio")
def explain_audio(request: Request, file: UploadFile = File(...)):
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)

    orig_ext = os.path.splitext(file.filename)[1].lower()
    orig_path = os.path.join(temp_dir, f"orig_{uuid.uuid4().hex}{orig_ext}")

    # 파일 저장
    with open(orig_path, "wb") as f:
        content = file.file.read()
        f.write(content)
    print(f"업로드 파일 크기: {os.path.getsize(orig_path)} bytes")

    # wav 변환
    wav_path = os.path.join(temp_dir, f"conv_{uuid.uuid4().hex}.wav")
    audio_service = AudioService()
    audio_service.convert_audio(orig_path, wav_path)
    print(f"변환된 wav 파일 크기: {os.path.getsize(wav_path)} bytes")

    # Whisper API로 전사
    transcript = audio_service.transcribe_audio(wav_path)
    print(f"Whisper API 결과: '{transcript}'")
    result = explain_cultural_heritage(transcript)
    result["transcript"] = transcript

    if result.get("summary"):
        audio_name = f"{uuid.uuid4().hex}.mp3"
        generate_tts(result["summary"], audio_name)
        base_url = str(request.base_url).rstrip("/")
        result["audio_url"] = f"{base_url}/audio/{audio_name}"

    # 임시 파일 삭제
    try: os.remove(orig_path)
    except: pass
    try: os.remove(wav_path)
    except: pass
    return result
