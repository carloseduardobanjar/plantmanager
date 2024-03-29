import { forHorizontalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image, 
    Platform,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import { Button } from '../components/Button';
 
import waterdrop from '../assets/waterdrop.png';
import myColors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/theme';

interface Params {
    plant: PlantProps
}

export function PlantSave(){
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDateTimer, setShowDatePicker] = useState(Platform.OS == 'ios');
    const route = useRoute();
    const { plant } = route.params as Params; 
    const navigation = useNavigation();
    const {colors} = useTheme();

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState)
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS == 'android'){
            setShowDatePicker(oldState => !oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha uma hora no futuro! ⏰");
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    async function handleSave(){
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre lembramos você de cuidar da sua plantinha com muito cuidado',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants',
            });

        }catch{
            return Alert.alert("Não foi possível salvar. 😟");
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.container, {backgroundColor: colors.card}]}    
        >
            <View style={[styles.container, {backgroundColor: colors.card}]}>
                <View style={[styles.plantInfo, {backgroundColor: colors.card}]}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text> 
                </View>

                <View style={[styles.controller, {backgroundColor: colors.background}]}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>

                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDateTimer && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                            textColor={myColors.heading}
                        />
                    )}

                    {
                        Platform.OS == 'android' && (
                            <TouchableOpacity
                                style={styles.dateTimePickerButton}
                                onPress={handleOpenDateTimePickerForAndroid}
                            >
                                <Text style={styles.dateTimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    

                    <Button 
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: myColors.heading,
        marginTop: 15,
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: myColors.heading,
        fontSize: 17,
        marginTop: 10,
    },

    controller: {
        backgroundColor: myColors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: myColors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },

    tipImage: {
        width: 56, 
        height: 56,
    },

    tipText: {
        flex: 1,
        marginLeft: 20, 
        fontFamily: fonts.text,
        color: myColors.blue,
        fontSize: 17, 
        textAlign: 'justify'
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: myColors.heading,
        fontSize: 12, 
        marginBottom: 5,
    },

    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },

    dateTimePickerText: {
        color: myColors.heading,
        fontSize: 24, 
        fontFamily: fonts.text,
    },
})