import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Onboarding from 'react-native-onboarding-swiper';


export function OnboardingScreen(){
    const navigation = useNavigation();
    return(
        <Onboarding
        onSkip={() => navigation.replace("Welcome")}
        onDone={() => navigation.navigate("Welcome")}
        pages={[
            {
                backgroundColor:'fff',
                image: <Image source={require('../assets/watering.png')} />,
                title: 'Onboarding 1',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor:'fff',
                image: <Image source={require('../assets/watering.png')} />,
                title: 'Onboarding 2',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor:'fff',
                image: <Image source={require('../assets/watering.png')} />,
                title: 'Onboarding 3',
                subtitle: 'Done with React Native Onboarding Swiper',
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
})