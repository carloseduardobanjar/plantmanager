import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TextInput,
    TouchableOpacity
} from 'react-native'

import { EnviromentButton } from '../components/EnviromentButton';
import { useNavigation } from '@react-navigation/core';

import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { PlantProps } from '../libs/storage';

import Autocomplete from 'react-native-autocomplete-input';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect(){
    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentsSelected, setEnviromentsSelected] = useState('all');
    const [loading, setLoading] = useState(true);    
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [busca, setBusca] = useState('');

    const [films, setFilms] = useState<string[]>([]);
    console.log(films);
    const [filteredFilms, setFilteredFilms] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');

    const navigation = useNavigation();

    function handleEnviromentSelected(environment: string){
        setEnviromentsSelected(environment)

        if(environment == 'all')
            return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );
        setFilteredPlants(filtered);
    }

    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        if(!data)
            return setLoading(true);
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
            let array = [] as string[];
            plants.forEach((element) => array.push(element.name));
            setFilms(array);
        } else{
            setPlants(data);
            setFilteredPlants(data);
            let array = [] as string[];
            plants.forEach((element) => array.push(element.name));
            setFilms(array);
        }
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(()=>{
        async function fetchEnviroment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }
        fetchEnviroment();
    }, [])

    useEffect(()=>{
        fetchPlants();
    }, [])

    const findFilm = (query: string) => {
        if (query) {
          const regex = new RegExp(`${query.trim()}`, 'i');
          let array = [] as string[];
          array = films.filter((film) => film.search(regex) >= 0);
          setFilteredFilms(array);
        } else {
          setFilteredFilms([]);
        }
        setBusca(query);
    };

    if(loading)
    return <Load/>
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente 
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton 
                            title={item.title}  
                            active={ item.key == enviromentsSelected }
                            onPress={ () => handleEnviromentSelected(item.key) }
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    contentContainerStyle={styles.enviromentList}
                />
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputContainerStyle={styles.input}
                    data={filteredFilms}
                    defaultValue={selectedValue}
                    onChangeText={(text) => findFilm(text)}
                    placeholder="Digite o nome da planta"
                    flatListProps={{
                        renderItem: ( {item} ) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedValue(item);
                                    setFilteredFilms([]);
                                }}
                            >
                                <Text
                                    style={styles.itemText}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants.filter((plant)=>plant.name.toLowerCase().includes(busca.toLowerCase()))}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={( { item }) => (
                        <PlantCardPrimary 
                            data={item} 
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator = {false}
                    numColumns = {2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17, 
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeigh: 20,
        marignTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40, 
        justifyContent: 'center',
        paddingBottom: 5, 
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },    
    input: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        borderWidth: 0,
    },
    itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
})

