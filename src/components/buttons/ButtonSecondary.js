import React from 'react'
import { Platform } from 'react-native';
import {Button} from 'react-native-paper'
import { useTheme } from 'react-native-paper'

const ButtonSecondary = ({title, onPress, labelStyle}) => {
    const { colors } = useTheme();
    return (
        <Button 
            mode="contained"
            contentStyle={{ 
                backgroundColor: colors.accent,
            }} 
            labelStyle={labelStyle}
            uppercase={false}
            onPress={onPress}
        >
            {title}
        </Button>
    )
}

export default ButtonSecondary