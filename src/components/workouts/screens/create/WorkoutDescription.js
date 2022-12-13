import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Caption, Headline } from 'react-native-paper'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { currentWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';
import { styles } from '../../../../assets/styles/globalStyles';
import Input from '../../../inputs/Input';
import ButtonPrimary from '../../../buttons/ButtonPrimary';


const WorkoutDescription = () => {

  const {t} = useTranslation()
  const dispatch = useDispatch()
  const current = useSelector(currentWorkout)
  const [description, setDescription] = useState(current.description != '' ? current.description : '')
  const [error, setError] = useState(false)

  const nextPage = () => {
    setError(false)
    if(description == ''){
      setError(true)
    } else {
      dispatch(updateCurrentWorkout({
        currentPage: 7,
        description: description
      }))
    }
  }


  return (
    <>
      <View key={0} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:create_workout_description')}</Headline>
        {error === false ? (
          <Caption style={{ marginTop:'-5%', marginBottom:'5%'}}>{t('common:create_workout_description_description')}</Caption>
        ):(
          <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:'#FF0000'}}>{t('common:create_workout_description_description')}</Caption>
        )}
        <View style={{width:'100%'}}>
          <Input
            multiline={true}
            label={t('common:create_workout_description')}
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={{backgroundColor:'#FFF', width: '100%'}}
            underlineColor='#9B9B9B'
          />
        </View>
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

export default WorkoutDescription