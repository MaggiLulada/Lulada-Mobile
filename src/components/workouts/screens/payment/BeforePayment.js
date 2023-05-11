import { View, Text } from 'react-native'
import React from 'react'
import { Appbar, Subheading, Title } from 'react-native-paper'
import { dateRelative } from '../../../../utils/date'

const BeforePayment = ({close, data}) => {
    return (
        <View style={{flex:1}}>
            <Appbar.Header style={{backgroundColor:'#fff'}}>
                <Appbar.BackAction onPress={() => close()} />
                <Appbar.Content title="Pay"/>
            </Appbar.Header>
            <View style={{flex:1, margin:'5%'}}>
                <Title style={{fontSize:24}}>{data.name}</Title>
                <Subheading>{`${dateRelative(`${data.date} ${data.start_time}:00`)}, ${data.start_time}`}</Subheading>
                <Subheading>Exact workout location is shown after booking</Subheading>
            </View>
           
        </View>
    )
}

export default BeforePayment