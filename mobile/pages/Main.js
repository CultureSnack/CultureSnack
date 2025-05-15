import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import MainHeader from '../components/Main/MainHeader';
import MainText from '../components/Main/MainText';
import MainImage from '../components/Main/MainImage';
import SubTitle from '../components/Main/SubTitle';
import DecorativeImage from '../components/Main/DecorativeImage';
import { StatusBar } from 'expo-status-bar';

const Main = () => (
    <SafeAreaView style={styles.safe}>
        <StatusBar style="light" backgroundColor="#0D1B2A" translucent={false} />
        <View style={styles.container}>
            <MainHeader />
            <MainText />
            <MainImage />
            <SubTitle />
            <DecorativeImage />
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0D1B2A',
    },
    container: {
        flex: 1,
        backgroundColor: '#0D1B2A',
        position: 'relative',
    },
});

export default Main;
