import React, { useEffect, useState } from 'react'
import { View, Dimensions, Platform } from 'react-native'
import { useTranslation } from "react-i18next";
import { styles } from '../../../../assets/styles/globalStyles'
import { Caption, Headline, Subheading } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {addWorkout, currentWorkout, totalWorkouts, updateCurrentWorkout} from '../../../../redux/Workouts/WorkoutsSlice';
import Input from '../../../inputs/Input';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import ModalSimple from '../../../modals/ModalSimple';
import SwiperMini from '../../../swiper/SwiperMini';
import { getUser } from '../../../../redux/User/UserSlice';
import { useNavigation } from '@react-navigation/native';

const WorkoutName = () => {

  const navigation = useNavigation()
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const current = useSelector(currentWorkout)
  const allWorkouts = useSelector(totalWorkouts)
  const user = useSelector(getUser)

  const [modalVisible, setModalVisible] = useState(true)
  const {height, width} = Dimensions.get('screen');
  const [name, setName] = useState(current.name != '' ? current.name : '')
  const [error, setError] = useState(false)


  const handleName = (name) => {
    setError(false)
    setName(name)
  }

  const nextPage = () => {
    if(name == '' || name.length == 0 ){
      setError(true)
    } else{
      dispatch(updateCurrentWorkout({
        currentPage: 1,
        name: name,
      }))
    }
  }

  const goToProfileStack = () => {
    //setModalVisible(!modalVisible)
    navigation.navigate('Initial')
    navigation.navigate('ProfileStack', {screen:'PaymentAndTaxes'})
  }

  return (
    <>  
      <View key={current.currentPage} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:create_workout_name')}</Headline>
        {error === false ? ( 
          <Caption style={{ marginTop:'-5%', marginBottom:'5%'}}>{t('common:create_workout_name_description')}</Caption>
          ) : (
          <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:'#FF0000'}}>{t('common:create_workout_name_description')}</Caption>
          ) 
        }
        <View style={{width:'100%'}}>
          <Input
            label={t('common:create_workout_name')}
            value={name}
            onChangeText={(text) => handleName(text)}
            style={{backgroundColor:'#FFF', width: '100%'}}
            underlineColor='#9B9B9B'
           
          />
        </View>
       
      </View>
      <View style={{width:'80%', margin:'8%'}}>
        <ModalSimple
          visible={modalVisible}
          close={user.data_pay_tax.emailPaypal ? () => setModalVisible(!modalVisible) : () => navigation.navigate('Initial')}
        >
          {user.data_pay_tax && user.data_pay_tax.emailPaypal ? (
            <View style={{width:'80%', height: Platform.OS === 'ios' ? '58%' : '65%', alignItems:'center'}}>
              <SwiperMini
                pages={[
                  {
                    title: t("common:create_workout_title1"),
                    description: t("common:create_workout_description1"),
                    image: require("../../../../assets/images/HappyLulada.png"),
                  },
                  {
                    title: t("common:create_workout_title2"),
                    description: t("common:create_workout_description2"),
                    image: require("../../../../assets/images/HappyLulada.png"),
                  },
                  {
                    title: t("common:create_workout_title3"),
                    description: t("common:create_workout_description3"),
                    image: require("../../../../assets/images/HappyLulada.png"),
                  },
                ]}
                dimensions={{
                  realHeight: 50,
                  realWidth: 80,
                  height,
                  width
                }}
                labelButton={t('common:lets_go')}
                onPressButton={() => setModalVisible(false)}
              />
            </View>
          ):(
            <View style={{width:'85%',justifyContent:'center', padding:'5%'}}>
              <Headline style={{textAlign:'center', fontSize:20, fontFamily:'Montserrat-SemiBold'}}>{t('common:create_workout_name_configure_payment')}</Headline>
              <Subheading style={{textAlign:'center', marginTop:'8%', marginBottom:'8%'}}>{t('common:create_workout_name_configure_payment_desc')}</Subheading>
              <ButtonPrimary
                title={t('common:next')}
                onPress={() => goToProfileStack()}
              />
            </View>
          )}
        </ModalSimple>
        <ButtonPrimary
          title={t('common:next')}
          onPress={nextPage}
        />
      </View>
      
    </>
  )
}

export default WorkoutName