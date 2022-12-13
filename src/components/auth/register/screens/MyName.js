import React, {useState} from 'react'
import {View} from 'react-native'
import { useTranslation } from "react-i18next";
import ButtonPrimary from '../../../buttons/ButtonPrimary'
import { Headline, TextInput } from 'react-native-paper'
import { styles } from '../../../../assets/styles/globalStyles';

const MyName = (props) => {

  const {t, i18n} = useTranslation()
  const [values, setValues] = useState({
    name: '',
    lastName: '',
  });
  const [activeUnderline, setActiveUnderline] = useState({
    one: false,
    two: false,
  });

  return (
    <>
      <View key={props.state.active} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:my_name')}</Headline>
        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
          <TextInput
            onFocus={() => setActiveUnderline({one: true, two: false})}
            style={{backgroundColor:'#FFF', width: '45%'}}
            label={t('common:first_name')}
            value={values.name}
            onChangeText={(name) => setValues({...values, name})}
            underlineColor='#9B9B9B'
          />
      
          <TextInput
            onFocus={() => setActiveUnderline({one: false, two: true})}
            style={{backgroundColor:'#FFF', width: '45%'}}
            label={t('common:last_name')}
            value={values.lastName}
            onChangeText={(lastName) => setValues({...values, lastName})}
            underlineColor='#9B9B9B'
          />
 
        </View>
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
            active: props.state.active + 1,
            name: values.name,
            lastName: values.lastName,
          })}
        />
      </View>
    </>
  )
}

export default MyName