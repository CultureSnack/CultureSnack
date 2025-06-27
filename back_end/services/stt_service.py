import whisper
import torch

model = whisper.load_model("small", device="cuda" if torch.cuda.is_available() else "cpu")

def transcribe_audio(file_path: str) -> str:
    result = model.transcribe(file_path, language="ko")
    return result["text"]