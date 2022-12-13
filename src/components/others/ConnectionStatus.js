import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Headline, Subheading } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { connection, statusConnection } from '../../redux/User/UserSlice'
import NetInfo from "@react-native-community/netinfo";

const ConnectionStatus = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const statusNetwork = useSelector(statusConnection)

    const unsubscribe = NetInfo.addEventListener(state => {
        dispatch(connection(state))
    });

    const tryAgain = () => {
        setLoading(true)
        unsubscribe()
    }

    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', margin:'10%'}}>
            <Headline>{t('navigate:title_error_network')}</Headline>
            <Subheading>{t('navigate:description_error_network')}</Subheading>
            <Subheading>{statusNetwork.isConnected == true ? 'Conectado': 'Desconectado'}</Subheading>
            <Button uppercase={false} onPress={tryAgain} loading={loading}>
                {t('navigate:try')}
            </Button>
        </View>
    )
}

export default ConnectionStatus