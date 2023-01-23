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
    
    useEffect(()=>{
        async function setData() {
            //AsyncStorage.removeItem("appLaunched");
            const appData = await AsyncStorage.getItem("appLaunched");
            if (appData == null) {
                setFirstLaunch(true);
                AsyncStorage.setItem("appLaunched", "false");
            } else {
                setFirstLaunch(false);
            }
        }
        setData();
    },[]);
    
    
    return (
    firstLaunch != null && (
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

        {/* <stackRoutes.Screen 
            name="Welcome"
            component={Welcome}        
        /> */}

        <stackRoutes.Screen 
            name="UserIdentification"
            component={UserIdentification}        
        />

        <stackRoutes.Screen 
            name="Confirmation"
            component={Confirmation}        
        />

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

 