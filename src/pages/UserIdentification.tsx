import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Switch,
} from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../contexts/theme';
import myColors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();
    const {dark, colors, setScheme} = useTheme();

    useEffect(()=>{
        async function setData() {
            const appData = await AsyncStorage.getItem("@plantmanager:user");
            if (appData != null) {
                navigation.navigate('PlantSelect');
            }
        }
        setData();
    },[]);

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Me diz como chamar você 😟');

        try{
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect',
            });
        } catch{
            return Alert.alert('Não foi possível salvar o seu nome. 😟');
        }
    }

    function handleInputBlur(){
        setIsFocused(false);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    function toggleTheme(){
        dark ? setScheme('light') : setScheme('dark');
    }
    
    return(
        <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😁' : '😆' }
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>
                        
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderColor: myColors.green}
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}> 
                                <Button 
                                    title='Confirmar'
                                    onPress={handleSubmit}
                                />
                            </View>                        
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <Switch value={dark} onChange={toggleTheme}></Switch>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    
    content: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },

    header: {
        alignItems: 'center',
    },

    emoji: {
        fontSize: 44
    },

    input: {
        borderBottomWidth: 1,
        borderColor: myColors.gray,
        color: myColors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: myColors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },

    footer: {
        marginTop: 40, 
        width: '100%',
        paddingHorizontal: 20,
    }
});