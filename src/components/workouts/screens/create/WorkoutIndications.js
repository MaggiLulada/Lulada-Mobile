import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Caption, Headline, Subheading } from 'react-native-paper'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { currentWorkout, disabledDotsSave, finishCurrentWorkout, progressSaveWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';
import { styles } from '../../../../assets/styles/globalStyles';
import { uploadToStorage } from '../../../../utils/uploadToStorage';
import { getUser } from '../../../../redux/User/UserSlice';
import { useNavigation } from '@react-navigation/native';

import Input from '../../../inputs/Input';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import InputTags from '../../../inputs/InputTags';

import axios from 'axios'



const WorkoutIndications = () => {

  const {t} = useTranslation()
  const dispatch = useDispatch()

  const current = useSelector(currentWorkout)
  

  const [indications, setIndications] = useState(current.instructions != '' ? current.instructions : [])
  const [participants, setParticipants] = useState(current.participants != '' ? current.participants : '')
  const [error, setError] = useState(false)

  const nextPage = () => {
    if(participants == '' || indications.length == 0){
      setError(true)
    } else {
      dispatch(updateCurrentWorkout({
        currentPage: 6,
        instructions: indications,
        participants: participants,
      }))
    }
  }


  return (
    <>
      <View key={0} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:create_workout_indications')}</Headline>
        <View style={{width:'100%'}}>
          <Input
            label={t('common:create_workout_indications_input_participants')}
            value={participants}
            error={error}
            keyboardType='number-pad'
            onChangeText={(text) => setParticipants(text)}
            style={{backgroundColor:'#FFF', width: '100%'}}
            underlineColor='#9B9B9B'
          />
          <InputTags
            error={error}
            label={t('common:create_workout_indications_input_participants_should')}
            style={{backgroundColor:'#FFF', width: '100%'}}
            underlineColor={error ? '#FF0000':'#9B9B9B'}
            values={indications}
            setValues={setIndications}
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

export default WorkoutIndications