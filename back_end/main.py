from fastapi import FastAPI
from routes import text_explain, audio_explain
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/audio", StaticFiles(directory="static/audio"), name="audio")

app.include_router(text_explain.router)
app.include_router(audio_explain.router)