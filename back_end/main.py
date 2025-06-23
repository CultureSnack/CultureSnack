from fastapi import FastAPI
from routes import text_explain, audio_explain
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 미들웨어 설정 - 모바일 앱과 웹에서 모두 접근 가능하도록
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 환경에서는 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/audio", StaticFiles(directory="static/audio"), name="audio")

app.include_router(text_explain.router)
app.include_router(audio_explain.router)