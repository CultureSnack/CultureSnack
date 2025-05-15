import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import * as Font from 'expo-font';
import Main from './pages/Main';
import * as NavigationBar from 'expo-navigation-bar';

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
            }
        }
        loadFonts();

        // 안드로이드 하단 네비게이션 바 배경색/버튼 스타일 설정
        if (Platform.OS === 'android') {
            NavigationBar.setBackgroundColorAsync('#0D1B2A');
            NavigationBar.setButtonStyleAsync('light');
            NavigationBar.setVisibilityAsync('immersive'); // 완전 투명/풀스크린 원할 때 주석 해제
        }
    }, []);

    if (!fontsLoaded) {
        return <View />;
    }

    return <Main />;
} 