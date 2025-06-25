from openai import OpenAI
import pandas as pd
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

# 엑셀 파일 절대 경로 로드
EXCEL_PATH1 = os.path.join(os.path.dirname(__file__), '..', '한국문화정보원_문화유산 맞춤형(3D프린팅)_20160112.xlsx')
EXCEL_PATH2 = os.path.join(os.path.dirname(__file__), '..', '왕실유물정보_20140424354.xlsx')

df1 = pd.read_excel(EXCEL_PATH1)
df2 = pd.read_excel(EXCEL_PATH2)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY").strip())

def explain_cultural_heritage(user_input: str) -> dict:
    # 입력값에서 공백 제거
    user_input_no_space = user_input.replace(' ', '')
    print("사용자 입력 (공백 제거):", user_input_no_space)

    # 1. 첫 번째 엑셀에서 '데이터명' 검색 (공백 제거 후 비교)
    match1 = df1[df1['데이터명'].astype(str).str.replace(' ', '').str.contains(user_input_no_space, case=False, na=False)]
    if not match1.empty:
        print("✅ 첫 번째 엑셀에서 검색된 결과:", match1)
        heritage_name = match1.iloc[0]['데이터명']
        heritage_info = match1.iloc[0]['문양설명']
        prompt = (
            f"한 문장은 한 가지 정보만, 문장 길이는 50자 이내. 추상어 대신 구체적인 단어 사용. 부정문보다는 긍정문. 비유적 표현, 관용어, 한자어 지양. "
            f"Summarize the explanation about {heritage_name} so that even elementary school students can easily understand it. "
            f"Return the result strictly in JSON format with two keys: 'summary' and 'difficult_words'. "
            f"The format must be exactly like this: "
            f"{{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
            f"DO NOT add any extra text, explanation, or greeting outside the JSON format. "
            f"All responses must be written in Korean. Here is the explanation: {heritage_info}"
        )
    else:
        # 2. 두 번째 엑셀에서 '작품명' 검색 (공백 제거 후 비교)
        match2 = df2[df2['작품명'].astype(str).str.replace(' ', '').str.contains(user_input_no_space, case=False, na=False)]
        if not match2.empty:
            print("✅ 두 번째 엑셀에서 검색된 결과:", match2)
            heritage_name = match2.iloc[0]['작품명']
            heritage_info = match2.iloc[0]['작품해설_내용']
            prompt = (
                f"한 문장은 한 가지 정보만, 문장 길이는 50자 이내. 추상어 대신 구체적인 단어 사용. 부정문보다는 긍정문. 비유적 표현, 관용어, 한자어 지양. "
                f"Summarize the explanation about {heritage_name} so that even elementary school students can easily understand it. "
                f"Return the result strictly in JSON format with two keys: 'summary' and 'difficult_words'. "
                f"The format must be exactly like this: "
                f"{{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
                f"DO NOT add any extra text, explanation, or greeting outside the JSON format. "
                f"All responses must be written in Korean. Here is the explanation: {heritage_info}"
            )
        else:
            # 3. 첫 번째 엑셀의 '문양설명'에서 검색 (공백 제거 후 비교)
            match3 = df1[df1['문양설명'].astype(str).str.replace(' ', '').str.contains(user_input_no_space, case=False, na=False)]
            if not match3.empty:
                print("✅ 첫 번째 엑셀의 '문양설명'에서 검색된 결과:", match3)
                heritage_info = match3.iloc[0]['문양설명']
                prompt = (
                    f"한 문장은 한 가지 정보만, 문장 길이는 50자 이내. 추상어 대신 구체적인 단어 사용. 부정문보다는 긍정문. 비유적 표현, 관용어, 한자어 지양. "
                    f"Summarize the explanation about {heritage_name} so that even elementary school students can easily understand it. "
                    f"Return the result strictly in JSON format with two keys: 'summary' and 'difficult_words'. "
                    f"The format must be exactly like this: "
                    f"{{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
                    f"DO NOT add any extra text, explanation, or greeting outside the JSON format. "
                    f"All responses must be written in Korean. Here is the explanation: {heritage_info}"
                )
            else:
                # 4. 두 번째 엑셀의 '작품해설_내용'에서 검색 (공백 제거 후 비교)
                match4 = df2[df2['작품해설_내용'].astype(str).str.replace(' ', '').str.contains(user_input_no_space, case=False, na=False)]
                if not match4.empty:
                    print("✅ 두 번째 엑셀의 '작품해설_내용'에서 검색된 결과:", match4)
                    heritage_info = match4.iloc[0]['작품해설_내용']
                    prompt = (
                        f"한 문장은 한 가지 정보만, 문장 길이는 50자 이내. 추상어 대신 구체적인 단어 사용. 부정문보다는 긍정문. 비유적 표현, 관용어, 한자어 지양. "
                        f"Summarize the explanation about {heritage_name} so that even elementary school students can easily understand it. "
                        f"Return the result strictly in JSON format with two keys: 'summary' and 'difficult_words'. "
                        f"The format must be exactly like this: "
                        f"{{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
                        f"DO NOT add any extra text, explanation, or greeting outside the JSON format. "
                        f"All responses must be written in Korean. Here is the explanation: {heritage_info}"
                    )
                else:
                    # **여기서만 최종적으로 user_input 자체로 설명시키는 프롬프트 생성**
                    print("❌ 두 엑셀에서 모두 검색되지 않았습니다. 사용자 입력을 직접 설명합니다.")
                    prompt = (
                        f"다음 단어나 표현을 초등학생도 쉽게 이해할 수 있도록 아주 쉬운말로 설명하세요. "
                        f"한 문장은 한 가지 정보만, 문장 길이는 50자 이내. 추상어 대신 구체적인 단어 사용. 부정문보다는 긍정문. 비유적 표현, 관용어, 한자어 지양. "
                        f"응답은 반드시 JSON 형식으로 두 개의 key만 포함해야 합니다: 'summary'와 'difficult_words'. "
                        f"형식 예시: {{\"summary\": \"(요약된 설명)\", \"difficult_words\": \"(어려운 단어 설명)\"}} "
                        f"여분의 텍스트, 설명, 인사말은 절대 포함하지 마세요. "
                        f"모든 답변은 반드시 한국어로 작성하세요. "
                        f"단어/표현: {user_input}"
                    )

    # GPT 호출 + 파싱 부분 (동일)
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
        content = locals().get("content", None)  # content가 없으면 None 반환
        print("❗ 예외 발생:", str(e))
        print("❌ 파싱 실패한 원본:\n", content)
        return {
            "summary": None,
            "difficult_words": None,
            "message": f"GPT 응답 오류: {str(e)}"
        }