import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, typography } from '../utils/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CultureManual = () => {
  const navigation = useNavigation();

  const handleBackToMain = () => {
    console.log('🔄 로고 클릭 - 메인으로 이동');
    console.log('Navigation 객체:', navigation);
    
    if (navigation) {
      console.log('✅ Navigation 존재 - 메인으로 이동');
      try {
        // 메인 페이지의 첫 번째 섹션(0번 인덱스)으로 이동
        navigation.navigate('index', { scrollToSection: 0 });
        console.log('📱 index 페이지 메인 섹션으로 이동');
      } catch (error) {
        console.error('❌ Navigation 에러:', error);
        Alert.alert('에러', '메인 화면으로 이동하는 중 오류가 발생했습니다.');
      }
    } else {
      console.log('❌ Navigation이 없음');
      Alert.alert('알림', 'Navigation이 설정되지 않았습니다.');
    }
  };

  const handleGoToBrief = () => {
    console.log('🔄 브리프로 이동 버튼 클릭');
    console.log('Navigation 객체:', navigation);
    
    if (navigation) {
      console.log('✅ Navigation 존재 - 브리프로 이동');
      try {
        // 브리프 섹션(2번 인덱스)으로 이동
        navigation.navigate('index', { scrollToSection: 2 });
        console.log('📱 index 페이지 브리프 섹션으로 이동');
      } catch (error) {
        console.error('❌ Navigation 에러:', error);
        Alert.alert('에러', '브리프 화면으로 이동하는 중 오류가 발생했습니다.');
      }
    } else {
      console.log('❌ Navigation이 없음');
      Alert.alert('알림', 'Navigation이 설정되지 않았습니다.');
    }
  };

  // 강제로 메인으로 이동하는 함수
  const forceNavigateToMain = () => {
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: 'index' }],
      });
    } catch (error) {
      console.error('강제 이동 실패:', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d1b2a" />

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ ...styles.container, minHeight: screenHeight }}>
        {/* 로고 & 상단바 */}
        <TouchableOpacity style={styles.navBar} onPress={handleBackToMain} activeOpacity={0.7}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>

        {/* 메인 안내 */}
        <View style={styles.mainGuideContainer}>
          <Image source={require('../assets/guide1.png')} style={styles.guideMainImage} />
          <View style={styles.textOverlay}>
            <Text style={styles.guideText1}>문화재, 문화유산</Text>
            <Text 
              style={styles.guideText2}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.7}
            >
              설명이 너무 어렵다면?
            </Text>
            <Text style={styles.guideText3}>AI가 쉬운 말로 변환해줘요.</Text>
          </View>
        </View>

        {/* 기능 아이콘 영역 */}
        <View style={styles.iconRow}>
          <View style={styles.iconBlock}>
            <Image source={require('../assets/guide-main.png')} style={styles.icon} />
            <View style={styles.iconTextOverlay}>
              <Text 
                style={styles.iconText}
                numberOfLines={2}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
              >
                말하면{'\n'}입력하면
              </Text>
            </View>
          </View>
          <View style={styles.iconBlock}>
            <Image source={require('../assets/guide-main.png')} style={styles.icon} />
            <View style={styles.iconTextOverlay}>
              <Text 
                style={styles.iconText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
              >
                AI가 변환
              </Text>
            </View>
          </View>
          <View style={styles.iconBlock}>
            <Image source={require('../assets/guide-main.png')} style={styles.icon} />
            <View style={styles.iconTextOverlay}>
              <Text 
                style={styles.iconText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.7}
              >
                듣기 기능까지
              </Text>
            </View>
          </View>
        </View>

        {/* 예시 대화 */}
        <View style={styles.chatBlock}>
          <View style={styles.rightChat}>
            <View style={styles.chatContainer}>
              <Image source={require('../assets/guide-chat.png')} style={styles.chat} />
              <View style={[styles.chatTextOverlay, styles.rightTextOverlay]}>
                <Text 
                  style={[styles.chatText, styles.rightChatText]}
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.7}
                >
                  근정전은 조선시대{'\n'}왕의 공식 행사 장소였다.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.leftChat}>
            <View style={styles.chatContainer}>
              <Image source={require('../assets/guide-chat.png')} style={[styles.chat, styles.mirrorChat]} />
              <View style={[styles.chatTextOverlay, styles.leftTextOverlay]}>
                <Text 
                  style={[styles.chatText, styles.leftChatText]}
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.7}
                >
                  조선시대 왕이{'\n'}공식 행사를 치르던 장소예요.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 하단 안내문 */}
        <Text style={styles.mainText}>"말하거나 입력해요"</Text>
        <Text style={styles.bottomText1}>"쉬운 말로 변환된 문장 바로 확인해요"</Text>
        <Text style={styles.bottomText2}>"눈이 피곤하다면 귀로 들어보세요"</Text>
        
        {/* 브리프 이동동 버튼 */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoToBrief} activeOpacity={0.8}>
          <Text style={styles.bottomText3}>지금 바로 시작해보세요</Text>
        </TouchableOpacity>

        {/* 상단 왼쪽 장식 (뒤집힌) */}
        <View style={styles.topLeftDecoration}>
          <Image 
            source={require('../assets/decorative-1.png')} 
            style={styles.topDecorativeImage}
            resizeMode="contain"
          />
        </View>
        
        {/* 상단 오른쪽 장식 (뒤집힌) */}
        <View style={styles.topRightDecoration}>
          <Image 
            source={require('../assets/decorative-2.png')} 
            style={styles.topDecorativeImage}
            resizeMode="contain"
          />
        </View>

        {/* 하단 왼쪽 장식 */}
        <View style={styles.bottomLeftDecoration}>
          <Image 
            source={require('../assets/decorative-1.png')} 
            style={styles.bottomDecorativeImage}
            resizeMode="contain"
          />
        </View>
        
        {/* 하단 오른쪽 장식 */}
        <View style={styles.bottomRightDecoration}>
          <Image 
            source={require('../assets/decorative-2.png')} 
            style={styles.bottomDecorativeImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </>
  );
};

