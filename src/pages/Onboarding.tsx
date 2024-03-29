import React from 'react';
import { StyleSheet, Image, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Onboarding from 'react-native-onboarding-swiper';
import myColors from '../styles/colors';
import fonts from '../styles/fonts';
import { useTheme } from '../contexts/theme';

export function OnboardingScreen(){
    const navigation = useNavigation();
    const {colors} = useTheme();
    
    return(
        <Onboarding
        onSkip={() => navigation.replace("UserIdentification")}
        onDone={() => navigation.replace("UserIdentification")}
        pages={[
            {
                backgroundColor: colors.background,
                image: 
                    <Image/>,
                title:  
                    <Text style={styles.welcomeTitle}>
                        Bem-vindo ao{'\n'}
                        PlantManager 
                    </Text>,
                subtitle: '',
            },
            {
                backgroundColor: colors.background,
                image: 
                    <Image 
                        source={require('../assets/watering.png')} 
                    />,
                title: 
                    <Text style={styles.title}>
                        Gerencie {'\n'}
                        suas plantas de{'\n'}
                        forma fácil    
                    </Text>,
                subtitle: 
                    <Text  style={styles.subtitle}>
                        Não esqueça mais de regar suas plantas.{'\n'}
                        Nós cuidamos de lembrar você sempre que precisar.
                    </Text>,
            },
        ]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: myColors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: myColors.heading,
        fontFamily: fonts.text,
    },
    welcomeTitle: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34,
        color: myColors.green,
    }
})