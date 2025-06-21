// App.js
import React, { useState, useEffect } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import Main from './pages/Main';
import { designTokens, debugScale } from './utils/theme';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
                    'PlayfairDisplay-SemiBold': require('./assets/fonts/PlayfairDisplay-SemiBold.ttf'),
                    'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
                });
                console.log('Fonts loaded successfully');
                setFontsLoaded(true);
            } catch (error) {
                console.error('Error loading fonts:', error);
                setFontsLoaded(true); // 폰트 로딩 실패해도 앱 실행
            }
        }
        
        async function setupPlatformUI() {
            // 안드로이드 네비게이션 바 설정
            if (Platform.OS === 'android') {
                try {
                    await NavigationBar.setBackgroundColorAsync(designTokens.colors.background);
                    await NavigationBar.setButtonStyleAsync('light');
                    
                    // 풀스크린 몰입형 경험을 원한다면 아래 주석 해제
                    // await NavigationBar.setVisibilityAsync('hidden');
                } catch (error) {
                    console.log('Navigation bar setup failed:', error);
                }
            }
            
            // iOS 상태 바 설정
            if (Platform.OS === 'ios') {
                StatusBar.setBarStyle('light-content', true);
            }
        }

        loadFonts();
        setupPlatformUI();
        
        // 개발 중 디버그 정보 출력 (배포 시 제거)
        if (__DEV__) {
            debugScale();
        }
    }, []);

    // 폰트 로딩 중 화면
    if (!fontsLoaded) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: designTokens.colors.background,
                justifyContent: 'center',
                alignItems: 'center',
            }} />
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor={designTokens.colors.background}
                translucent={false}
            />
            <Main />
        </View>
    );
}