// utils/theme.js - 최종 완성본
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 🎯 기준 화면 (iPhone 14 Pro)
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

// 📐 정확한 비율 계산
const WIDTH_RATIO = SCREEN_WIDTH / DESIGN_WIDTH;
const HEIGHT_RATIO = SCREEN_HEIGHT / DESIGN_HEIGHT;

// 🔧 완벽한 픽셀 계산
const perfectPixel = (size, ratio) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * ratio));
};

export const w = (size) => perfectPixel(size, WIDTH_RATIO);
export const h = (size) => perfectPixel(size, HEIGHT_RATIO);

// 🔤 스마트 폰트 크기 계산 (텍스트 줄바꿈 방지)
export const smartFont = (baseSize, text, maxWidth) => {
  const textLength = text.length;
  const availableWidth = maxWidth;
  
  // 텍스트 밀도 계산
  const densityFactor = textLength / availableWidth * 1000;
  
  let fontSize = w(baseSize);
  
  // 텍스트가 길고 화면이 작으면 폰트 크기 자동 조정
  if (densityFactor > 15) {
    fontSize = fontSize * 0.85; // 15% 작게
  } else if (densityFactor > 12) {
    fontSize = fontSize * 0.92; // 8% 작게
  }
  
  return Math.round(fontSize);
};

// 📱 화면 비율 기준 위치
export const screenPercent = {
  width: (percent) => SCREEN_WIDTH * (percent / 100),
  height: (percent) => SCREEN_HEIGHT * (percent / 100),
};

// 🎨 테마 시스템
export const theme = {
  colors: {
    primary: '#DAA520',
    background: '#0D1B2A',
    text: '#F0F0F0',
    secondary: '#CCCCCC',
  },
  
  fonts: {
    regular: 'PlayfairDisplay-Regular',
    semibold: 'PlayfairDisplay-SemiBold',
    bold: 'PlayfairDisplay-Bold',
  },
  
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    widthRatio: WIDTH_RATIO,
    heightRatio: HEIGHT_RATIO,
  },
};

// 🎯 레이아웃 (화면 비율 기준)
export const layout = {
  header: {
    topPercent: 2,      // 화면 상단 2%부터
    heightPercent: 15,  // 화면 높이의 15%
  },
  
  mainText: {
    topPercent: 17,     // 화면 17%부터
    heightPercent: 18,  // 화면 높이의 18%
    leftPercent: 6,     // 화면 왼쪽에서 6%
    rightPercent: 6,    // 화면 오른쪽에서 6%
  },
  
  image: {
    centerXPercent: 50, // 화면 가로 중앙
    centerYPercent: 42, // 화면 세로 42% 지점
    sizePercent: 55,    // 화면 너비의 55%
  },
  
  subtitle: {
    topPercent: 70,     // 화면 70%부터
    heightPercent: 30,  // 화면 높이의 30%
    rightPercent: 6,    // 화면 오른쪽에서 6%
    leftPercent: 6,     // 화면 왼쪽에서 6%
  },
  
  decorative: {
    yPercent: 85,       // 화면 35% 높이
    leftXPercent: -6,   // 화면 왼쪽에서 -8%
    rightXPercent: 75,  // 화면 75% 지점
    sizePercent: 32,    // 화면 너비의 22%
  },
};

// 📝 스마트 타이포그래피 (줄바꿈 방지)
export const typography = {
  // 메인 로고
  logo: {
    fontSize: smartFont(64, "CultureSnack", SCREEN_WIDTH * 0.9),
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    letterSpacing: w(1.5),
    lineHeight: h(60),
    textAlign: 'center',
  },
  
  // 메인 텍스트 (각 줄별로 개별 계산)
  mainText: {
    line1: {
      fontSize: smartFont(14, "Culture, reimagined in the language of Gen Z.", SCREEN_WIDTH * 0.88),
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      letterSpacing: w(0.3),
      lineHeight: h(24),
    },
    line2: {
      fontSize: smartFont(14, "Less jargon, more clarity.", SCREEN_WIDTH * 0.88),
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      letterSpacing: w(0.3),
      lineHeight: h(24),
    },
    line3: {
      fontSize: smartFont(14, "AI reads it. We tell it simply.", SCREEN_WIDTH * 0.88),
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      letterSpacing: w(0.3),
      lineHeight: h(24),
    },
  },
  
  // 서브타이틀
  subtitle: {
    multiLine: {
      fontSize: smartFont(28, "Savor culture lightly, Remember deeply", SCREEN_WIDTH * 0.70),
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      letterSpacing: w(1.2),
      lineHeight: h(38),
      textAlign: 'right',
      marginTop: h(-90),
    },
  },
  
  // 설명 텍스트 (한 줄 보장)
  description: {
    fontSize: smartFont(14, "A piece of culture you can't forget.", SCREEN_WIDTH * 0.70),
    fontFamily: theme.fonts.regular,
    color: theme.colors.secondary,
    letterSpacing: w(0.5),
    lineHeight: h(20),
    textAlign: 'center',
    marginTop: h(12),
  },
};

// 🖼️ 이미지 레이아웃
export const images = {
  main: {
    size: screenPercent.width(layout.image.sizePercent),
    centerX: screenPercent.width(layout.image.centerXPercent),
    centerY: screenPercent.height(layout.image.centerYPercent),
  },
  
  decorative: {
    size: screenPercent.width(layout.decorative.sizePercent),
    leftX: screenPercent.width(layout.decorative.leftXPercent),
    rightX: screenPercent.width(layout.decorative.rightXPercent),
    y: screenPercent.height(layout.decorative.yPercent),
  },
};

// 🔍 디버그 정보
export const debugInfo = () => {
  console.log('=== 완벽한 반응형 시스템 ===');
  console.log(`📱 화면: ${SCREEN_WIDTH}x${SCREEN_HEIGHT}`);
  console.log(`📐 가로 비율: ${(WIDTH_RATIO * 100).toFixed(1)}%`);
  console.log(`📐 세로 비율: ${(HEIGHT_RATIO * 100).toFixed(1)}%`);
  console.log(`🔤 로고 폰트: ${typography.logo.fontSize}px`);
  console.log(`📝 본문 폰트: ${typography.mainText.line1.fontSize}px`);
  console.log(`💬 설명 폰트: ${typography.description.fontSize}px`);
  console.log('============================');
};

export const pos = {
  x: (percent) => screenPercent.width(percent),
  y: (percent) => screenPercent.height(percent),
  centerX: (width) => (SCREEN_WIDTH - width) / 2,
  centerY: (height) => (SCREEN_HEIGHT - height) / 2,
};

export default theme;