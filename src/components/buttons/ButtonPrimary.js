import React from 'react'
import { Platform, PlatformColor } from 'react-native';
import {Button} from 'react-native-paper'
import { useTheme } from 'react-native-paper'

const ButtonPrimary = ({title, onPress, loading, labelStyle, loadingLabel}) => {
    const { colors } = useTheme();
    return (
        <Button 
            mode="contained"
            contentStyle={{ 
                backgroundColor: colors.primary,
                margin: Platform.OS === 'android' ? '1%': '1%',
            }} 
            labelStyle={labelStyle ? labelStyle : {
                color: '#FFFFFF',
                fontSize:Platform.OS === 'android' ? 20: 24,
                fontWeight: '600',
            }}
            uppercase={false}
            onPress={onPress}
            loading={loading}
        >
            
            {title}
        </Button>
    )
}

export default ButtonPrimary