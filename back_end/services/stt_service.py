import os
from typing import Optional
from openai import OpenAI

class STTService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.local_mode = os.environ.get("LOCAL_MODE", "false").lower() == "true"
    
    def transcribe_audio(self, audio_file_path: str) -> Optional[str]:
        """오디오 파일을 텍스트로 변환"""
        try:
            if self.local_mode:
                # 로컬에서는 기존 whisper 사용 (설치되어 있다면)
                return self._transcribe_with_local_whisper(audio_file_path)
            else:
                # 프로덕션에서는 OpenAI API 사용
                return self._transcribe_with_openai_api(audio_file_path)
        except Exception as e:
            print(f"음성 인식 실패: {e}")
            return None
    
    def _transcribe_with_openai_api(self, audio_file_path: str) -> Optional[str]:
        """OpenAI API Whisper 사용"""
        try:
            with open(audio_file_path, 'rb') as audio_file:
                response = self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    language="ko"  # 한국어 설정
                )
                return response.text
        except Exception as e:
            print(f"OpenAI API 음성 인식 실패: {e}")
            return None
    
    def _transcribe_with_local_whisper(self, audio_file_path: str) -> Optional[str]:
        """로컬 whisper 사용 (백업용)"""
        try:
            import whisper
            model = whisper.load_model("base")
            result = model.transcribe(audio_file_path, language='ko')
            return result['text']
        except ImportError:
            print("로컬 whisper가 설치되지 않았습니다. OpenAI API를 사용합니다.")
            return self._transcribe_with_openai_api(audio_file_path)
        except Exception as e:
            print(f"로컬 whisper 실패: {e}")
            return None