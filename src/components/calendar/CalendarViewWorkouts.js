import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { Subheading, useTheme } from 'react-native-paper';


const CalendarViewWorkouts = ({data}) => {

    const {colors} = useTheme()
    const [markedDays, setMarkedDays] = useState({})
    const today = dayjs().format("YYYY-MM-DD")
  

    useEffect(() => {
        renderMarkedDates()
    }, [])
    

    const onChangeDate = (date) => {
        console.log(date, 'dateeeee')
        setSelectedDate(date.dateString)
        onChange(date.dateString)
    }

    const renderMarkedDates = () => {
        let marked = {}

        data.map((item) => {
            marked[item.date] = {
                selected: true,
                selectedColor: colors.primary,
            };
        });

        setMarkedDays(marked)
    }

    return (
        <>
           <Calendar
                minDate={dayjs().format("YYYY-MM-DD")}
                markedDates={{
                    [today]: {
                        marked:true
                    },
                    ...markedDays
                }}
                theme={{
                    selectedDayBackgroundColor: colors.primary,
                    textDayFontFamily:'Montserrat-Regular',
                    textMonthFontFamily:'Montserrat-Bold',
                    textDayHeaderFontFamily:'Montserrat-Medium'
                }}
                onDayPress={day => {
                    console.log(day)
                }}
            />
        </>
    )
}

export default CalendarViewWorkouts