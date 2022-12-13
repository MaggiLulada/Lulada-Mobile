import React, {useEffect, useState} from 'react'
import { TouchableOpacity as TouchableIos } from 'react-native-gesture-handler'
import { TouchableOpacity as TouchableAndroid, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper';

const WeekDaysMin = ({week, setWeek}) => {

    const { colors } = useTheme()

    const [selected, setSelected] = useState([])


    const selectDay = (day) => {
        const array = [...week]
        array.forEach((item, index) => {
            if(item.dayShort == day.dayShort){
                array[index].checked = !array[index].checked
            }
        })
        setSelected(array)
        setWeek(array)
        console.log(selected)
    }

    return (
        <View style={{flexDirection:'row'}}>
            {week.map((day, index) => (
                Platform.OS === 'ios' ? (
                <TouchableIos
                    onPress={() => selectDay(day)}
                    key={index}
                    style={{
                        width: 32,
                        height: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 3,
                        backgroundColor: day.checked == true ? colors.primary : '#fff',
                        borderWidth:1.3,
                        borderRadius:15,
                        borderColor:colors.primary
                    }}
                >
                    <Text>
                        {day.dayShort}
                    </Text>
                </TouchableIos>
                ) : (
                    <TouchableAndroid
                        onPress={() => selectDay(day)}
                        key={index}
                        style={{
                            width: 32,
                            height: 32,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 3,
                            backgroundColor: day.checked == true ? colors.primary : '#fff',
                            borderWidth:1.3,
                            borderRadius:15,
                            borderColor:colors.primary
                        }}
                    >
                        <Text>
                            {day.dayShort}
                        </Text>
                    </TouchableAndroid>
                )
            ))}
    
        </View>
    )
}

export default WeekDaysMin