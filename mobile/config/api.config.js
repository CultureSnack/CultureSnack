// API 설정
const API_CONFIG = {
  // 개발환경에서는 localhost, 프로덕션에서는 실제 서버 URL 사용
  BASE_URL: __DEV__ 
    ? 'http://localhost:8000'  // 개발시
    : 'https://culturesnack-production-1ffe.up.railway.app',  // Railway 배포 URL
  
  ENDPOINTS: {
    TEXT_EXPLAIN: '/explain/text',
    AUDIO_EXPLAIN: '/explain/audio',
  }
};

export default API_CONFIG;
