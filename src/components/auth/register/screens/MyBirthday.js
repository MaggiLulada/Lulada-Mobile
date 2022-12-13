import React, { useState } from 'react'
import { View } from 'react-native'
import { useTranslation } from "react-i18next";
import { Headline, Caption } from 'react-native-paper';
import MaskInput, { Masks } from 'react-native-mask-input';
import ButtonPrimary from '../../../buttons/ButtonPrimary'
import { styles } from '../../../../assets/styles/globalStyles';

const MyBirthday = (props) => {

  const {t} = useTranslation();
  const [dateBirthday, setDateBirthday] = useState('');

  return (
    <>
      <View key={props.state.active} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:my_birthday')}</Headline>
        <MaskInput
          value={dateBirthday}
          onChangeText={setDateBirthday}
          mask={Masks.DATE_DDMMYYYY}
          keyboardType="numeric"
          placeholder='DD/MM/YYYY'
          style={{
            marginTop: 10,
            fontSize: 20,
            fontFamily: 'Montserrat-Regular',
            width: '100%',
            height: 50,
            borderColor: '#e0e0e0',
            color:'#000',
            borderBottomWidth: 1,
          }}
        />
        <Caption style={{margin:'2%', marginBottom:0}}>{t('common:my_birthday_info')}</Caption>
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
            address: props.state.address,
            birthday: dateBirthday,
            active: props.state.active + 1,
          })}
        />
      </View>
    </>
  )
}

export default MyBirthday