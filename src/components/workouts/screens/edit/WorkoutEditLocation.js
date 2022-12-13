import React, { useState } from 'react'
import { View } from 'react-native'
import { Caption, Headline, Subheading, Text, useTheme } from 'react-native-paper'
import { styles } from '../../../../assets/styles/globalStyles'
import { useTranslation } from "react-i18next";
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import InputAddress from '../../../inputs/InputAddress';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentWorkout, editWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';

const WorkoutEditLocation = () => {

  const {t, i18n} = useTranslation()
  const {colors} = useTheme()
  const dispatch = useDispatch()
  const current = useSelector(editWorkout)

  const [address, setAddress] = useState(current.location)
  const [error, setError] = useState(false)

  const nextPage = () => {
    if(address == null){
      setError(true)
    } else {
      dispatch(editCurrentWorkout({
        currentPage: 2,
        location: address,
      }))
    }  
  }

  return (
    <>
      <View key={current.currentPage} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:edit_workout_location')}</Headline>
        {error === false ? (
          <>
            <Caption style={{ marginTop:'-5%', marginBottom:'5%'}}>{t('common:edit_workout_location_description')}</Caption>
            <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:colors.primary}}>{address.address}</Caption>
          </>
        
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
      {address != '' && (
        <Caption style={{marginTop:'-40%', marginLeft:'4%', marginRight:'10%'}}>{t('common:edit_workout_location_description_bottom_input')}</Caption>
      )}
      <View style={{width:'80%', margin:'8%'}}>
        <ButtonPrimary
          title={t('common:next')}
          onPress={nextPage}
        />
      </View>
    </>
  )
}

export default WorkoutEditLocation