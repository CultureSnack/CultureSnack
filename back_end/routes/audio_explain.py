from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gpt_service import explain_cultural_heritage
from services.tts_service import generate_tts
from fastapi import Request
import uuid

router = APIRouter(prefix="/explain", tags=["Text Explain"])

class TextRequest(BaseModel):
    input: str

@router.post("/text")
def explain_text(req: TextRequest, request: Request):
    result = explain_cultural_heritage(req.input)

    if result["summary"]:
        filename = f"{uuid.uuid4().hex}.mp3"
        generate_tts(result["summary"], filename)

        # 절대 URL 반환
        base_url = str(request.base_url).rstrip("/")
        result["audio_url"] = f"{base_url}/audio/{filename}"

    return result