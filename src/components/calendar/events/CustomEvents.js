import React, {useEffect, useState} from 'react'
import ModalSimple from '../../modals/ModalSimple'
import NumericInput from 'react-native-numeric-input'
import dayjs from 'dayjs'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme, List, Title, TextInput, Text } from 'react-native-paper'
import { styles } from '../../../assets/styles/globalStyles'
import WeekDaysMin from '../WeekDaysMin'
import ButtonPrimary from '../../buttons/ButtonPrimary'
import ButtonSecondary from '../../buttons/ButtonSecondary'

const CustomEvents = ({dayWeek, dateSelected, finalWorkouts, onClose}) => {

    require('dayjs/locale/de')
    const localeData = require('dayjs/plugin/localeData')
    dayjs.extend(localeData)


    const {t, i18n } = useTranslation()
    const {colors} = useTheme()
   

    const [time, setTime] = useState(1)
    const [viewOptions, setViewOptions] = useState(false)
    const [week, setWeek] = useState([])
    const [workouts, setWorkouts] = useState([])
    
    useEffect(() => {
        i18n.language === 'de' ? dayjs.locale('de') : dayjs.locale('en')
        updateWeek()
    }, [i18n.language])

    const groupBy = (list, key) => {
        return list.reduce((prev, curr) => {
            return {
                ...prev,
                [curr[key]]: [
                    ...(prev[key] || []),
                    curr, 
                ]
            }    
        }, {})
    }


    const updateWeek = () => {
        const daysShort = dayjs.weekdaysMin()
        const days = dayjs.weekdays()

        const array = []
        daysShort.forEach((day, index) => {
            if(dayWeek.includes(day)){
                array.push({
                    dayShort: day, 
                    checked: true,
                    day: days[index] ,
                    position: index
                })
            }
            else{
                array.push({
                    dayShort: day,
                    day: days[index],
                    checked: false,
                    position: index
                })
            }
        })
        setWeek(array)
    }

    const weeklyWorkouts = () => {

        const totalWeeks = 8
        const repeat = time
        const totalAdd = 7 * repeat
        const initialDay = dayjs(dateSelected.date).locale(i18n.language).format('dd')
        const array = []
        const workouts = []
        const organized = []
        const workoutsCalendar = []
        const organizedCalendar = []

        week.forEach(day => {
            if(day.checked && day.dayShort === initialDay){
                array.push({
                    dayShort: day.dayShort,
                    day: day.day,
                    position: day.position,
                    initialDay: true,
                    date: dateSelected.date,
                })
            } else if(day.checked && day.dayShort !== initialDay){
                if(day.position > dayjs(dateSelected.date).locale(i18n.language).day()){
                    const addDays = day.position - dayjs(dateSelected.date).locale(i18n.language).day()
                    array.push({
                        dayShort: day.dayShort,
                        day: day.day,
                        position: day.position,
                        initialDay: false,
                        date: dayjs(dateSelected.date).add(addDays, 'day').format('YYYY-MM-DD'),
                    })
                } else if(day.position < dayjs(dateSelected.date).locale(i18n.language).day() && day.position !== 0){
                    const addDays = dayjs(dateSelected.date).locale(i18n.language).day() + day.position - 1
                    array.push({
                        dayShort: day.dayShort,
                        day: day.day,
                        position: day.position,
                        initialDay: false,
                        date: dayjs(dateSelected.date).add(addDays, 'day').format('YYYY-MM-DD'),
                    })
                } else if(day.position === 0){
                    const addDays = dayjs(dateSelected.date).locale(i18n.language).day() - 1
                    array.push({
                        dayShort: day.dayShort,
                        day: day.day,
                        position: day.position,
                        initialDay: false,
                        date: dayjs(dateSelected.date).add(addDays, 'day').format('YYYY-MM-DD'),
                    })
                }
            } else if (!day.checked && day.dayShort === initialDay){

            }
        })

        //console.log(array.map(day => `${day.day} ${day.date}`))


        for(let i = 0; i < totalWeeks/repeat; i++){
            const addDays = totalAdd * i
            array.forEach(day => {
                workouts.push({
                    date: dayjs(day.date).add(addDays, 'day').format('YYYY-MM-DD'),
                    day: dayjs(day.date).locale(i18n.language).format('dddd'),
                    dayShort: dayjs(day.date).locale(i18n.language).format('dd'),
                    schedules: [{
                        startTime: dateSelected.startTime,
                        endTime: dateSelected.endTime,
                    }],
                })
                workoutsCalendar.push({
                    date: dayjs(day.date).add(addDays, 'day').format('YYYY-MM-DD')
                })
                organized.push({
                    dayWeek: dayjs(day.date).locale(i18n.language).format('dddd'),
                    workouts: []
                })
            })
        }

        console.log(workoutsCalendar)
        //const groupedForDay = groupBy(workouts, 'day')
        workouts.forEach(workout => {
            const index = organized.findIndex(day => day.dayWeek === workout.day)
            organized[index].workouts.push(workout)  
        })

        //console.log(organized.filter(data => data.workouts != ''))
        onClose()
        return finalWorkouts(workoutsCalendar)
        //return finalWorkouts(organized.filter(data => data.workouts != ''))
    }
    


    return (
        <View style={{margin:"5%"}}>
            <View style={{justifyContent:"center", alignContent:'center'}}>
                <List.Item
                    title={t('common:create_workout_date_repeat')}
                    left={props => <List.Icon {...props} icon="reload" />}
                    onPress={() => setViewOptions(!viewOptions)}
                />
            </View>
            {viewOptions == true ? (
                <View style={{width:'100%', alignItems:'center'}}>
                    <View style={{width:'100%'}}>
                        <View
                           style={{width:'100%', marginTop:'5%', marginBottom:'5%', alignItems:'center'}}
                        >
                           <Title>{t('common:create_workout_date_custom_header_title')}</Title>
                           <View style={{flexDirection:'row', width:'100%', justifyContent:'center'}}>
                               <View style={{width:'35%', alignItems:'center', alignSelf:'center', marginTop:'2%'}}>
                                   <NumericInput 
                                       type='number' 
                                       iconStyle={{color:colors.primary}}
                                       onChange={(value) => setTime(value)} 
                                       value={time}
                                       minValue={1}
                                       maxValue={8}
                                       inputStyle={{
                                           borderBottomWidth:1, 
                                           borderBottomColor:colors.primary,
                                           fontFamily:'Montserrat-Regular',
                                           fontSize:16,
                                       }}
                                       borderColor={'#fff'}
                                       totalHeight={55}
                                       totalWidth={120}
                                   />
                               </View>
                               <View style={{width:'30%'}}>
                                   <TextInput
                                       value={t('common:create_workout_date_week')}
                                       style={styles.input}
                                       editable={false}
                                   />
                               </View>
                           </View>
                        </View>
                    </View>
                    <View style={{marginTop:'5%',marginBottom:'10%'}}>
                       <WeekDaysMin
                           week={week}
                           setWeek={setWeek}
                       />
                    </View>
                    <View style={{margin:'5%',flexDirection:'row', justifyContent:'space-around', width:'100%'}}>
                       <View>
                           <ButtonSecondary
                                title={t('common:cancel')}
                                onPress={() => setModalVisible(!modalVisible)}
                                labelStyle={{
                                    color: '#707070',
                                    fontSize:18
                                }}
                           />
                        </View>
                       <View>
                           <ButtonPrimary
                                title={t('common:save')}
                                onPress={weeklyWorkouts}
                                labelStyle={{
                                    color: '#FFFFFF',
                                    fontSize:18
                                }}
                           />
                        </View>
                    </View>
                </View>
            ):(
                <></>
            )}
       
             
           
        </View>
    )
}

export default CustomEvents