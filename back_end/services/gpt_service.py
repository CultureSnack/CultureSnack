from openai import OpenAI
import pandas as pd
import os
import json
import re
from dotenv import load_dotenv
from .data_service import DataService

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY").strip())
data_service = DataService()

def explain_cultural_heritage(user_input: str) -> dict:
    # DataService에서 데이터 로드
    df1 = data_service.get_cultural_heritage_data()
    df2 = data_service.get_royal_artifacts_data()
    
    if df1 is None or df2 is None:
        return {
            "summary": "데이터를 로드할 수 없습니다.",
            "difficult_words": "데이터 로드 실패",
            "message": "데이터 서비스 오류"
        }
    
    # 입력값에서 공백 제거
    user_input_no_space = user_input.replace(' ', '')
    print("사용자 입력 (공백 제거):", user_input_no_space)

    # 1. 첫 번째 데이터에서 '데이터명' 검색 (공백 제거 후 비교)
    if '데이터명' in df1.columns:
        match1 = df1[df1['데이터명'].astype(str).str.replace(' ', '').str.contains(user_input_no_space, case=False, na=False)]
        if not match1.empty:
            print("✅ 첫 번째 데이터에서 검색된 결과:", match1)
            heritage_name = match1.iloc[0]['데이터명']
            heritage_info = match1.iloc[0]['문양설명'] if '문양설명' in match1.columns else str(match1.iloc[0])
            prompt = create_prompt(heritage_name, heritage_info)
        else:
            match1 = None
    else:
        match1 = None

    if match1 is None or match1.empty:
        # 2. 두 번째 데이터에서 '작품명' 또는 '유물명' 검색
        search_columns = ['작품명', '유물명']
        match2 = None
        
        for col in search_columns:
            if col in df2.columns:
                match2 = df2[df2[col].astype(str).str.replace(' ', '').str.contains(user_input_no_space, case=False, na=False)]
                if not match2.empty:
                    print(f"✅ 두 번째 데이터의 '{col}'에서 검색된 결과:", match2)
                    heritage_name = match2.iloc[0][col]
                    # 설명 컬럼 찾기
                    desc_cols = ['작품해설_내용', '설명']
                    heritage_info = ""
                    for desc_col in desc_cols:
                        if desc_col in match2.columns:
                            heritage_info = match2.iloc[0][desc_col]
                            break
                    if not heritage_info:
                        heritage_info = str(match2.iloc[0])
                    prompt = create_prompt(heritage_name, heritage_info)
                    break
        
        if match2 is None or match2.empty:
            # 3. 일반적인 설명 요청
            print("❌ 데이터에서 검색되지 않았습니다. 사용자 입력을 직접 설명합니다.")
            prompt = create_general_prompt(user_input)

    # GPT 호출 + 파싱 부분
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )
        content = response.choices[0].message.content.strip()
        if content.startswith("```"):
            content_parts = re.split(r"```(?:json)?", content)
            if len(content_parts) >= 2:
                content = content_parts[1].strip("`\n ")
        if not content:
            raise ValueError("GPT 응답이 비어 있습니다.")
        parsed = json.loads(content)
        return {
            "summary": parsed.get("summary"),
            "difficult_words": parsed.get("difficult_words"),
            "message": "성공"
        }
    except Exception as e:
        content = locals().get("content", None)
        print("❗ 예외 발생:", str(e))
        print("❌ 파싱 실패한 원본:\n", content)
        return {
            "summary": None,
            "difficult_words": None,
            "message": f"GPT 응답 오류: {str(e)}"
        }

def create_prompt(heritage_name, heritage_info):
    return (
        f"한줄로 설명,구체적인 단어 사용. 부정문보다는 긍정문. 비유적 표현, 관용어, 한자어 지양. "
        f"Summarize the explanation about {heritage_name} so that even elementary school students can easily understand it. "
        f"Return the result strictly in JSON format with two keys: 'summary' and 'difficult_words'. "
        f"The format must be exactly like this: "
        f"{{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
        f"DO NOT add any extra text, explanation, or greeting outside the JSON format. "
        f"All responses must be written in Korean. Here is the explanation: {heritage_info}"
    )

def create_general_prompt(user_input):
    return (
        f"다음 단어나 표현을 초등학생도 쉽게 이해할 수 있도록 아주 쉬운말로 설명하세요. "
        f"한 문장은 한 가지 정보만, 문장 길이는 50자 이내. 추상어 대신 구체적인 단어 사용. 부정문보다는 긍정문. 비유적 표현, 관용어, 한자어 지양. "
        f"응답은 반드시 JSON 형식으로 두 개의 key만 포함해야 합니다: 'summary'와 'difficult_words'. "
        f"형식 예시: {{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
        f"여분의 텍스트, 설명, 인사말은 절대 포함하지 마세요. "
        f"모든 답변은 반드시 한국어로 작성하세요. "
        f"단어/표현: {user_input}"
    )