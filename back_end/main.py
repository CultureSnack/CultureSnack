from fastapi import FastAPI
from routes import text_explain, audio_explain
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# 필요한 디렉토리 생성
os.makedirs("static/audio", exist_ok=True)
os.makedirs("temp", exist_ok=True)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

# 정적 오디오 파일 경로 설정
app.mount("/audio", StaticFiles(directory="static/audio"), name="audio")

# 라우터 등록
app.include_router(text_explain.router)
app.include_router(audio_explain.router)

# ✅ Railway 실행 포인트
if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
