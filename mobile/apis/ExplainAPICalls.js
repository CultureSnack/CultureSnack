import apis from "./Apis";
import { API_BASE_URL } from '@env';

// 텍스트 설명 요청
export const explainText = async (inputText) => {
    try {
        console.log('🚀 API 요청 시작:', inputText);
        console.log('🌐 요청 URL:', `${API_BASE_URL}/explain/text`);

        // 실제 요청만 수행 (IS_MOCK 관련 코드 제거)
        const requestData = { input: inputText };
        console.log('📤 요청 데이터:', requestData);

        const response = await apis.post(`${API_BASE_URL}/explain/text`, requestData);
        console.log('🔗 요청 URL:', response.config.url);
        console.log('✅ API 응답 성공:', response.status);
        console.log('📥 응답 데이터:', response.data);
        
        return response.data;
    } catch (error) {
        console.error("❌ 텍스트 설명 요청 오류:");
        console.error("   상태 코드:", error.response?.status);
        console.error("   에러 메시지:", error.response?.data);
        console.error("   전체 에러:", error.message);
        throw error;
    }
};

// 오디오 파일 설명 요청
export const explainAudio = async (audioFile) => {
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: audioFile.uri,
            type: audioFile.type || 'audio/mp3',
            name: audioFile.name || 'audio.mp3',
        });

        const response = await apis.post("/explain/audio", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("오디오 설명 요청 오류:", error);
        throw error;
    }
};

// 오디오 URL로 오디오 파일 가져오기
export const getAudioFile = (audioUrl) => {
    // audioUrl이 상대 경로면 전체 URL로 변환
    if (audioUrl && audioUrl.startsWith('/audio/')) {
        return `${apis.defaults.baseURL}${audioUrl}`;
    }
    return audioUrl;
}; 
