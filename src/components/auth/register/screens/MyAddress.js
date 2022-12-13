import React from 'react'
import { View, Text } from 'react-native'
import { useTranslation } from "react-i18next";
import { Headline, Subheading, TextInput } from 'react-native-paper'
import ButtonPrimary from '../../../buttons/ButtonPrimary'
import { styles } from '../../../../assets/styles/globalStyles';
import InputAddress from '../../../inputs/InputAddress';


const MyAddress = (props) => {

  const {t, i18n} = useTranslation()
  const [address, setAddress] = React.useState(null)

  return (
    <>
      <View key={props.state.active} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:my_address')}</Headline>
          <InputAddress 
            label={t('common:placeholder_address')} 
            setAddress={setAddress} 
            close={() => console.log('ok')} 
            //types={'address'} 
            types={['geocode', 'park', 'university']}
            mode='complete'
          />
      </View>
      <View style={{width:'80%', margin:'8%'}}>
        <ButtonPrimary
          title={t('common:next')}
          onPress={() => props.setState({
            completeNumber: props.state.completeNumber,
            countryCode: props.state.countryCode,
            callingCode: props.state.callingCode,
            number: props.state.number,
            userId: props.state.userId,
            name: props.state.name,
            lastName: props.state.lastName,
            address: address,
            active: props.state.active + 1,
          })}
        />
      </View>
    </>
  )
}

export default MyAddress