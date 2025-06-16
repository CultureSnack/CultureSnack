from openai import OpenAI
import pandas as pd
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

# 엑셀 파일 절대 경로 로드
EXCEL_PATH = os.path.join(os.path.dirname(__file__), '..', '한국문화정보원_문화유산 맞춤형(3D프린팅)_20160112.xlsx')
df = pd.read_excel(EXCEL_PATH)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY").strip())

def explain_cultural_heritage(user_input: str) -> dict:
    # 1차: 데이터명에서 검색
    matching_heritage = df[df['데이터명'].str.contains(user_input, case=False, na=False)]

    if not matching_heritage.empty:
        heritage_name = matching_heritage.iloc[0]['데이터명']
        heritage_info = matching_heritage.iloc[0]['문양설명']

        prompt = (
            f"Summarize the explanation about {heritage_name} so that even elementary school students can easily understand it. "
            f"Return the result strictly in JSON format with two keys: 'summary' and 'difficult_words'. "
            f"The format must be exactly like this: "
            f"{{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
            f"DO NOT add any extra text, explanation, or greeting outside the JSON format. "
            f"All responses must be written in Korean. Here is the explanation: {heritage_info}"
        )

    else:
        # 문양설명에서 찾기
        matching_heritage = df[df['문양설명'].str.contains(user_input, case=False, na=False)]
        if not matching_heritage.empty:
            prompt = (
                f"Explain the word \"{user_input}\" so that even elementary school students can easily understand it. "
                f"Return the result strictly in JSON format with two keys: 'summary' and 'difficult_words'. "
                f"'summary' should contain a simple explanation, and 'difficult_words' should contain difficult words with their easy explanations. "
                f"All responses must be written in Korean."
            )
        else:
            return {
                "summary": None,
                "difficult_words": None,
                "message": "해당 문화유산이나 설명을 찾을 수 없어요. 다른 단어를 입력해 볼까요?"
            }

    # GPT 호출 + JSON 파싱
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )

        content = response.choices[0].message.content.strip()
        print("📥 GPT 응답 원문:\n", content)

        # 코드블럭 제거
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
        print("❗ 예외 발생:", str(e))
        print("❌ 파싱 실패한 원본:\n", content)
        return {
            "summary": None,
            "difficult_words": None,
            "message": f"GPT 응답 오류: {str(e)}"
        }
