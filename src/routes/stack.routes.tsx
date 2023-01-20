import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors'

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave } from '../pages/PlantSave';
import AuthRoutes from './tab.routes';
import { OnboardingScreen } from '../pages/Onboarding';

const stackRoutes = createStackNavigator();

const AppRoutes : React.FC = () => (
    <stackRoutes.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white,
            }
        }}
    >
        <stackRoutes.Screen 
            name="Onboarding"
            component={OnboardingScreen}        
        />

        <stackRoutes.Screen 
            name="Welcome"
            component={Welcome}        
        />

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

export default AppRoutes;

 