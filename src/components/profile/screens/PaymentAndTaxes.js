import { View, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { Caption, List, Subheading, Switch, TextInput, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {t} from 'i18next'
import Input from '../../inputs/Input';
import { useState } from 'react';
import { color } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateInfo } from '../../../redux/User/UserSlice';
import ButtonPrimary from '../../buttons/ButtonPrimary';
import { updateUser } from '../../../redux/User/Actions';
import { useNavigation } from '@react-navigation/native';

const PaymentAndTaxes = () => {

  const {colors} = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(getUser)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [typeError, setTypeError] = useState('')

  const [dataPay, setDataPay] = useState({
    emailPaypal:user.data_pay_tax ? user.data_pay_tax.emailPaypal : '',
    billingAddress:user.data_pay_tax ? user.data_pay_tax.billingAddress : user.address.address,
    taxNumber:user.data_pay_tax ? user.data_pay_tax.taxNumber : 0,
    vat:user.data_pay_tax ? user.data_pay_tax.vat : false,
  })

  const validateEmail = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(text);
  };

  const saveDataPayTaxes = async() => {
    if (dataPay.emailPaypal != '' && dataPay.emailPaypal.length != 0) {
        if (validateEmail(dataPay.emailPaypal) == true) {
          setLoading(true)
          try {
            updateUser(user.id, {
              data_pay_tax: dataPay
            }).then(() => {
              dispatch(updateInfo({
                data_pay_tax: dataPay
              }))
              setLoading(false)
              navigation.navigate('Profile')
            })
          } catch (error) {
            setLoading(false)
          }
        } else {
          setTypeError('not_email')
          setError(true)
        }
     
    } else {
      setError(true)
    }
  }

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex:1, padding:'5%', backgroundColor:'#FFFFFF', justifyContent:'space-between'}}
      >
      <View>
        <View style={{flexDirection:'row', alignItems:'center',alignContent:'space-between', marginBottom:'1%'}}>
          <Icon
            name='paypal'
            size={30}
            color={colors.secondary}
            style={{marginRight:'1%', marginTop:'2%', marginLeft:'5%'}}
          />
          <Input
            keyboardType='email-address'
            placeholder={t('common:profile_payment_and_taxes_receive_pay_email')}
            value={dataPay.emailPaypal}
            label={t('common:profile_payment_and_taxes_receive_pay')}
            style={{backgroundColor:'#FFF', width: '80%'}}
            underlineColor='#9B9B9B'
            onChangeText={text => setDataPay({...dataPay, emailPaypal: text})}
          />
        
        </View>
        <View style={{width:'100%',marginBottom:'5%', alignItems:'center'}}>
          {error == true && typeError == '' && (
            <Caption style={{ color:'#FF0000'}}>{t('common:profile_payment_and_taxes_receive_pay_email_error')}</Caption>
          )}
          {error == true && typeError == 'not_email' && (
            <Caption style={{ color:'#FF0000'}}>{t('common:profile_payment_and_taxes_receive_pay_email_error_type')}</Caption>
          )}
        </View>
        <Input
          label={t('common:profile_payment_and_taxes_bill_address')}
          value={dataPay.billingAddress}
          style={{backgroundColor:'#FFF', width: '89%', marginLeft:'5%'}}
          underlineColor='#9B9B9B'
          pointerEvents='none'
          editable={false}
          multiline={true}
        />  
        <Input
          keyboardType='number-pad'
          placeholder={t('common:profile_payment_and_taxes_tax_number')}
          label={t('common:profile_payment_and_taxes_registered_business')}
          style={{backgroundColor:'#FFF', width: '89%', marginLeft:'5%'}}
          underlineColor='#9B9B9B'
          onChangeText={text => setDataPay({...dataPay, taxNumber: text})}
          value={dataPay.taxNumber}
        />
        <View style={{flexDirection:'row', margin:'5%', marginTop:'8%', alignItems:'center',justifyContent:'space-between'}}>
          <Subheading>{t('common:profile_payment_and_taxes_vat')}</Subheading>
          <Switch 
            value={dataPay.vat} 
            onValueChange={() => setDataPay({...dataPay, vat: !dataPay.vat})} 
            color={colors.primary}
          />
        </View>
      </View>
  
      <View style={{margin:'4%'}}>
        <ButtonPrimary
          title={t('common:save')}
          onPress={saveDataPayTaxes}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default PaymentAndTaxes