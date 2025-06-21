import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { designTokens } from '../utils/theme';
import MainHeader from '../components/Main/MainHeader';
import MainText from '../components/Main/MainText';
import MainImage from '../components/Main/MainImage';
import SubTitle from '../components/Main/SubTitle';
import DecorativeImage from '../components/Main/DecorativeImage';

const Main = () => (
    <View style={styles.safe}>
        <StatusBar 
            barStyle="light-content" 
            backgroundColor={designTokens.colors.background} 
            translucent={false} 
        />
        <ScrollView 
            contentContainerStyle={[styles.container, { 
                paddingBottom: designTokens.spacing.bottomPadding 
            }]} 
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <MainHeader />
            <MainText />
            <MainImage />
            <SubTitle />
            <DecorativeImage />
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: designTokens.colors.background,
    },
    container: {
        flexGrow: 1,
        backgroundColor: designTokens.colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
});

export default Main;