export default CultureManual;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: theme.colors.background,
  },
  navBar: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    marginTop: -30,
  },
  logo: {
    ...typography.manual.logo,
  },
  mainText: {
    ...typography.manual.bottomText.main,
  },
  mainGuideContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  guideMainImage: {
    ...typography.manual.mainGuide.image,
    resizeMode: 'contain',
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: typography.manual.mainGuide.textOverlay.left,
    right: typography.manual.mainGuide.textOverlay.right,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideText1: {
    ...typography.manual.mainGuide.text1,
  },
  guideText2: {
    ...typography.manual.mainGuide.text2,
  },
  guideText3: {
    ...typography.manual.mainGuide.text3,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    ...typography.manual.icons.row,
  },
  iconBlock: {
    alignItems: 'center',
    ...typography.manual.icons.block,
    position: 'relative',
  },
  icon: {
    ...typography.manual.icons.image,
  },
  iconTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...typography.manual.icons.overlay,
  },
  iconText: {
    ...typography.manual.icons.text,
  },
  chatBlock: {
    ...typography.manual.chat.block,
  },
  rightChat: {
    alignItems: 'flex-end',
    ...typography.manual.chat.rightContainer,
  },
  leftChat: {
    alignItems: 'flex-start',
    ...typography.manual.chat.leftContainer,
  },
  chatContainer: {
    position: 'relative',
  },
  chat: {
    ...typography.manual.chat.image,
    resizeMode: 'contain',
  },
  chatTextOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...typography.manual.chat.textOverlay,
  },
  chatText: {
    ...typography.manual.chat.text,
  },
  bottomText1: {
    ...typography.manual.bottomText.text1,
  },
  bottomText2: {
    ...typography.manual.bottomText.text2,
  },
  backButton: {
    ...typography.manual.button,
  },
  bottomText3: {
    ...typography.manual.button.text,
  },
  mirrorChat: {
    transform: [{ scaleX: -1 }],
  },
  rightChatText: {
    textAlign: 'center',
  },
  leftChatText: {
    textAlign: 'center',
  },
  rightTextOverlay: {
    ...typography.manual.chat.rightOverlay,
  },
  leftTextOverlay: {
    ...typography.manual.chat.leftOverlay,
  },
  topLeftDecoration: {
    position: 'absolute',
    ...typography.manual.decoration.topLeft,
  },
  topRightDecoration: {
    position: 'absolute',
    ...typography.manual.decoration.topRight,
  },
  topDecorativeImage: {
    width: '100%',
    height: '100%',
    transform: [{ scaleY: -1 }],
  },
  bottomLeftDecoration: {
    position: 'absolute',
    ...typography.manual.decoration.bottomLeft,
  },
  bottomRightDecoration: {
    position: 'absolute',
    ...typography.manual.decoration.bottomRight,
  },
  bottomDecorativeImage: {
    width: '100%',
    height: '100%',
  },
});
