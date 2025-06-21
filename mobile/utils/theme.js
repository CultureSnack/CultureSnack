import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 기준 디자인 크기 (갤럭시 S24 Ultra)
const BASE_WIDTH = 400;
const BASE_HEIGHT = 844;

// 화면 크기에 따른 비율 계산
export const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// 브레이크포인트 정의 (최신 기기 기준)
export const breakpoints = {
  xs: 360,   // 작은 기기
  sm: 390,   // iPhone 15
  md: 430,   // iPhone 15 Pro
  lg: 1290,  // iPhone 15 Pro Max
  xl: 1440,  // 갤럭시 S24 Ultra
  xxl: 1440  // 기준 크기 (갤럭시 S24 Ultra)
};

// 현재 화면 크기에 따른 브레이크포인트 계산
export const getCurrentBreakpoint = () => {
  if (SCREEN_WIDTH >= breakpoints.xxl) return 'xxl';
  if (SCREEN_WIDTH >= breakpoints.xl) return 'xl';
  if (SCREEN_WIDTH >= breakpoints.lg) return 'lg';
  if (SCREEN_WIDTH >= breakpoints.md) return 'md';
  if (SCREEN_WIDTH >= breakpoints.sm) return 'sm';
  return 'xs';
};

// 기본 폰트 크기 정의 (rem 단위)
export const baseFontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
};

// 간격 정의 (em 단위)
export const spacing = {
  xs: 0.25, // 4px
  sm: 0.5,  // 8px
  md: 1,    // 16px
  lg: 1.5,  // 24px
  xl: 2,    // 32px
  xxl: 3,   // 48px
};

// 색상 정의
export const colors = {
  primary: '#DAA520',
  background: '#0D1B2A',
  text: '#F0F0F0',
};

// 폰트 패밀리 정의
export const fonts = {
  regular: 'PlayfairDisplay-Regular',
  semibold: 'PlayfairDisplay-SemiBold',
  bold: 'PlayfairDisplay-Bold',
};

// 반응형 유틸리티 함수
export const getResponsiveValue = (values) => {
  const breakpoint = getCurrentBreakpoint();
  return values[breakpoint] || values.md;
};

// 디바운스 함수
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}; 