import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import MainHeader from '../components/Main/MainHeader';
import MainText from '../components/Main/MainText';
import MainImage from '../components/Main/MainImage';
import SubTitle from '../components/Main/SubTitle';
import DecorativeImage from '../components/Main/DecorativeImage';

const Main = () => (
    <View style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor="#0D1B2A" translucent={false} />
        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 60 }]} bounces={false}>
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
        backgroundColor: '#0D1B2A',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#0D1B2A',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100%',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
});

export default Main;
