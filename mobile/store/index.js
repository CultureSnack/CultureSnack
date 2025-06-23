import { createStore, combineReducers, applyMiddleware } from 'redux';
import explainReducer from './modules/explainModule';

// Redux Thunk를 직접 구현 (호환성 문제 방지)
const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    return next(action);
};

// 루트 리듀서
const rootReducer = combineReducers({
    explain: explainReducer,
});

// 스토어 생성
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export default store; 