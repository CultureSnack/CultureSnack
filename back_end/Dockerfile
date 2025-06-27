FROM python:3.11-slim

WORKDIR /app

# 필요한 파일들만 복사
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 복사 (큰 파일들 제외)
COPY main.py .
COPY routes/ routes/
COPY services/ services/
COPY Procfile .
COPY railway.toml .

# 포트 설정
EXPOSE 8000

# 실행 명령
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 