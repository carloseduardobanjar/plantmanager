import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors'

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave } from '../pages/PlantSave';
import AuthRoutes from './tab.routes';
import { OnboardingScreen } from '../pages/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const stackRoutes = createStackNavigator();

const AppRoutes : React.FC = () => { 
    const [firstLaunch, setFirstLaunch] = useState<boolean>();
    const [filledName, setFilledName] = useState<boolean>();
    
    useEffect(()=>{
        async function setData() {
            const appData = await AsyncStorage.getItem("@plantmanager:appLaunched");
            if (appData == null) {
                setFirstLaunch(true);
                AsyncStorage.setItem("@plantmanager:appLaunched", "false");
            } else {
                setFirstLaunch(false);
            }
        }
        setData();
    },[]);

    useEffect(()=>{
        async function setData() {
            AsyncStorage.removeItem("@plantmanager:user");
            const appData = await AsyncStorage.getItem("@plantmanager:user");
            if (appData == null) {
                setFilledName(false);
            } else {
                setFilledName(true);
            }
        }
        setData();
    },[]);
    
    return (
    firstLaunch != null && filledName != null  && (
    <stackRoutes.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white,
            }
        }}
    >
        {firstLaunch && (
        <stackRoutes.Screen 
            name="Onboarding"
            component={OnboardingScreen}        
        />
        )}

        {!filledName && (
        <stackRoutes.Screen 
            name="UserIdentification"
            component={UserIdentification}        
        />
        )}

        {!filledName && (
        <stackRoutes.Screen 
            name="Confirmation"
            component={Confirmation}        
        />
        )}

        <stackRoutes.Screen 
            name="PlantSelect"
            component={AuthRoutes}        
        />

        <stackRoutes.Screen 
            name="PlantSave"
            component={PlantSave}        
        />

        <stackRoutes.Screen 
            name="MyPlants"
            component={AuthRoutes}        
        />
    </stackRoutes.Navigator>
    )
)}

export default AppRoutes;

 