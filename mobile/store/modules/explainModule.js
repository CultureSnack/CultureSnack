import { explainText, explainAudio } from "../../apis/ExplainAPICalls";

// 액션 타입
const SET_INPUT_TEXT = 'SET_INPUT_TEXT';
const SET_SHOW_INPUT = 'SET_SHOW_INPUT';
const SET_IS_LISTENING = 'SET_IS_LISTENING';
const EXPLAIN_TEXT_START = 'EXPLAIN_TEXT_START';
const EXPLAIN_TEXT_SUCCESS = 'EXPLAIN_TEXT_SUCCESS';
const EXPLAIN_TEXT_FAIL = 'EXPLAIN_TEXT_FAIL';
const EXPLAIN_AUDIO_START = 'EXPLAIN_AUDIO_START';
const EXPLAIN_AUDIO_SUCCESS = 'EXPLAIN_AUDIO_SUCCESS';
const EXPLAIN_AUDIO_FAIL = 'EXPLAIN_AUDIO_FAIL';
const CLEAR_RESULT = 'CLEAR_RESULT';

// 초기 상태
const initialState = {
    inputText: '', // 입력 텍스트
    result: null, // 설명 결과 { summary, audio_url, transcript? }
    loading: false, // 로딩 상태
    error: null, // 에러 메시지
    showInput: false, // 입력 화면 표시 여부
    isListening: false, // 음성 인식 중 여부
};

// 액션 생성자
export const setInputText = (text) => ({
    type: SET_INPUT_TEXT,
    payload: text
});

export const setShowInput = (show) => ({
    type: SET_SHOW_INPUT,
    payload: show
});

export const setIsListening = (listening) => ({
    type: SET_IS_LISTENING,
    payload: listening
});

export const explainTextStart = () => ({
    type: EXPLAIN_TEXT_START
});

export const explainTextSuccess = (result) => ({
    type: EXPLAIN_TEXT_SUCCESS,
    payload: result
});

export const explainTextFail = (error) => ({
    type: EXPLAIN_TEXT_FAIL,
    payload: error
});

export const explainAudioStart = () => ({
    type: EXPLAIN_AUDIO_START
});

export const explainAudioSuccess = (result) => ({
    type: EXPLAIN_AUDIO_SUCCESS,
    payload: result
});

export const explainAudioFail = (error) => ({
    type: EXPLAIN_AUDIO_FAIL,
    payload: error
});

export const clearResult = () => ({
    type: CLEAR_RESULT
});

// Thunk 함수: 텍스트 설명 요청
export const requestExplainText = (inputText) => async (dispatch) => {
    try {
        dispatch(explainTextStart());
        const result = await explainText(inputText);
        dispatch(explainTextSuccess(result));
        return result;
    } catch (error) {
        const errorMessage = 
            error.response?.data?.detail || 
            error.message || 
            "텍스트 설명 요청 실패";
        dispatch(explainTextFail(errorMessage));
        throw error;
    }
};

// Thunk 함수: 오디오 설명 요청
export const requestExplainAudio = (audioFile) => async (dispatch) => {
    try {
        dispatch(explainAudioStart());
        const result = await explainAudio(audioFile);
        dispatch(explainAudioSuccess(result));
        return result;
    } catch (error) {
        const errorMessage = 
            error.response?.data?.detail || 
            error.message || 
            "오디오 설명 요청 실패";
        dispatch(explainAudioFail(errorMessage));
        throw error;
    }
};

// 리듀서
const explainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INPUT_TEXT:
            return {
                ...state,
                inputText: action.payload,
            };
        case SET_SHOW_INPUT:
            return {
                ...state,
                showInput: action.payload,
            };
        case SET_IS_LISTENING:
            return {
                ...state,
                isListening: action.payload,
            };
        case EXPLAIN_TEXT_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case EXPLAIN_TEXT_SUCCESS:
            return {
                ...state,
                result: action.payload,
                loading: false,
                error: null,
            };
        case EXPLAIN_TEXT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case EXPLAIN_AUDIO_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case EXPLAIN_AUDIO_SUCCESS:
            return {
                ...state,
                result: action.payload,
                loading: false,
                error: null,
            };
        case EXPLAIN_AUDIO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_RESULT:
            return {
                ...state,
                inputText: '',
                result: null,
                error: null,
                showInput: false,
            };
        default:
            return state;
    }
};

// Selector 함수
export const selectInputText = (state) => state.explain.inputText;
export const selectResult = (state) => state.explain.result;
export const selectLoading = (state) => state.explain.loading;
export const selectError = (state) => state.explain.error;
export const selectShowInput = (state) => state.explain.showInput;
export const selectIsListening = (state) => state.explain.isListening;

export default explainReducer; 