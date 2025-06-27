import os
from typing import Optional
from openai import OpenAI

class STTService:
    def __init__(self):
        try:
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("OPENAI_API_KEY가 설정되지 않았습니다.")
            self.client = OpenAI(api_key=api_key.strip())
            print("✅ OpenAI 클라이언트 초기화 성공")
        except Exception as e:
            print(f"❌ OpenAI 클라이언트 초기화 실패: {e}")
            raise e
            
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
            print(f"🎤 Whisper API 호출 시작: {audio_file_path}")
            
            # 파일 존재 및 크기 확인
            if not os.path.exists(audio_file_path):
                print(f"❌ 파일이 존재하지 않습니다: {audio_file_path}")
                return None
                
            file_size = os.path.getsize(audio_file_path)
            print(f"📁 파일 크기: {file_size} bytes")
            
            if file_size == 0:
                print("❌ 파일이 비어있습니다.")
                return None
            
            # OpenAI Whisper API 호출
            with open(audio_file_path, 'rb') as audio_file:
                print("🔄 OpenAI Whisper API 호출 중...")
                response = self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    language="ko",  # 한국어 설정
                    response_format="text"  # 텍스트 형식으로 응답 요청
                )
                print(f"✅ Whisper API 응답: {response}")
                return response
                
        except Exception as e:
            print(f"❌ OpenAI API 음성 인식 실패: {e}")
            print(f"❌ 에러 타입: {type(e).__name__}")
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