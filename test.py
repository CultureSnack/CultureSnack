import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

# .env 파일 불러오기
load_dotenv()

# 환경변수에서 URL 읽기
Khs_url = os.getenv("KHS_API_URL")
if Khs_url is None:
    raise ValueError("KHS_API_URL 환경 변수가 설정되지 않았습니다.")

# API 요청 URL 및 파라미터 설정
url = Khs_url
params = {
    "ccbaKdcd": "11",     # 국보
    "ccbaCtcd": "11",     # 서울특별시
    "pageUnit": "10",     # 페이지당 10건 조회
    "pageIndex": "1"      # 첫 번째 페이지
}

# API 요청
response = requests.get(url, params=params)
response.encoding = 'utf-8'  # 응답 인코딩 설정

# 응답 XML 파싱
soup = BeautifulSoup(response.text, 'xml')
items = soup.find_all('item')

# 결과 출력
for item in items:
    name = item.find('ccbaMnm1').text if item.find('ccbaMnm1') else 'N/A'
    location = item.find('ccbaLcad').text if item.find('ccbaLcad') else 'N/A'
    date = item.find('ccbaAsdt').text if item.find('ccbaAsdt') else 'N/A'
    content = item.find('content').text if item.find('content') else 'N/A' 
    imageUrl = item.find('imageUrl').text if item.find('imageUrl') else 'N/A'
    

    print(f"문화재명: {name}")
    print(f"소재지: {location}")
    print(f"지정일자: {date}")
    print(f"내용: {content}")
    print(f"이미지 URL: {imageUrl}")
    print("-" * 40)

