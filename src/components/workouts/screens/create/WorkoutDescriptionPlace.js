import React, { useState } from 'react'
import { View } from 'react-native'
import { useTranslation } from "react-i18next";
import { Caption, Headline } from 'react-native-paper'
import { styles } from '../../../../assets/styles/globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { currentWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';
import Input from '../../../inputs/Input'
import ButtonPrimary from '../../../buttons/ButtonPrimary';



const WorkoutDescriptionPlace = () => {

  const {t} = useTranslation()
  const dispatch = useDispatch()
  const current = useSelector(currentWorkout)
  const [directions, setDirections] = useState(current.directions != '' ? current.directions : '')
  const [error, setError] = useState(false)

  const nextPage = () => {
    if(directions == '' || directions.length == 0 ){
      setError(true)
    } else {
      dispatch(updateCurrentWorkout({
        currentPage:4,
        directions: directions,
      }))
    }
  }
  return (
    <>
      <View key={current.currentPage} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:create_workout_directions')}</Headline>
        {error != false && <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:'#FF0000'}}>{t('common:create_workout_directions')}</Caption>}
        <View style={{width:'100%'}}>
          <Input
            multiline={true}
            label={t('common:create_workout_directions_input')}
            value={directions}
            onChangeText={(text) => setDirections(text)}
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

export default WorkoutDescriptionPlace