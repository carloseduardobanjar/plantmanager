import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import myColors from '../styles/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';
import { PlantSelect } from '../pages/PlantSelect';
import { useTheme } from '../contexts/theme';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    const {colors} = useTheme();
    return(
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: myColors.green,
                tabBarInactiveTintColor: myColors.heading,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle:{
                    paddingVertical: Platform.OS == 'ios' ? 20 : 0, 
                    height: 88,
                    backgroundColor: '#161616',
                },
                headerStyle:{
                    backgroundColor: '#161616',
                    shadowOffset: {
                        width: 0, height: 0 // for ios
                    },
                    
                }
            }}>
                <AppTab.Screen
                    name="Nova Planta"
                    component={PlantSelect}
                    options={{
                        tabBarIcon: (({size, color}) => (
                            <MaterialIcons
                                name="add-circle-outline"
                                size={size}
                                color={color}
                            />
                        )),
                        headerTintColor: '#fff',
                    }}
                />
                <AppTab.Screen
                    name="Minhas Plantas"
                    component={MyPlants}
                    options={{
                        tabBarIcon: (({size, color}) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        )) 
                    }}
                />
        </AppTab.Navigator>
    )
}

export default AuthRoutes;