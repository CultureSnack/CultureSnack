import os
import subprocess
from typing import Optional

class AudioService:
    def __init__(self):
        self.local_mode = os.environ.get("LOCAL_MODE", "false").lower() == "true"
    
    def convert_audio(self, input_file: str, output_file: str) -> bool:
        """오디오 파일 변환"""
        if self.local_mode:
            # 로컬에서는 ffmpeg.exe 사용
            return self._convert_with_local_ffmpeg(input_file, output_file)
        else:
            # 프로덕션에서는 시스템 ffmpeg 또는 다른 방법 사용
            return self._convert_with_system_ffmpeg(input_file, output_file)
    
    def _convert_with_local_ffmpeg(self, input_file: str, output_file: str) -> bool:
        """로컬 ffmpeg.exe 사용"""
        try:
            cmd = [
                "./ffmpeg.exe",
                "-i", input_file,
                "-acodec", "libmp3lame",
                "-ar", "16000",
                output_file,
                "-y"
            ]
            subprocess.run(cmd, check=True, capture_output=True)
            return True
        except Exception as e:
            print(f"로컬 ffmpeg 변환 실패: {e}")
            return False
    
    def _convert_with_system_ffmpeg(self, input_file: str, output_file: str) -> bool:
        """시스템 ffmpeg 사용 (Railway에 설치된 것)"""
        try:
            cmd = [
                "ffmpeg",  # 시스템 PATH의 ffmpeg
                "-i", input_file,
                "-acodec", "libmp3lame", 
                "-ar", "16000",
                output_file,
                "-y"
            ]
            subprocess.run(cmd, check=True, capture_output=True)
            return True
        except Exception as e:
            print(f"시스템 ffmpeg 변환 실패: {e}")
            # ffmpeg가 없으면 원본 파일 그대로 사용
            return self._copy_file(input_file, output_file)
    
    def _copy_file(self, src: str, dst: str) -> bool:
        """파일 복사 (변환 실패시 대안)"""
        try:
            import shutil
            shutil.copy2(src, dst)
            return True
        except Exception as e:
            print(f"파일 복사 실패: {e}")
            return False 