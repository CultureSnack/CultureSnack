import apis from "./Apis";

// 텍스트 설명 요청
export const explainText = async (inputText) => {
    try {
        console.log('🚀 API 요청 시작:', inputText);
        console.log('🌐 요청 URL:', `${apis.defaults.baseURL}/explain/text`);
        
        // 백엔드가 안 떠있을 때를 위한 Mock 응답
        if (true) { // 실제 백엔드 테스트시 true로 변경
            const requestData = { input: inputText };
            console.log('📤 요청 데이터:', requestData);
            
            const response = await apis.post("/explain/text", requestData);
            
            console.log('✅ API 응답 성공:', response.status);
            console.log('📥 응답 데이터:', response.data);
            
            return response.data;
        } else {
            // Mock 응답 (백엔드 없이 테스트용)
            await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 시뮬레이션
            return {
                summary: `"${inputText}"에 대한 쉬운 설명:\n\n이것은 한국의 전통 문화유산입니다. 옛날 사람들이 만든 소중한 유물로, 우리 역사와 문화를 이해하는데 도움이 됩니다. 현재는 박물관에서 보관되고 있으며, 많은 사람들이 구경할 수 있습니다.`,
                audio_url: "/audio/mock_audio.mp3"
            };
        }
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