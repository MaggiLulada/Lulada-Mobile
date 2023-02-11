import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-native-calendars';
import { Subheading, useTheme } from 'react-native-paper';


const CalendarViewWorkouts = ({
    data, 
    onSelectDayMatch,
    initialSchedule
}) => {

    const {colors} = useTheme()
    const [markedDays, setMarkedDays] = useState({})
    const [selectedDays, setSelectedDays] = useState(data)
    const today = dayjs().format("YYYY-MM-DD")
  

    useEffect(() => {
        console.log(data, 'dataaaa')
        console.log(initialSchedule, 'horario inicial')
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

    const pressDaySelected = (day) => {
        const dateMatch = data.filter(item => item.date == day.dateString)
        if (dateMatch.length != 0) {
            onSelectDayMatch(day.dateString)
        } else {
            console.log(dateMatch, 'No coincideeeeee')
        }
    }

    return (
        <>
           <Calendar
                minDate={dayjs().format("YYYY-MM-DD")}
                markedDates={{
                    [today]: {
                        marked:true,
                        selected:false
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
                    pressDaySelected(day)
                }}
            />
        </>
    )
}

export default CalendarViewWorkouts