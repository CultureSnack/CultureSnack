import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CultureManual = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0d1b2a" />

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ ...styles.container, minHeight: screenHeight }}>
        {/* 로고 & 상단바 */}
        <View style={styles.navBar}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>(내 문화 취향 찾기)</Text>
        </View>

        {/* 메인 안내 */}
        
        <Image source={require('../assets/guide1.png')} style={styles.guideMainImage} />
        <Text style={styles.guideText1}>문화재, 문화유산</Text>
        <Text style={styles.guideText2}>설명이 너무 어렵다면?</Text>
        <Text style={styles.guideText3}>AI가 쉬운 말로 변환해줘요.</Text>

        {/* 기능 아이콘 영역 */}
        <View style={styles.iconRow}>
          <View style={styles.iconBlock}>
            <Image source={require('../assets/guide-main.png')} style={styles.icon} />
            <Text style={styles.iconText}>말하면{'\n'}입력하면</Text>
          </View>
          <View style={styles.iconBlock}>
            <Image source={require('../assets/guide-main.png')} style={styles.icon} />
            <Text style={styles.iconText}>AI가 변환</Text>
          </View>
          <View style={styles.iconBlock}>
            <Image source={require('../assets/guide-main.png')} style={styles.icon} />
            <Text style={styles.iconText}>듣기 기능까지</Text>
          </View>
        </View>

        {/* 예시 대화 */}
        <View style={styles.chatBlock}>
          <View>
            <Image source={require('../assets/guide-chat.png')} style={styles.chat} />
            <Text style={styles.chatText}>근정전은 조선시대{'\n'}왕의 공식 행사 장소였다.</Text>
          </View>
          <View>
            <Image source={require('../assets/guide-chat.png')} style={styles.chat} />
            <Text style={styles.chatText}>조선시대 왕이{'\n'}공식 행사를 치르던 장소예요.</Text>
          </View>
        </View>

        {/* 하단 안내문 */}
        <Text style={styles.mainText}>“말하거나 입력해요”</Text>
        <Text style={styles.bottomText1}>“쉬운 말로 변환된 문장 바로 확인해요”</Text>
        <Text style={styles.bottomText2}>“눈이 피곤하다면 귀로 들어보세요”</Text>
        <Text style={styles.bottomText3}>지금 바로 시작해보세요</Text>
      </ScrollView>
    </>
  );
};

export default CultureManual;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#0d1b2a',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#0d1b2a',
  },
  navBar: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  logoText: {
    color: '#f0f0f0',
    fontSize: 12,
    marginTop: 6,
  },
  mainText: {
    color: '#f7e7ce',
    fontSize: 18,
    marginBottom: 30,
  },
  guideMainImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  guideText1: {
    color: '#f7e7ce',
    fontSize: 16,
    marginTop: 8,
  },
  guideText2: {
    color: '#f7e7ce',
    fontSize: 16,
    marginTop: 4,
  },
  guideText3: {
    color: '#f7e7ce',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 30,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  iconBlock: {
    alignItems: 'center',
    width: '30%',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 6,
  },
  iconText: {
    color: '#f7e7ce',
    fontSize: 14,
    textAlign: 'center',
  },
  chatBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  chat: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: 'contain',
  },
  chatText: {
    color: '#f7e7ce',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomText1: {
    color: '#f7e7ce',
    fontSize: 16,
    marginTop: 20,
  },
  bottomText2: {
    color: '#f7e7ce',
    fontSize: 16,
    marginTop: 10,
  },
  bottomText3: {
    color: '#daa520',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 40,
  },
});
