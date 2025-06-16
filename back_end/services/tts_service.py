from gtts import gTTS
import os

def generate_tts(text: str, filename: str):
    tts = gTTS(text=text, lang='ko')
    path = f"static/audio/{filename}"
    tts.save(path)
    return path