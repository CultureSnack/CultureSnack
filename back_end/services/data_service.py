import pandas as pd
import os
from typing import Optional

class DataService:
    def __init__(self):
        # 로컬 개발시에는 로컬 파일 사용
        self.local_mode = os.environ.get("LOCAL_MODE", "false").lower() == "true"
        
    def get_royal_artifacts_data(self) -> Optional[pd.DataFrame]:
        """왕실유물 데이터 로드"""
        if self.local_mode:
            # 로컬 개발시
            try:
                return pd.read_excel("왕실유물정보_20140424354.xlsx")
            except FileNotFoundError:
                print("로컬 엑셀 파일을 찾을 수 없습니다.")
                return None
        else:
            # 프로덕션에서는 Mock 데이터 또는 클라우드 데이터 사용
            return self._get_mock_royal_data()
    
    def get_cultural_heritage_data(self) -> Optional[pd.DataFrame]:
        """문화유산 데이터 로드"""
        if self.local_mode:
            # 로컬 개발시
            try:
                return pd.read_excel("한국문화정보원_문화유산 맞춤형(3D프린팅)_20160112.xlsx")
            except FileNotFoundError:
                print("로컬 엑셀 파일을 찾을 수 없습니다.")
                return None
        else:
            # 프로덕션에서는 Mock 데이터 또는 클라우드 데이터 사용
            return self._get_mock_heritage_data()
    
    def _get_mock_royal_data(self) -> pd.DataFrame:
        """Mock 왕실유물 데이터"""
        return pd.DataFrame({
            '유물명': ['조선왕조실록', '훈민정음', '불국사 삼층석탑'],
            '시대': ['조선시대', '조선시대', '통일신라시대'],
            '설명': [
                '조선왕조 472년간의 역사를 기록한 실록',
                '세종대왕이 창제한 한글의 원리를 설명한 해설서',
                '불국사에 있는 통일신라시대의 대표적인 석탑'
            ]
        })
    
    def _get_mock_heritage_data(self) -> pd.DataFrame:
        """Mock 문화유산 데이터"""
        return pd.DataFrame({
            '문화재명': ['경복궁', '창덕궁', '덕수궁'],
            '지정번호': ['사적 제117호', '사적 제122호', '사적 제124호'],
            '소재지': ['서울특별시 종로구', '서울특별시 종로구', '서울특별시 중구'],
            '설명': [
                '조선왕조의 정궁으로 사용된 궁궐',
                '조선시대 왕들이 거주한 이궁',
                '대한제국 시기 황궁으로 사용된 궁궐'
            ]
        }) 