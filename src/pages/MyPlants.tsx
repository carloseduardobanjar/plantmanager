import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
} from 'react-native'
import { Header } from '../components/Header';
import myColors from '../styles/colors';

import waterdrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlant, StoragePlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import { useTheme } from '../contexts/theme';
export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<String>();
    const {colors} = useTheme();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não',
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try{
                        await removePlant(plant.id);

                        setMyPlants((oldData) => 
                            oldData.filter((item) => item.id != plant.id)
                        );

                    } catch(error){
                        Alert.alert("Não foi possível remover.");
                    }
                }
            }
        ])
    }

    useEffect(()=>{
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();
            
            if(plantsStoraged[0]){
                const nextTime = formatDistance(
                    new Date(plantsStoraged[0].dateTimeNotification).getTime(), 
                    new Date().getTime(),
                    { locale: pt }
                );
    
                setNextWaterd(
                    `Não esqueca de regar a ${plantsStoraged[0].name} em ${nextTime}.`
                )
            } else{
                setNextWaterd(
                    `Cadastre alguma planta.`
                )
            }            

            setMyPlants(plantsStoraged);
            setLoading(false);
        }
        loadStorageData();
    }, [])

    if(loading)
        return <Load />

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]} >
            <Header/>
            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}    
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={( { item }) => (
                        <PlantCardSecondary 
                            data={item}
                            handleRemove={()=>{handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle= {{ flex: 1 }}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    spotlight: {
        backgroundColor: myColors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: myColors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: myColors.heading, 
        marginVertical: 20,
    }
});
