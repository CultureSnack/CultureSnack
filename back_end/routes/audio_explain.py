from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gpt_service import explain_cultural_heritage
from services.tts_service import generate_tts
import uuid

router = APIRouter(prefix="/explain", tags=["Text Explain"])

class TextRequest(BaseModel):
    input: str

@router.post("/text")
def explain_text(req: TextRequest):
    result = explain_cultural_heritage(req.input)

    if result["summary"]:
        filename = f"{uuid.uuid4().hex}.mp3"
        generate_tts(result["summary"], filename)
        result["audio_url"] = f"/audio/{filename}"
    return result
