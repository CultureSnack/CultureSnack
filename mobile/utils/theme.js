// utils/theme.js - 완전히 새로운 완벽한 시스템
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 🎯 기준 화면 (중간 크기 기준)
const DESIGN_WIDTH = 393;   // iPhone 14 Pro
const DESIGN_HEIGHT = 852;  // iPhone 14 Pro

// 📐 완벽한 비율 계산
const WIDTH_SCALE = SCREEN_WIDTH / DESIGN_WIDTH;
const HEIGHT_SCALE = SCREEN_HEIGHT / DESIGN_HEIGHT;

// 🔧 핵심 스케일링 함수들
export const scale = (size) => {
  const scaled = size * WIDTH_SCALE;
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

export const verticalScale = (size) => {
  const scaled = size * HEIGHT_SCALE;
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

export const fontScale = (size) => {
  // 폰트는 너무 크거나 작아지지 않게 제한
  const limitedScale = Math.min(Math.max(WIDTH_SCALE, 0.85), 1.25);
  const scaled = size * limitedScale;
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

// 🎨 완벽한 디자인 토큰
export const theme = {
  // 색상 시스템
  colors: {
    primary: '#DAA520',
    background: '#0D1B2A',
    text: '#F0F0F0',
    secondary: '#CCCCCC',
  },
  
  // 폰트 시스템
  fonts: {
    regular: 'PlayfairDisplay-Regular',
    semibold: 'PlayfairDisplay-SemiBold',
    bold: 'PlayfairDisplay-Bold',
  },
  
  // 간격 시스템
  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(48),
  },
  
  // 화면 정보
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    availableHeight: SCREEN_HEIGHT * 0.95, // 상태바 등 고려
  },
};

// 🎯 메인 화면 전용 레이아웃 (한 화면에 모든 요소가 들어가도록 계산)
export const mainLayout = {
  // 헤더 영역 (화면 상단 15%)
  header: {
    height: theme.screen.availableHeight * 0.15,
    paddingTop: verticalScale(20),
  },
  
  // 메인 텍스트 영역 (화면 20%)
  mainText: {
    height: theme.screen.availableHeight * 0.20,
    paddingLeft: scale(25),
    paddingTop: verticalScale(10),
  },
  
  // 이미지 영역 (화면 중앙 35%)
  image: {
    height: theme.screen.availableHeight * 0.35,
    centerY: theme.screen.availableHeight * 0.45, // 화면 45% 지점에 중앙
  },
  
  // 서브 타이틀 영역 (화면 하단 25%)
  subtitle: {
    height: theme.screen.availableHeight * 0.25,
    startY: theme.screen.availableHeight * 0.70, // 화면 70% 지점부터
    paddingRight: scale(25),
  },
  
  // 장식 이미지들 (이미지 영역과 겹치도록)
  decorative: {
    y: theme.screen.availableHeight * 0.40, // 메인 이미지와 같은 높이
  },
};

// 📱 타이포그래피 (화면 비율에 맞춰 조정)
export const typography = {
  // 메인 로고
  logo: {
    fontSize: fontScale(Math.min(SCREEN_WIDTH * 0.13, 52)), // 화면 너비의 13% (최대 52)
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    letterSpacing: scale(1.5),
  },
  
  // 메인 텍스트 (3줄)
  mainText: {
    fontSize: fontScale(Math.min(SCREEN_WIDTH * 0.040, 16)), // 화면 너비의 4% (최대 16)
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    lineHeight: verticalScale(22),
    letterSpacing: scale(0.3),
  },
  
  // 서브 타이틀
  subtitle: {
    fontSize: fontScale(Math.min(SCREEN_WIDTH * 0.070, 28)), // 화면 너비의 7% (최대 28)
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    lineHeight: verticalScale(36),
    letterSpacing: scale(1.2),
  },
  
  // 설명 텍스트
  description: {
    fontSize: fontScale(Math.min(SCREEN_WIDTH * 0.035, 14)), // 화면 너비의 3.5% (최대 14)
    fontFamily: theme.fonts.regular,
    color: theme.colors.secondary,
    lineHeight: verticalScale(20),
    letterSpacing: scale(0.5),
  },
};

// 🖼️ 이미지 크기 (화면 비율에 맞춰)
export const imageLayout = {
  // 메인 이미지
  main: {
    size: Math.min(SCREEN_WIDTH * 0.6, SCREEN_HEIGHT * 0.25), // 화면의 60% 또는 높이의 25% 중 작은 값
    centerX: SCREEN_WIDTH / 2,
    centerY: mainLayout.image.centerY,
  },
  
  // 장식 이미지들
  decorativeSize: Math.min(SCREEN_WIDTH * 0.45, 180), // 화면의 45% (최대 180)
  decorativeLeft: {
    x: -scale(30), // 왼쪽으로 약간 나가도록
    y: mainLayout.decorative.y,
  },
  decorativeRight: {
    x: SCREEN_WIDTH - scale(150), // 오른쪽에 적절히 위치
    y: mainLayout.decorative.y,
  },
};

// 🔍 디버그 정보
export const debugInfo = () => {
  console.log('=== Perfect Theme Debug ===');
  console.log(`화면 크기: ${SCREEN_WIDTH}x${SCREEN_HEIGHT}`);
  console.log(`기준 크기: ${DESIGN_WIDTH}x${DESIGN_HEIGHT}`);
  console.log(`가로 비율: ${(WIDTH_SCALE * 100).toFixed(1)}%`);
  console.log(`세로 비율: ${(HEIGHT_SCALE * 100).toFixed(1)}%`);
  console.log(`사용 가능 높이: ${theme.screen.availableHeight.toFixed(0)}px`);
  console.log('===========================');
};

export default theme;