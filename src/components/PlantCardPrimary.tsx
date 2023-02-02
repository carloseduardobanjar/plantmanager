import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import myColors from '../styles/colors';
import fonts from '../styles/fonts';
import {
    SvgFromUri
} from 'react-native-svg'
import { useTheme } from '../contexts/theme';


interface PlantProps extends RectButtonProps{
    data: {
        name: string,
        photo: string,
    }
}

export const PlantCardPrimary = ({ data, ...rest } : PlantProps) => {
    const {colors} = useTheme();
    return(
        <RectButton
            style={[styles.container, {backgroundColor: colors.card}]}
            {...rest}
        >
            <SvgFromUri uri={data.photo} width={70} height={70}/>
            <Text style={styles.text}>
                { data.name }
            </Text>
        </RectButton>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        borderRadius: 20,
        paddingVertical: 10, 
        alignItems: 'center',
        margin: 10,
    },

    text: {
        color: myColors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    }
})