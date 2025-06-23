import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 🎯 기준 화면 (iPhone 14 Pro)
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

// 📐 비율 계산
const WIDTH_RATIO = SCREEN_WIDTH / DESIGN_WIDTH;
const HEIGHT_RATIO = SCREEN_HEIGHT / DESIGN_HEIGHT;

// 🔧 픽셀 계산 함수
const perfectPixel = (size, ratio) =>
  Math.round(PixelRatio.roundToNearestPixel(size * ratio));

export const w = (size) => perfectPixel(size, WIDTH_RATIO);
export const h = (size) => perfectPixel(size, HEIGHT_RATIO);

// 🔤 스마트 폰트 계산
export const smartFont = (baseSize, text, maxWidth) => {
  const textLength = text.length;
  const densityFactor = (textLength / maxWidth) * 1000;

  let fontSize = w(baseSize);
  if (densityFactor > 15) fontSize *= 0.85;
  else if (densityFactor > 12) fontSize *= 0.92;

  return Math.round(fontSize);
};

// 📱 퍼센트 기반 위치
export const screenPercent = {
  width: (percent) => SCREEN_WIDTH * (percent / 100),
  height: (percent) => SCREEN_HEIGHT * (percent / 100),
};

// 🎨 테마 시스템
const theme = {
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

// 🎯 레이아웃 구성
export const layout = {
  header: {
    topPercent: 2,
    heightPercent: 15,
  },
  mainText: {
    topPercent: 17,
    heightPercent: 18,
    leftPercent: 6,
    rightPercent: 6,
  },
  image: {
    centerXPercent: 50,
    centerYPercent: 49,
    sizePercent: 70,
  },
  subtitle: {
    topPercent: 70,
    heightPercent: 30,
    rightPercent: 6,
    leftPercent: 6,
  },
  decorative: {
    yPercent: 85,
    leftXPercent: -6,
    rightXPercent: 75,
    sizePercent: 32,
  },
};

// 📝 텍스트 스타일 (타이포그래피)
export const typography = {
  logo: {
    fontSize: smartFont(64, 'CultureSnack', SCREEN_WIDTH * 0.9),
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    letterSpacing: w(1.5),
    lineHeight: h(60),
    textAlign: 'center',
  },
  mainText: {
    line1: {
      fontSize: smartFont(14, 'Culture, reimagined in the language of Gen Z.', SCREEN_WIDTH * 0.88),
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      letterSpacing: w(0.3),
      lineHeight: h(24),
    },
    line2: {
      fontSize: smartFont(14, 'Less jargon, more clarity.', SCREEN_WIDTH * 0.88),
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      letterSpacing: w(0.3),
      lineHeight: h(24),
    },
    line3: {
      fontSize: smartFont(14, 'AI reads it. We tell it simply.', SCREEN_WIDTH * 0.88),
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      letterSpacing: w(0.3),
      lineHeight: h(24),
    },
  },
  subtitle: {
    multiLine: {
      fontSize: smartFont(28, 'Savor culture lightly, Remember deeply', SCREEN_WIDTH * 0.7),
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      fontWeight: 'bold',
      letterSpacing: w(1.2),
      lineHeight: h(38),
      textAlign: 'right',
      marginTop: h(-150),
    },
  },
  description: {
    fontSize: smartFont(14, "A piece of culture you can't forget.", SCREEN_WIDTH * 0.7),
    fontFamily: theme.fonts.regular,
    color: theme.colors.secondary,
    letterSpacing: w(0.5),
    lineHeight: h(20),
    textAlign: 'center',
    marginTop: h(12),
  },
  tableOfContents: {
    verticalTitle: {
      fontSize: SCREEN_WIDTH * 0.1,
      fontFamily: theme.fonts.bold,
      color: theme.colors.primary,
      letterSpacing: w(1),
    },
    itemTitle: {
      fontSize: SCREEN_WIDTH * 0.04,
      fontFamily: theme.fonts.bold,
      fontWeight: 'bold',
      color: '#F7E7CE',
      lineHeight: SCREEN_WIDTH * 0.08,
      textAlign: 'left',
    },
    itemDescription: {
      fontSize: SCREEN_WIDTH * 0.035,
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      lineHeight: SCREEN_WIDTH * 0.045,
      opacity: 1,
    },
    comingSoon: {
      fontSize: SCREEN_WIDTH * 0.03,
      fontFamily: theme.fonts.bold,
      color: theme.colors.primary,
      lineHeight: SCREEN_WIDTH * 0.04,
    },
  },
  brief: {
    navTitle: {
      fontSize: smartFont(15, 'Pick Your Snack', SCREEN_WIDTH * 0.28),
      fontFamily: theme.fonts.semibold,
      color: theme.colors.primary,
      lineHeight: w(18),
    },
    navDescription: {
      fontSize: smartFont(10, '컬처스넥 사용 가이드북', SCREEN_WIDTH * 0.25),
      fontFamily: theme.fonts.regular,
      color: theme.colors.text,
      lineHeight: w(15),
    },
    description: {
      fontSize: smartFont(13, '문화 관련 설명이 어렵다면 AI가 요약하고 쉬운말로 바꿔드릴게요.', SCREEN_WIDTH * 0.88),
      fontFamily: theme.fonts.regular,
      color: '#F7E7CE',
      lineHeight: w(22),
      textAlign: 'center',
    },
    brandTitle: {
      fontSize: smartFont(56, 'CultureSnack', SCREEN_WIDTH * 0.89),
      fontFamily: theme.fonts.semibold,
      color: theme.colors.primary,
      lineHeight: w(67),
      textAlign: 'left',
    },
    inputPrompt: {
      fontSize: smartFont(12, '말하거나 입력도 가능해요', SCREEN_WIDTH * 0.32),
      fontFamily: theme.fonts.regular,
      color: '#F7E7CE',
      lineHeight: w(20),
      textAlign: 'center',
    },
  },
  manual: {}, // placeholder for merge below
};

// 📦 이미지 레이아웃
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

// 📘 매뉴얼 전용 스타일
export const manual = {
  logo: {
    width: w(80),
    height: w(80),
    borderRadius: w(40),
  },
  mainGuide: {
    image: {
      width: SCREEN_WIDTH * 1.3,
      height: SCREEN_WIDTH * 1.3,
    },
    textOverlay: {
      left: w(60),
      right: w(60),
    },
    text1: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#f7e7ce',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      marginBottom: 5,
    },
    text2: {
      fontSize: 12,
      fontFamily: theme.fonts.regular,
      color: '#f7e7ce',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      marginBottom: 5,
    },
    text3: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#daa520',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
  },
  icons: {
    row: {
      width: '95%',
      marginBottom: h(30),
      paddingHorizontal: w(10),
    },
    block: {
      width: '30%',
    },
    image: {
      width: w(100),
      height: w(100),
    },
    overlay: {
      paddingHorizontal: w(8),
    },
    text: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#f7e7ce',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
  },
  chat: {
    block: {
      width: '90%',
      marginBottom: h(20),
      marginTop: h(30),
    },
    rightContainer: {
      marginRight: w(-10),
    },
    leftContainer: {
      marginLeft: w(-20),
    },
    image: {
      width: SCREEN_WIDTH * 0.6,
      height: SCREEN_WIDTH * 0.6,
    },
    textOverlay: {
      paddingHorizontal: w(20),
      paddingVertical: h(15),
    },
    text: {
      fontSize: 9,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#f7e7ce',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.8)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      lineHeight: 15,
    },
    rightOverlay: {
      paddingLeft: w(-40),
      paddingRight: w(20),
      paddingVertical: h(15),
    },
    leftOverlay: {
      paddingLeft: w(25),
      paddingRight: w(-50),
      paddingVertical: h(15),
    },
  },
  bottomText: {
    main: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#f7e7ce',
      marginBottom: h(15),
    },
    text1: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#f7e7ce',
      marginTop: h(15),
      marginBottom: h(15),
    },
    text2: {
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#f7e7ce',
      marginTop: h(15),
      marginBottom: h(15),
    },
  },
  button: {
    paddingVertical: h(10),
    paddingHorizontal: w(40),
    marginTop: h(60),
    marginBottom: h(50),
    borderRadius: w(25),
    borderWidth: 2,
    borderColor: '#daa520',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold,
      color: '#daa520',
      textAlign: 'center',
      letterSpacing: w(0.5),
    },
  },
  decoration: {
    topLeft: {
      left: SCREEN_WIDTH * -0.06,
      top: SCREEN_HEIGHT * -0.01,
      width: SCREEN_WIDTH * 0.32,
      height: SCREEN_WIDTH * 0.32,
    },
    topRight: {
      right: SCREEN_WIDTH * -0.07,
      top: SCREEN_HEIGHT * -0.01,
      width: SCREEN_WIDTH * 0.32,
      height: SCREEN_WIDTH * 0.32,
    },
    bottomLeft: {
      left: SCREEN_WIDTH * -0.06,
      bottom: SCREEN_HEIGHT * -0.02,
      width: SCREEN_WIDTH * 0.32,
      height: SCREEN_WIDTH * 0.32,
    },
    bottomRight: {
      right: SCREEN_WIDTH * -0.07,
      bottom: SCREEN_HEIGHT * -0.02,
      width: SCREEN_WIDTH * 0.32,
      height: SCREEN_WIDTH * 0.32,
    },
  },
};

// 매뉴얼 스타일 포함
typography.manual = manual;

// 📊 디버그 출력
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

// 위치 계산
export const pos = {
  x: (percent) => screenPercent.width(percent),
  y: (percent) => screenPercent.height(percent),
  centerX: (width) => (SCREEN_WIDTH - width) / 2,
  centerY: (height) => (SCREEN_HEIGHT - height) / 2,
};

export { theme };
export default theme;
