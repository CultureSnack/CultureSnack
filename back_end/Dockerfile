FROM python:3.11-alpine

WORKDIR /app

# 시스템 의존성 설치 (최소한만)
RUN apk add --no-cache gcc musl-dev linux-headers

# Python 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    pip cache purge

# 소스 코드만 복사 (큰 파일들 완전 제외)
COPY main.py .
COPY routes/ routes/
COPY services/ services/

# 불필요한 파일들 제거
RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# 포트 설정
EXPOSE 8000

# 실행 명령
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 