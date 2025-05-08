from openai import OpenAI
import pandas as pd
from dotenv import load_dotenv
import os
import json

# .env 파일 불러오기
load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
if openai_api_key is None:
    raise ValueError("OPENAI_API_KEY 환경 변수가 설정되지 않았습니다.")

# Excel 데이터 로드
df = pd.read_excel('한국문화정보원_문화유산 맞춤형(3D프린팅)_20160112.xlsx')

# GPT 모델 초기화 (API 키 필요)
client = OpenAI(api_key=openai_api_key.strip())

def get_cultural_heritage_description(user_input):
    # 1차: 데이터명에서 찾기
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
            return json.dumps({"summary": None, "difficult_words": None, "message": "해당 문화유산이나 설명을 찾을 수 없어요. 다른 단어를 입력해 볼까요?"}, ensure_ascii=False)

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )

    content = response.choices[0].message.content.strip()

    try:
        parsed_content = json.loads(content)
        return json.dumps({
            "summary": parsed_content.get("summary"),
            "difficult_words": parsed_content.get("difficult_words"),
            "message": "성공"
        }, ensure_ascii=False)
    except json.JSONDecodeError:
        return json.dumps({
            "summary": None,
            "difficult_words": None,
            "message": "GPT 응답을 JSON으로 변환할 수 없습니다."
        }, ensure_ascii=False)

# 예시 사용
user_input = "화각참빗"
result = get_cultural_heritage_description(user_input)
parsed_result = json.loads(result)
print("요약 내용:", parsed_result["summary"])
print("어려운 단어 설명:", parsed_result["difficult_words"])
