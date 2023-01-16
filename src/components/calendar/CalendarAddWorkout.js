import dayjs from 'dayjs';
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'react-native-paper';


const CalendarAddWorkout = ({onChange}) => {

    const {colors} = useTheme()
    const [selectedDate, setSelectedDate] = useState("")
    const today = dayjs().format("YYYY-MM-DD")

    const onChangeDate = (date) => {
        console.log(date, 'dateeeee')
        setSelectedDate(date.dateString)
        onChange(date.dateString)
    }

    return (
        <>
           <Calendar
                minDate={dayjs().format("YYYY-MM-DD")}
                markedDates={{
                    [today]: {
                        marked:true
                    },
                    [selectedDate]: {
                      selected: true,
                      selectedColor: colors.primary,
                    },
                }}
                theme={{
                    selectedDayBackgroundColor: colors.primary,
                    textDayFontFamily:'Montserrat-Regular',
                    textMonthFontFamily:'Montserrat-Bold',
                    textDayHeaderFontFamily:'Montserrat-Medium'
                }}
                onDayPress={day => {
                    onChangeDate(day)
                }}
            />
         
        </>
    )
}

export default CalendarAddWorkout