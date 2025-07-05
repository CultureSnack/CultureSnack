import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { View, Platform, StatusBar, AppRegistry } from 'react-native';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import Main from './pages/Main';
import CultureManual from './app/Culturesnack_Manual_Ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme, debugInfo } from './utils/theme';
import store from './store';

const Stack = createStackNavigator();

// 디버깅용 로그
console.log('📱 App.js 로딩됨');
console.log('📱 CultureManual 컴포넌트:', CultureManual);
console.log('📱 Main 컴포넌트:', Main);

export default function App() {
    console.log('🚀 App 컴포넌트 시작');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
                    'PlayfairDisplay-SemiBold': require('./assets/fonts/PlayfairDisplay-SemiBold.ttf'),
                    'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
                });
                console.log('✅ 폰트 로딩 완료');
                setFontsLoaded(true);
            } catch (error) {
                console.error('❌ 폰트 로딩 실패:', error);
                setFontsLoaded(true); // 실패해도 계속 진행
            }
        }

        async function setupPlatformUI() {
            // 모바일에서만 실행
            if (Platform.OS !== 'web') {
                // 안드로이드 설정
                if (Platform.OS === 'android') {
                    try {
                        const NavigationBar = require('expo-navigation-bar');
                        await NavigationBar.setBackgroundColorAsync(theme.colors.background);
                        await NavigationBar.setButtonStyleAsync('light');
                        console.log('✅ 안드로이드 UI 설정 완료');
                    } catch (error) {
                        console.log('❌ 안드로이드 UI 설정 실패:', error);
                    }
                }

                // iOS 설정
                if (Platform.OS === 'ios') {
                    StatusBar.setBarStyle('light-content', true);
                    console.log('✅ iOS UI 설정 완료');
                }
            }
        }

        loadFonts();
        setupPlatformUI();

        // 개발 중 디버그 정보 출력
        if (__DEV__) {
            debugInfo();
        }
    }, []);

    // 폰트 로딩 중 화면 (로딩 시간 제한)
    if (!fontsLoaded) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: theme.colors.background,
            }} />
        );
    }
    
    return (
        <Provider store={store}>
            <NavigationContainer>
                {Platform.OS !== 'web' && (
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={theme.colors.background}
                        translucent={false}
                    />
                )}
                <Stack.Navigator 
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Main"
                >
                    <Stack.Screen 
                        name="Main" 
                        component={Main}
                        options={{ title: 'Main Screen' }}
                    />
                    <Stack.Screen 
                        name="CultureManual" 
                        component={CultureManual}
                        options={{ title: 'Culture Manual' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

// 🎯 사용법 가이드

/*
📱 이제 다음과 같이 작동합니다:

1️⃣ 완벽한 한 화면 레이아웃
   - 스크롤 필요 없음
   - 모든 요소가 화면 비율에 맞춰 배치
   - 어떤 기기든 한 화면에 모든 요소 표시

2️⃣ 완벽한 비율 유지
   - iPhone SE: 작지만 정확한 비율
   - iPhone 15 Pro Max: 크지만 정확한 비율
   - 갤럭시 S24: 정확한 비율
   - 모든 안드로이드/iOS: 동일한 디자인

3️⃣ 자동 계산 시스템
   - 헤더: 화면 상단 15%
   - 메인 텍스트: 화면 20%
   - 이미지 영역: 화면 중앙 35%
   - 서브타이틀: 화면 하단 25%
   - 장식 요소: 이미지와 겹치도록 배치

4️⃣ 폰트 크기 자동 조정
   - 로고: 화면 너비의 13%
   - 메인 텍스트: 화면 너비의 4%
   - 서브타이틀: 화면 너비의 7%
   - 설명 텍스트: 화면 너비의 3.5%

5️⃣ 이미지 크기 자동 조정
   - 메인 이미지: 화면의 60% 또는 높이의 25% 중 작은 값
   - 장식 이미지: 화면의 45% (최대 180px)

📋 교체 가이드:
1. utils/theme.js 완전 교체
2. 모든 컴포넌트 파일 교체
3. App.js 교체
4. ThemeProvider.js 삭제 (더 이상 필요 없음)

🎉 결과:
- 모든 기기에서 정확히 동일한 디자인
- 스크롤 없는 완벽한 한 화면 레이아웃
- 안드로이드/iOS 구분 없이 동일한 모습
- 화면 비율에 자동으로 맞춰지는 모든 요소
*/

// App 등록 (필수)
AppRegistry.registerComponent('main', () => App);

// == 기존 파일 ==
// // App.js - 완벽한 최종 버전

// // URL polyfill for React Navigation
// import 'react-native-url-polyfill/auto';

// import React, { useState, useEffect } from 'react';
// import { View, Platform, StatusBar, AppRegistry } from 'react-native';
// import * as Font from 'expo-font';
// import * as NavigationBar from 'expo-navigation-bar';
// import { Provider } from 'react-redux';
// import Main from './pages/Main';
// import CultureManual from './app/Culturesnack_Manual_Ui';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { theme, debugInfo } from './utils/theme';
// import store from './store';

// const Stack = createNativeStackNavigator();

// // 디버깅용 로그
// console.log('📱 App.js 로딩됨');
// console.log('📱 CultureManual 컴포넌트:', CultureManual);
// console.log('📱 Main 컴포넌트:', Main);

// export default function App() {
//     console.log('🚀 App 컴포넌트 시작');
//     const [fontsLoaded, setFontsLoaded] = useState(false);

//     useEffect(() => {
//         async function loadFonts() {
//             try {
//                 await Font.loadAsync({
//                     'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
//                     'PlayfairDisplay-SemiBold': require('./assets/fonts/PlayfairDisplay-SemiBold.ttf'),
//                     'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
//                 });
//                 console.log('✅ 폰트 로딩 완료');
//                 setFontsLoaded(true);
//             } catch (error) {
//                 console.error('❌ 폰트 로딩 실패:', error);
//                 setFontsLoaded(true); // 실패해도 계속 진행
//             }
//         }

//         async function setupPlatformUI() {
//             // 안드로이드 설정
//             if (Platform.OS === 'android') {
//                 try {
//                     await NavigationBar.setBackgroundColorAsync(theme.colors.background);
//                     await NavigationBar.setButtonStyleAsync('light');
//                     console.log('✅ 안드로이드 UI 설정 완료');
//                 } catch (error) {
//                     console.log('❌ 안드로이드 UI 설정 실패:', error);
//                 }
//             }

//             // iOS 설정
//             if (Platform.OS === 'ios') {
//                 StatusBar.setBarStyle('light-content', true);
//                 console.log('✅ iOS UI 설정 완료');
//             }
//         }

//         loadFonts();
//         setupPlatformUI();

//         // 개발 중 디버그 정보 출력
//         if (__DEV__) {
//             debugInfo();
//         }
//     }, []);

//     // 폰트 로딩 중 화면 (로딩 시간 제한)
//     if (!fontsLoaded) {
//         return (
//             <View style={{
//                 flex: 1,
//                 backgroundColor: theme.colors.background,
//             }} />
//         );
//     }
    
//     return (
//         <Provider store={store}>
//             <NavigationContainer>
//                 <StatusBar
//                     barStyle="light-content"
//                     backgroundColor={theme.colors.background}
//                     translucent={false}
//                 />
//                 <Stack.Navigator 
//                     screenOptions={{ headerShown: false }}
//                     initialRouteName="Main"
//                 >
//                     <Stack.Screen 
//                         name="Main" 
//                         component={Main}
//                         options={{ title: 'Main Screen' }}
//                     />
//                     <Stack.Screen 
//                         name="CultureManual" 
//                         component={CultureManual}
//                         options={{ title: 'Culture Manual' }}
//                     />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </Provider>
//     );
// }

// 🎯 사용법 가이드

/*
📱 이제 다음과 같이 작동합니다:

1️⃣ 완벽한 한 화면 레이아웃
   - 스크롤 필요 없음
   - 모든 요소가 화면 비율에 맞춰 배치
   - 어떤 기기든 한 화면에 모든 요소 표시

2️⃣ 완벽한 비율 유지
   - iPhone SE: 작지만 정확한 비율
   - iPhone 15 Pro Max: 크지만 정확한 비율
   - 갤럭시 S24: 정확한 비율
   - 모든 안드로이드/iOS: 동일한 디자인

3️⃣ 자동 계산 시스템
   - 헤더: 화면 상단 15%
   - 메인 텍스트: 화면 20%
   - 이미지 영역: 화면 중앙 35%
   - 서브타이틀: 화면 하단 25%
   - 장식 요소: 이미지와 겹치도록 배치

4️⃣ 폰트 크기 자동 조정
   - 로고: 화면 너비의 13%
   - 메인 텍스트: 화면 너비의 4%
   - 서브타이틀: 화면 너비의 7%
   - 설명 텍스트: 화면 너비의 3.5%

5️⃣ 이미지 크기 자동 조정
   - 메인 이미지: 화면의 60% 또는 높이의 25% 중 작은 값
   - 장식 이미지: 화면의 45% (최대 180px)

📋 교체 가이드:
1. utils/theme.js 완전 교체
2. 모든 컴포넌트 파일 교체
3. App.js 교체
4. ThemeProvider.js 삭제 (더 이상 필요 없음)

🎉 결과:
- 모든 기기에서 정확히 동일한 디자인
- 스크롤 없는 완벽한 한 화면 레이아웃
- 안드로이드/iOS 구분 없이 동일한 모습
- 화면 비율에 자동으로 맞춰지는 모든 요소
*/

// App 등록 (필수)
AppRegistry.registerComponent('main', () => App);