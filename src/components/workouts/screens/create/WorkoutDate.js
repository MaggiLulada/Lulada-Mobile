import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { currentWorkout, updateCurrentWorkout } from '../../../../redux/Workouts/WorkoutsSlice';
import { Headline, List, IconButton, Caption, Title, Subheading, useTheme } from 'react-native-paper'
import { styles } from '../../../../assets/styles/globalStyles';
import i18next from 'i18next'
import InputDate from '../../../inputs/InputDate';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import dayjs from 'dayjs';
import CustomEvents from '../../../calendar/events/CustomEvents';
//import { ScrollView } from 'react-native-gesture-handler';
import ModalBottomSheet from '../../../modals/ModalBottomSheet';
import { dateLL } from '../../../../utils/date';


const WorkoutDate = () => {

  const {colors} = useTheme()
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const locale = i18next.language.split('-')[0]
  const current = useSelector(currentWorkout)

  const [modalVisible, setModalVisible] = useState(false);

  const [fullDate, setFullDate] = useState({
    date: current.date_workout != '' ? current.date_workout : '',
    dateFormat: current.date_workout_format != '' ? current.date_workout_format : '',
    startTime: current.start_time != '' ? current.start_time : '',
    endTime: current.end_time != '' ? current.end_time : '',
  })
  const [workouts, setWorkouts] = useState(current.workouts != '' ? current.workouts : []);
  const [newScheduleToDate, setNewScheduleToDate] = useState({
    date: '',
    week: [],
    workout: [],
    schedules: [],
  })
  const [newScheduleFromDate, setNewScheduleFromDate] = useState('')
  const [error, setError] = useState(false)

  const nextPage = () => {
    if(workouts == ''){
      setError(true)
    } else {
      dispatch(updateCurrentWorkout({
        currentPage: 5,
        date_workout: fullDate.date,
        date_workout_format: fullDate.dateFormat,
        start_time: fullDate.startTime,
        end_time: fullDate.endTime,
        workouts: workouts,
      }))
    }
  }

  // Delete whole day with schedules included
  const deleteWorkout = (week, workout) => {
    const newWorkouts = [...workouts]
    const replace = newWorkouts[week].workouts
    replace.splice(workout, 1)
    setWorkouts(newWorkouts)
  }


  const newSchedule = (week, workout, i) => {
    setNewScheduleToDate({})
    setNewScheduleToDate({
      date: workout.date,
      week: week,
      workout: i,
      schedules: workout.schedules
    })
    //console.log('dateeeeeeeeeeeeeeeeeee', newScheduleToDate)
    setModalVisible(!modalVisible)
  }

  //Add a new schedule within the chosen day
  const addNewSchedule = (schedule) => {
    //console.log('schedule', schedule)
    let schedules = [...newScheduleToDate.schedules]
    schedules.push({
      startTime: '',
      endTime: '',
    })
    setNewScheduleToDate({
      ...newScheduleToDate,
      schedules: schedules
    })
  }

  // Save a new schedule within the chosen day
  const saveNewSchedule = () => {
    if (newScheduleToDate.date != '' && newScheduleToDate.schedules.length > 0) {
      //console.log('newScheduleToDate', newScheduleToDate)
      const newWorkouts = [...workouts]
      newWorkouts[newScheduleToDate.week].workouts[newScheduleToDate.workout].schedules = newScheduleToDate.schedules
      console.log(newWorkouts)
      setWorkouts(newWorkouts)
      setModalVisible(!modalVisible)
    }
  }

  // Delete schedule of a workout day
  const deleteSchedule = (schedule, i) => {
    //console.log('schedule', schedule)
    //console.log('i', i)
    const newSchedules = [...newScheduleToDate.schedules]
    newSchedules.splice(i, 1)
    setNewScheduleToDate({
      ...newScheduleToDate,
      schedules: newSchedules
    })
  }

  return (
    <>
      <View key={current.currentPage} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:create_workout_date')}</Headline>
        {error === false ? (
          <Caption style={{ marginTop:'-5%', marginBottom:'5%'}}>{t('common:create_workout_date_description')}</Caption>
        ):(
          <Caption style={{ marginTop:'-5%', marginBottom:'5%', color:'#FF0000'}}>{t('common:create_workout_date_description')}</Caption>
        )}
        <View style={{width:'100%'}}> 
          {workouts != '' ? (
            <ScrollView>
              {workouts.map((week, index) => (
                week != '' && (
                  <List.Accordion
                    style={{backgroundColor:'#fff'}}
                    key={index}
                    title={`${t('common:create_workout_date_repeat_day')} ${week.dayWeek}`}
                  >
                    {week.workouts.map((workout, i) => (
                      <List.Item
                        key={i}
                        title={workout.date}
                        description={workout.schedules.map((schedule, index) => (
                          <View key={index} style={{flexDirection:'column', alignItems:'center'}}>
                            <Subheading style={{fontSize:12, marginRight:15, flexDirection:'row'}}>{schedule.startTime} {t('common:to')} {schedule.endTime}</Subheading>
                          </View>
                        ))}
                        
                        onPress={() => newSchedule(index, workout, i)}
                        right={props => (
                          <IconButton
                            {...props}
                            icon="trash-can-outline"
                            onPress={() => deleteWorkout(index, i)}
                          />
                        )}
                        
                      />
                    ))}
                  </List.Accordion>
                )
              ))}
            </ScrollView>
          ):(
            <>
              <InputDate
                mode='complete'
                style={{backgroundColor:'#FFF', width: '100%'}}
                label={t('common:create_workout_date_input')}
                underlineColor='#9B9B9B'
                onPress={() => console.log('Pressed!')}
                value={setFullDate}
              /> 
              {fullDate.date != "" && (
                <CustomEvents
                  dayWeek={dayjs(fullDate.date).locale(locale).format('dd')}
                  dateSelected={fullDate}
                  finalWorkouts={setWorkouts}
                />
              )}
            </>
          )}
        </View>
      </View>

      <View style={{width:'80%', margin:'8%'}}>
        <ButtonPrimary
          title={t('common:next')}
          onPress={nextPage}
        />
      </View>
      <ModalBottomSheet
        visible={modalVisible}
        size='large'
        backgroundModal='#f5f5f5'
        onClose={saveNewSchedule}
      >
        <View style={{flex:1, margin:'5%', alignItems:'center', justifyContent:'space-between'}}>
          <Title 
            style={{fontWeight: Platform.OS === 'ios' ? 'bold' : '100', textAlign:'center', fontFamily:'Montserrat-Bold', fontSize:22}}
          >
            {`${dateLL(newScheduleToDate.date)}`}
          </Title>

          <View style={{ width:'100%', height:'50%', alignSelf:'center', marginTop: Platform.OS === 'ios' ? '-20%' :'-10%'}}>
            {newScheduleToDate != '' && ( 
              newScheduleToDate.schedules.map((schedule, index) => (
                <View key={index} style={{flexDirection:'row', width:'80%', marginBottom:Platform.OS == 'ios' ? '-9%': '3%'}}>
                  <InputDate
                    mode='schedule'
                    unsupportedValues={[fullDate.startTime, fullDate.endTime]}
                    labelError={t('common:create_workout_time_input_error')}
                    style={{backgroundColor:'#f5f5f5', width: '98%'}}
                    label={t('common:create_workout_date_input')}
                    underlineColor='#9B9B9B'
                    value={(date) => {
                      if(date.startTime != '' && date.endTime != ''){
                        const newSchedules = [...newScheduleToDate.schedules]
                        const dateFinal = {
                          startTime: date.startTime,
                          endTime: date.endTime
                        }
                        newSchedules[index] = dateFinal
                        setNewScheduleToDate({
                          ...newScheduleToDate,
                          schedules: newSchedules
                        })
                        console.log(newScheduleToDate)
                      }    
                    }}
                    initialValues={{
                      startTime: schedule.startTime,
                      endTime: schedule.endTime,
                    }}
                  />
                  <IconButton
                    icon="trash-can-outline"
                    color={colors.secondary}
                    style={{marginTop:'5%'}}
                    onPress={() => deleteSchedule(schedule, index)}
                  />
                </View>
              )
            ))}
          </View>

          <IconButton
            icon="plus-circle-outline"
            rippleColor='transparent'
            onPress={() => addNewSchedule(newScheduleToDate)}
            size={50}
            color={colors.secondary}
          />
        </View>
      </ModalBottomSheet>
    </>
  )
}

export default WorkoutDate