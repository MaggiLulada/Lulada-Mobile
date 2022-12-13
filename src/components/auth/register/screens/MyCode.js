import React, {useState} from 'react'
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import { View, Text, Alert } from 'react-native'
import { useTranslation } from "react-i18next";
import { Headline } from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ButtonPrimary from '../../../buttons/ButtonPrimary'
import { styles } from '../../../../assets/styles/globalStyles';

const MyCode = (props) => {

  const {t, i18n} = useTranslation()
  const navigation = useNavigation()
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const getUser = async(userId) => {
    try{
      await firestore().collection('Users').doc(userId).get()
      .then(doc => {
        if(doc.exists){
          setLoading(false)
        } else {
          props.setState({
            completeNumber: props.state.completeNumber,
            countryCode: props.state.countryCode,
            callingCode: props.state.callingCode,
            number: props.state.number,
            active: props.state.active + 1,
            userId: userId
          })
          setLoading(false)
        }
      })
    }
    catch(e){
      setLoading(false)

    }
  }

  const handleVerifyCode = () => {
    setLoading(true)
    if (value.length === 6) {
      console.log(JSON.stringify(props.state))
      props.state.confirmation.
      confirm(value)
      .then(user => {
        console.log(user, 'userrrr')
        getUser(user.user.uid)
      })
      .catch(error => {
        setLoading(false)
        alert(error.message)
        console.log(error)
      })
    } else {
      setLoading(false)
      Alert.alert(
        `${t('common:code_error')}`,
        `${t('common:code_error_details')}`,
      )
    }
  }

  return (
    <>
      <View key={props.state.active} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:my_code')}</Headline>
        <CodeField
          ref={ref}
          {...propsCode}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={{width:'80%', margin:'8%'}}>
        <ButtonPrimary
          title={loading === true ?  t('common:verifying_code') : t('common:next')}
          onPress={handleVerifyCode}
          loading={loading}
        />
      </View>
    </>
  )
}

export default MyCode