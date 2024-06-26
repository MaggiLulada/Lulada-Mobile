import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Caption, Headline, Subheading } from 'react-native-paper'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { disabledDotsSave, discardCurrentWorkout, editWorkout, savingCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';
import { styles } from '../../../../assets/styles/globalStyles';
import { uploadToStorage } from '../../../../utils/uploadToStorage';
import { getUser } from '../../../../redux/User/UserSlice';
import ProgressCircular from '../../../progress/ProgressCircular';
import Input from '../../../inputs/Input';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as RNLocalize from 'react-native-localize';
import { updateDocument } from '../../../../utils/queriesDatabase';

const WorkoutEditPrice = () => {

  const {t} = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const current = useSelector(editWorkout)
  const user = useSelector(getUser)

  const [price, setPrice] = useState(current.cost != '' ? current.cost.toString() : '')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)



  const updateWorkout = async() => {
    console.log('Entraaaaa')
    if(price == ''){
      setError(true)
      console.log('Entro y error')
    } else {
      dispatch(disabledDotsSave(true))
      dispatch(savingCurrentWorkout(true))
      setLoading(true)
      try{
        setProgress(10)
       
        setProgress(45)
        const workout = {
          ...current, 
          pictures: current.pictures, 
          cost: parseInt(price),
          user:user,
          state:'upcoming',
          time_zone: RNLocalize.getTimeZone()
        }
        setProgress(60)
        updateDocument('Workouts_Schedule', current.workout_id, workout).then(() => {
          setProgress(85)
          setProgress(100)
        })
       
      }catch (err) {
        console.log('errorrrrrr', err)
        setLoading(false)
      }
    }  
  }

  const details = () => {
    dispatch(discardCurrentWorkout())
    navigation.navigate('Initial')
  }

  if(loading){
    return (
      <>
      <ProgressCircular
        progress={progress} 
        title={`${progress}%`} 
        subtitle={progress === 100 ? t('common:create_workout_ready') : t('common:create_workout_saving')}
        action={
          progress === 100 &&
          <>
            <ButtonPrimary
              title={t('common:details')}
              onPress={details}
            />
          </>
        }
      />
      </>
    )
  }


  return (
    <>
      <View key={0} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:create_workout_price')}</Headline>
        {error === false ? (
          <Caption style={{ marginTop:'-5%', marginBottom:'5%'}}>{t('common:create_workout_price_description')}</Caption>
        ):(
          <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:'#FF0000'}}>{t('common:create_workout_price_description')}</Caption>
        )}
       
        <View style={{width:'100%'}}>
          <Input
            label={t('common:create_workout_price_input')}
            value={price}
            keyboardType='decimal-pad'
            onChangeText={(text) => setPrice(text)}
            style={{backgroundColor:'#FFF', width: '100%'}}
            underlineColor='#9B9B9B'
            right={'EUR'}
          />
        </View>

      </View>
      <View style={{width:'80%', margin:'8%'}}>
        <ButtonPrimary
          title={t('common:finish')}
          onPress={updateWorkout}
          loading={loading}
        />
      </View>
    
    </>
  )
}

export default WorkoutEditPrice