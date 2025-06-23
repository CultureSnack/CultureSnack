import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

const TopNavigation = ({ scrollToSection }) => {

    const navigation = useNavigation();

    const handleSnackGuidePress = () => {
        console.log('🔄 Brief에서 Snack Guide 버튼 클릭');
        try {
            navigation.navigate('Culturesnack_Manual_Ui');
            console.log('✅ Brief → Culturesnack_Manual_Ui 이동');
        } catch (error) {
            console.error('❌ Brief Navigation 에러:', error);
        }
    };
    
    return (
        <View style={styles.topNavigation}>
            <TouchableOpacity 
                style={styles.leftSection}
                onPress={handleSnackGuidePress}
            >
                <Text 
                    style={styles.navTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.6}
                >
                    Snack Guide
                </Text>
                <Text 
                    style={styles.navDescription}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.7}
                >
                    (컬처스넥 사용 설명서)
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.centerLogo}
                onPress={() => scrollToSection && scrollToSection(0)}
            >
                <Image 
                    source={require('../../assets/logo.png')} 
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.rightSection}
                onPress={() => {/* 준비중 - 무반응 */}}
            >
                <Text 
                    style={styles.navTitleRight}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.6}
                >
                    Pick Your Snack
                </Text>
                <Text 
                    style={styles.navDescriptionRight}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.7}
                >
                    (내 문화 취향 찾기)
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    topNavigation: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        height: 120,
        width: '100%',
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    leftSection: {
        flex: 1,
        alignItems: 'center',
        maxWidth: screenWidth * 0.35,
    },
    centerLogo: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 1,
        marginRight: 15,
    },
    rightSection: {
        flex: 1,
        alignItems: 'center',
        maxWidth: screenWidth * 0.35,
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    navTitle: {
        fontSize: screenWidth * 0.035,
        fontFamily: theme.fonts.semibold,
        color: theme.colors.primary,
        marginBottom: 5,
    },
    navDescription: {
        fontSize: screenWidth * 0.02,
        fontFamily: theme.fonts.regular,
        color: theme.colors.text,
        opacity: 0.8,
    },
    navTitleRight: {
        fontSize: screenWidth * 0.052,
        fontFamily: theme.fonts.semibold,
        color: theme.colors.primary,
        marginBottom: 5,
    },
    navDescriptionRight: {
        fontSize: screenWidth * 0.02,
        fontFamily: theme.fonts.regular,
        color: theme.colors.text,
        opacity: 0.8,
    },
});

export default TopNavigation; 