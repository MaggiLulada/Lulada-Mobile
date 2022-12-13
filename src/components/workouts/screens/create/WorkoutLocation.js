import React, { useState } from 'react'
import { View } from 'react-native'
import { Caption, Headline, Text } from 'react-native-paper'
import { styles } from '../../../../assets/styles/globalStyles'
import { useTranslation } from "react-i18next";
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import InputAddress from '../../../inputs/InputAddress';
import { useDispatch, useSelector } from 'react-redux';
import { currentWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';

const WorkoutLocation = () => {

  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  const current = useSelector(currentWorkout)

  const [address, setAddress] = useState(current.location != {} ? current.location.address : null)
  const [error, setError] = useState(false)

  const nextPage = () => {
    if(address == null){
      setError(true)
    } else {
      dispatch(updateCurrentWorkout({
        currentPage: 3,
        location: address,
      }))
    }  
  }

  return (
    <>
     <View key={current.currentPage} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:create_workout_location')}</Headline>
        {error === false ? (
          <Caption style={{ marginTop:'-5%', marginBottom:'5%'}}>{t('common:create_workout_location_description')}</Caption>
        ):(
          <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:'#FF0000'}}>{t('common:create_workout_location_description')}</Caption>
        )}
        <InputAddress 
          label={t('create_workout_location_input')} 
          setAddress={setAddress} 
          close={() => console.log('ok')} 
          types={['geocode', 'park', 'university']}
          mode='simple'
        />
      </View>
      <View style={{width:'80%', margin:'8%'}}>
        <ButtonPrimary
          title={t('common:next')}
          onPress={nextPage}
        />
      </View>
    </>
  )
}

export default WorkoutLocation