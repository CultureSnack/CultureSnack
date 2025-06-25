
import axios from 'axios';
import { getApiConfig } from '../config/api.config';
import { explainText } from './ExplainAPICalls'; // 추가: explainText 가져오기

// API 설정을 별도 파일에서 가져오기
const config = getApiConfig();

console.log('🔗 API Base URL:', config.baseURL);

const apis = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
apis.interceptors.request.use(
    (config) => {
        console.log('API 요청:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('API 요청 오류:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
apis.interceptors.response.use(
    (response) => {
        console.log('API 응답:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('API 응답 오류:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

// 아래 함수로 API 직접 호출 및 상태 관리 예시
export const requestExplainText = async (inputText, setLoading, setResult, setError) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
        const data = await explainText(inputText);
        setResult(data);
    } catch (e) {
        setError(e.message || '오류가 발생했습니다.');
    }
    setLoading(false);
};

export default apis;
