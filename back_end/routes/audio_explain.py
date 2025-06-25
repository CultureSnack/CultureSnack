from fastapi import FastAPI, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.gpt_service import explain_cultural_heritage
from services.tts_service import generate_tts
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    input: str

router = APIRouter(prefix="/explain", tags=["Audio Explain"])

# @router.post("/audio")
# async def explain_audio(req: TextRequest, request: Request):
#     # 오디오 설명용 엔드포인트 (구현 필요)
#     return {"message": "audio endpoint"}

@router.post("/text")
async def explain_text(req: TextRequest, request: Request):
    result = explain_cultural_heritage(req.input)

    if result.get("summary"):
        filename = f"{uuid.uuid4().hex}.mp3"
        generate_tts(result["summary"], filename)

        base_url = str(request.base_url).rstrip("/")
        result["audio_url"] = f"{base_url}/audio/{filename}"

    return result

# 라우터 등록
app.include_router(router)
