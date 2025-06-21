// utils/theme.js
import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 피그마 디자인 기준 크기 (중간 크기 기준 - iPhone 14 Pro)
const DESIGN_WIDTH = 393;   // iPhone 14 Pro 기준 (중간 크기)
const DESIGN_HEIGHT = 852;  // iPhone 14 Pro 기준 (중간 크기)

// 스케일링 비율 계산 (가장 중요한 부분)
const getScaleRatio = () => {
  const widthRatio = SCREEN_WIDTH / DESIGN_WIDTH;
  const heightRatio = SCREEN_HEIGHT / DESIGN_HEIGHT;
  
  // 가로 기준으로 스케일링하되, 너무 극단적이지 않게 제한
  const clampedRatio = Math.min(Math.max(widthRatio, 0.7), 1.5);
  return clampedRatio;
};

const SCALE_RATIO = getScaleRatio();

// 메인 스케일링 함수 - 모든 크기에 적용
export const scale = (size) => {
  const scaledSize = size * SCALE_RATIO;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// 수직 스케일링 - 높이 기반
export const verticalScale = (size) => {
  const heightRatio = SCREEN_HEIGHT / DESIGN_HEIGHT;
  const clampedRatio = Math.min(Math.max(heightRatio, 0.7), 1.5);
  const scaledSize = size * clampedRatio;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// 폰트 스케일링 - 텍스트는 더 보수적으로
export const scaleFont = (size) => {
  // 폰트는 0.8배~1.2배 사이로 제한
  const fontRatio = Math.min(Math.max(SCALE_RATIO, 0.8), 1.2);
  const scaledSize = size * fontRatio;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// 중간값 스케일링 - 패딩, 마진 등에 사용
export const moderateScale = (size, factor = 0.5) => {
  const scaledSize = size + (scale(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
};

// CultureSnack 앱 전용 디자인 토큰
export const designTokens = {
  // 컬러 시스템
  colors: {
    primary: '#DAA520',
    background: '#0D1B2A',
    surface: '#1E3A5F',
    text: {
      primary: '#F0F0F0',
      secondary: '#CCCCCC',
      accent: '#DAA520',
    },
    accent: '#FF6B35',
    white: '#FFFFFF',
    black: '#000000',
  },

  // 폰트 시스템
  fonts: {
    regular: 'PlayfairDisplay-Regular',
    semibold: 'PlayfairDisplay-SemiBold',
    bold: 'PlayfairDisplay-Bold',
  },

  // 타이포그래피 프리셋 (피그마 디자인 기준으로 완벽 재현)
  typography: {
    // 메인 로고 "CultureSnack"
    logo: {
      fontSize: scaleFont(60),
      fontFamily: 'PlayfairDisplay-Bold',
      color: '#DAA520',
      fontWeight: '700',
      letterSpacing: scale(4),
      textAlign: 'center',
    },
    
    // 메인 텍스트 (3줄 설명)
    mainText: {
      fontSize: scaleFont(18),
      fontFamily: 'PlayfairDisplay-Regular',
      color: '#F0F0F0',
      fontWeight: '400',
      letterSpacing: scale(0.3),
      lineHeight: verticalScale(38),
    },
    
    // 서브 타이틀 "Savor culture lightly"
    subTitle: {
      fontSize: scaleFont(32),
      fontFamily: 'PlayfairDisplay-Bold',
      color: '#F0F0F0',
      fontWeight: '700',
      letterSpacing: scale(2.0),
      lineHeight: verticalScale(45),
    },
    
    // 설명 텍스트 "A piece of culture"
    description: {
      fontSize: scaleFont(20),
      fontFamily: 'PlayfairDisplay-Regular',
      color: '#F0F0F0',
      fontWeight: '400',
      letterSpacing: scale(0.8),
      lineHeight: verticalScale(45),
    },
  },

  // 간격 시스템 (모든 여백과 위치)
  spacing: {
    // 기본 간격
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(48),
    
    // 컴포넌트별 특수 간격 (피그마에서 측정한 값들)
    headerTop: verticalScale(40),        // 헤더 상단 여백
    textLeft: scale(30),                 // 텍스트 왼쪽 여백
    textMarginTop: verticalScale(20),    // 텍스트 상단 여백
    textMarginBottom: verticalScale(4),  // 텍스트 줄 간격
    contentGap: verticalScale(40),       // 콘텐츠 블록 간격
    bottomPadding: scale(60),            // 하단 패딩
    decorativeRight: scale(25),          // 장식 요소 오른쪽 여백
    subTitleTop: verticalScale(190),     // 서브타이틀 상단 위치
  },

  // 레이아웃 시스템 (모든 위치와 크기)
  layout: {
    // 기본 레이아웃
    containerPadding: scale(20),
    maxWidth: SCREEN_WIDTH,
    
    // 메인 이미지 (중앙 아이콘)
    mainImage: {
      size: scale(260),
      left: scale(60),
      top: verticalScale(200),
      imageScale: 0.8, // 이미지 자체는 80% 크기
    },
    
    // 왼쪽 장식 이미지
    decorativeLeft: {
      left: scale(-54),
      top: verticalScale(570),
      size: scale(262),
    },
    
    // 오른쪽 장식 이미지
    decorativeRight: {
      left: scale(185),
      top: verticalScale(570),
      size: scale(262),
    },
  },

  // 화면 정보
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scale: SCALE_RATIO,
    designWidth: DESIGN_WIDTH,
    designHeight: DESIGN_HEIGHT,
    
    // 화면 크기 분류
    isSmallScreen: SCREEN_WIDTH < 360,
    isMediumScreen: SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 430,
    isLargeScreen: SCREEN_WIDTH >= 430,
    
    // 디버그 정보
    info: `${SCREEN_WIDTH}x${SCREEN_HEIGHT} (scale: ${SCALE_RATIO.toFixed(2)})`,
  },
};

// 브레이크포인트 시스템
export const breakpoints = {
  xs: 320,   // iPhone SE
  sm: 375,   // iPhone 12 mini
  md: 393,   // iPhone 14 Pro (기준)
  lg: 430,   // iPhone 14 Pro Max
  xl: 480,   // 대형 기기
};

export const getCurrentBreakpoint = () => {
  if (SCREEN_WIDTH >= breakpoints.xl) return 'xl';
  if (SCREEN_WIDTH >= breakpoints.lg) return 'lg';
  if (SCREEN_WIDTH >= breakpoints.md) return 'md';
  if (SCREEN_WIDTH >= breakpoints.sm) return 'sm';
  return 'xs';
};

// 반응형 유틸리티
export const responsive = {
  // 조건부 값 반환
  getValue: (small, medium, large) => {
    if (SCREEN_WIDTH < 360) return small;
    if (SCREEN_WIDTH < 430) return medium;
    return large;
  },
  
  // 브레이크포인트별 값 반환
  getValueByBreakpoint: (values) => {
    const breakpoint = getCurrentBreakpoint();
    return values[breakpoint] || values.md || values;
  },
  
  // 화면 크기 체크
  isSmall: () => SCREEN_WIDTH < 360,
  isMedium: () => SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 430,
  isLarge: () => SCREEN_WIDTH >= 430,
};

// 플랫폼별 조정 (필요시 사용)
export const platformAdjust = {
  fontSize: (size) => Platform.OS === 'android' ? size - 0.5 : size,
  lineHeight: (height) => Platform.OS === 'android' ? height - 1 : height,
  letterSpacing: (spacing) => Platform.OS === 'android' ? spacing + 0.1 : spacing,
};

// 디버그 함수 (개발 중 사용)
export const debugScale = () => {
  console.log('=== Scale Debug Info ===');
  console.log(`Screen: ${SCREEN_WIDTH}x${SCREEN_HEIGHT}`);
  console.log(`Design: ${DESIGN_WIDTH}x${DESIGN_HEIGHT}`);
  console.log(`Scale Ratio: ${SCALE_RATIO.toFixed(3)}`);
  console.log(`Breakpoint: ${getCurrentBreakpoint()}`);
  console.log('========================');
};

export default designTokens;