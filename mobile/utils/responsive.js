import { Dimensions, Platform, StatusBar } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 기준 디자인 크기 (갤럭시 S21 Ultra)
const BASE_WIDTH = 1440;
const BASE_HEIGHT = 3200;

// 화면 크기에 따른 비율 계산
export const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// 폰트 관련 보정 함수
export const getFont = (weight = 'regular') => {
    if (weight === 'bold') return 'PlayfairDisplay-Bold';
    if (weight === 'semibold') return 'PlayfairDisplay-SemiBold';
    return 'PlayfairDisplay-Regular';
};
export const getFontSize = (size) => Platform.OS === 'android' ? size - 2 : size - 1;
export const getLineHeight = (lh) => Platform.OS === 'android' ? lh - 4 : lh - 2;
export const getLetterSpacing = (ls) => Platform.OS === 'android' ? ls + 0.3 : ls + 0.1;

// 여백 조정
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// 플랫폼별 스타일 조정
export const platformStyle = (iosStyle, androidStyle) => {
    return Platform.OS === 'ios' ? iosStyle : androidStyle;
};