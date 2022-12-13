import React, {useState, useRef} from 'react';
import { Alert, Platform, View } from 'react-native';
import { useTranslation } from "react-i18next";
import { Caption, Headline, Text } from 'react-native-paper';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import PhoneInput from "react-native-phone-number-input";
import { styles } from '../../../../assets/styles/globalStyles';
import auth from '@react-native-firebase/auth'

const MyPhoneNumber = (props) => {

  const {t, i18n} = useTranslation()

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [callingCode, setCallingCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef(null);

  const sendCode = () => {
    setLoading(true);
    auth().signInWithPhoneNumber(formattedValue, true)
    .then(confirmationResult => {
      setConfirmationResult(confirmationResult);
      console.log(confirmationResult);
      setLoading(false);
      Alert.alert(
        `${t('common:sms_sent')}`,
        `${t('common:sms_sent_success')}`,
        [
          { 
            text: "OK", 
            onPress: () => props.setState({
              active: props.state.active + 1,
              completeNumber: formattedValue,
              countryCode: countryCode,
              callingCode: `+${callingCode}`,
              number: value,
              confirmation: confirmationResult
            }) 
          }
        ]
      )
    })
    .catch(error => {
      setLoading(false);
      console.error(error)
      Alert.alert(`${t('common:sms_sent_error')}`, 
      `${t('common:sms_sent_error_details')} ${error.message}`)
    })
  }

  return (
    <>
      <View key={props.state.active}>
        <Headline style={styles.headline}>{t('common:my_phone_number')}</Headline>
        <PhoneInput
            ref={phoneInput}
            placeholder=' '
            defaultValue={value}
            defaultCode="DE"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setCountryCode(phoneInput.current.getCountryCode());
              setCallingCode(phoneInput.current.getCallingCode());
            }}
            containerStyle={{
              width: '80%',
              borderTopLeftRadius:10,
              borderBottomLeftRadius:10,
              backgroundColor:'#ffffff',
              borderBottomWidth:0.5,
            }}
            textContainerStyle={{
              borderRadius:10,
              backgroundColor:'#ffffff',
            }}
            textInputStyle={{
              fontFamily:'Montserrat-Regular',
            }}
            codeTextStyle={{
              fontFamily:'Montserrat-Regular',
            }}
        />
        <Caption style={{margin:'2%', marginBottom:0}}>{t('common:my_phone_number_info_sms')}</Caption>
      </View>
   
      <View style={{width:'80%', margin:'8%'}}>
        <ButtonPrimary
          title={loading === true ? t('common:next') : t('common:next')}
          onPress={() => sendCode()}
          loading={loading}
        />
      </View>
    </>
  )
}

export default MyPhoneNumber