import React, { useState } from 'react'
import { View } from 'react-native'
import { Caption, Headline, Subheading, Text, useTheme } from 'react-native-paper'
import { styles } from '../../../../assets/styles/globalStyles'
import { useTranslation } from "react-i18next";
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import InputAddress from '../../../inputs/InputAddress';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentWorkout, editWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';
import InputDate from '../../../inputs/InputDate';

const WorkoutEditSchedule = () => {

    const {t, i18n} = useTranslation()
    const {colors} = useTheme()
    const dispatch = useDispatch()
    const current = useSelector(editWorkout)
  
    const [fullSchedule, setFullSchedule] = useState({
        startTime:current.start_time,
        endTime:current.end_time
    })
    const [error, setError] = useState(false)
  
    const nextPage = () => {
      if(fullSchedule.startTime == '' || fullSchedule.endTime == ''){
        setError(true)
      } else {
        dispatch(editCurrentWorkout({
          currentPage: 4,
          start_time:fullSchedule.startTime,
          end_time:fullSchedule.endTime,
        }))
      }  
    }
    return (
        <>
            <View key={current.currentPage} style={{width:'80%'}}>
                <Headline style={styles.headline}>{t('common:edit_workout_schedule')}</Headline>
                <InputDate
                    mode="schedule"
                    style={{backgroundColor:'#FFF', width: '100%'}}
                    label={t('common:create_workout_date_input')}
                    underlineColor='#9B9B9B'
                    onPress={() => console.log('Pressed!')}
                    initialValues={{
                        startTime:current.start_time,
                        endTime:current.end_time
                    }}
                    unsupportedValues={['00:00', '00:00']}
                    value={setFullSchedule}
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

export default WorkoutEditSchedule
