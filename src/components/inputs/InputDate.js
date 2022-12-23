import React, { useCallback, useState } from 'react'
import { TouchableOpacity as TouchableIos } from 'react-native-gesture-handler'
import { TouchableOpacity as TouchableAndroid, View } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import { useTranslation } from 'react-i18next'
import * as RNLocalize from "react-native-localize";
import i18next from 'i18next'
import dayjs from 'dayjs'


const InputDate = ({
    label,
    onChangeText,
    style,
    underlineColor,
    mode,
    value,
    unsupportedValues,
    labelError,
    initialValues
}) => {

    require('dayjs/locale/de')
    const localizedFormart = require('dayjs/plugin/localizedFormat')
    const weekday = require('dayjs/plugin/weekday')
    dayjs.extend(localizedFormart, weekday)

    const {t} = useTranslation()
    const [date, setDate] = useState('')
    const [dateFormat, setDateFormat] = useState('')
    const [startTime, setStartTime] = useState(initialValues != undefined ? initialValues.startTime : '')
    const [endTime, setEndTime] = useState(initialValues != undefined ? initialValues.endTime : '')
    const [openFullDate, setOpenFullDate] = useState(false)

    const [openTimeStart, setOpenTimeStart] = useState(false)
    const [openTimeEnd, setOpenTimeEnd] = useState(false)

    const today = new Date()
    const twoMonthAfter = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())
    const is24Hour = RNLocalize.uses24HourClock()
    const locale = i18next.language.split('-')[0]

    const [error, setError] = useState(false)

    // =================================== Start Fulldate ===========================================>
    const onConfirmFullDate = useCallback(
        ({date}) => {
            var fulldate = dayjs(date).locale(locale).format('LL')
            setOpenFullDate(!openFullDate);
            setDateFormat(fulldate);
            setDate(dayjs(date).format('YYYY-MM-DD'))
            value({dateFormat: fulldate, date: dayjs(date).format('YYYY-MM-DD'), startTime: startTime, endTime: endTime})
            setOpenTimeStart(true);
        }
    );

    const onDismissFullDate = useCallback(() => {
        setOpenFullDate(false);
    });

    const onConfirmTimeStart = useCallback(
        ({ hours, minutes }) => {
            minutes == 0 ? minutes='00':minutes;
            setOpenTimeStart(false);
            setStartTime(`${hours}:${minutes}`)
            value({dateFormat: dateFormat, date:date, startTime: `${hours}:${minutes}`, endTime: endTime})
            setOpenTimeEnd(true);
        },
    );

    const onDismissTimeStart = useCallback(() => {
        setOpenTimeStart(false)
    })

    const onConfirmTimeEnd = useCallback(
        ({ hours, minutes }) => {
            minutes == 0 ? minutes='00':minutes;
            setOpenTimeEnd(false);
            setEndTime(`${hours}:${minutes}`)
            value({dateFormat: dateFormat, date:date, startTime: startTime, endTime: `${hours}:${minutes}`})
        },
    );

    const onDismissTimeEnd = useCallback(() => {
        setOpenTimeEnd(false)
    })

    // =========================================== End Full Date ==============================>

    // =============================== Start Mode Schedule ======================================>

    const onConfirmTimeStartSchedule = useCallback(
        ({ hours, minutes }) => {
            setError(false)
            minutes == 0 ? minutes='00':minutes;
            if(unsupportedValues.includes(`${hours}:${minutes}`)){
                setError(true)
                setOpenTimeStart(false);
            } else {
                setError(false)
                setOpenTimeStart(false);
                setStartTime(`${hours}:${minutes}`)
                value({startTime: `${hours}:${minutes}`, endTime: endTime})
            }
        }
    )

    const onDismissTimeStartSchedule = useCallback(() => {
        setOpenTimeStart(false)
    })
    

    const onConfirmTimeEndSchedule = useCallback(
        ({ hours, minutes }) => {
            setError(false)
            minutes == 0 ? minutes='00':minutes;
            if(unsupportedValues.includes(`${hours}:${minutes}`)){
                setError(true)
                setOpenTimeStart(false);
            } else {
                setError(false)
                setOpenTimeEnd(false);
                setEndTime(`${hours}:${minutes}`)
                value({startTime: startTime, endTime: `${hours}:${minutes}`})
            }
        }
    )

    const onDismissTimeEndSchedule = useCallback(() => {
        setOpenTimeEnd(false)
    })


    const onPressDate = () => {
        switch (mode) {
            case 'complete':
                setDate('')
                setDateFormat('')
                setOpenFullDate(true);
                break;
            case 'schedule':
                setOpenTimeStart(true);
                break;

        }
    }

    return (
        <View>
            {Platform.OS === 'ios' && mode === 'complete' && (
                <TouchableIos onPress={onPressDate}>
                    <TextInput
                        label={label}
                        value={dateFormat}
                        style={style}
                        underlineColor={underlineColor}
                        autoCapitalize='none'
                        editable={false}
                    />
                </TouchableIos>
            )} 
            {Platform.OS === 'android' && mode === 'complete' && (
                <TouchableAndroid onPress={onPressDate}>
                    <TextInput
                        label={label}
                        style={style}
                        underlineColor={underlineColor}
                        autoCapitalize='none'
                        editable={false}
                        value={dateFormat}
                    />
                </TouchableAndroid>
            )}
                

            {Platform.OS === 'ios' && date != '' && mode === 'complete' && (
                <View style={{ flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                    <View style={{width:'45%'}}>
                        <TouchableIos onPress={() => setOpenTimeStart(!openTimeStart)} style={{width:'100%'}} >
                            <TextInput
                                label={t('common:create_workout_time_input_start')}
                                onChangeText={onChangeText}
                                style={style}
                                underlineColor={underlineColor}
                                autoCapitalize='none'
                                editable={false}
                                value={startTime}
                            />
                        </TouchableIos>
                    </View>
                    <View style={{width:'45%'}}>
                        <TouchableIos onPress={() => setOpenTimeEnd(!openTimeEnd)} style={{width:'100%'}} >
                            <TextInput
                                label={t('common:create_workout_time_input_end')}
                                onChangeText={onChangeText}
                                style={style}
                                underlineColor={underlineColor}
                                autoCapitalize='none'
                                editable={false}
                                value={endTime}
                            />
                        </TouchableIos>
                    </View>
                </View>
            )}
                
            {Platform.OS === 'android' && date != '' &&  mode === 'complete' && (
                <View style={{ flexDirection:'row', justifyContent:'space-between', width:'100%'}} >
                    <TouchableAndroid onPress={() => setOpenTimeStart(!openTimeStart)} style={{width:'48%'}} >
                        <TextInput
                            label={t('common:create_workout_time_input_start')}
                            onChangeText={onChangeText}
                            style={style}
                            underlineColor={underlineColor}
                            autoCapitalize='none'
                            editable={false}
                            value={startTime}
                        />
                    </TouchableAndroid>
                    <TouchableAndroid onPress={() => setOpenTimeEnd(!openTimeEnd)} style={{width:'48%'}}>
                        <TextInput
                            label={t('common:create_workout_time_input_end')}
                            onChangeText={onChangeText}
                            style={style}
                            underlineColor={underlineColor}
                            autoCapitalize='none'
                            editable={false}
                            value={endTime}
                        />
                    </TouchableAndroid>
                </View>
            )}

            {Platform.OS === 'ios' && mode === 'schedule' && (
                <View style={{ flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                    <View style={{width:'45%'}}>
                        <TouchableIos onPress={() => setOpenTimeStart(!openTimeStart)} style={{width:'100%'}} >
                            <TextInput
                                label={t('common:create_workout_time_input_start')}
                                onChangeText={onChangeText}
                                style={style}
                                underlineColor={underlineColor}
                                autoCapitalize='none'
                                editable={false}
                                value={startTime}
                                error={error}
                            />
                            <HelperText type='error' visible={error} >
                                {labelError}
                            </HelperText>
                        </TouchableIos>
                    </View>
                    <View style={{width:'45%'}}>
                        <TouchableIos onPress={() => setOpenTimeEnd(!openTimeEnd)} style={{width:'100%'}} >
                            <TextInput
                                label={t('common:create_workout_time_input_end')}
                                onChangeText={onChangeText}
                                style={style}
                                underlineColor={underlineColor}
                                autoCapitalize='none'
                                editable={false}
                                value={endTime}
                                error={error}
                            />
                            <HelperText type='error' visible={error} >
                                {labelError}
                            </HelperText>
                        </TouchableIos>
                    </View>
                </View>
            )}

            {Platform.OS === 'android' &&  mode === 'schedule' && (
                <View style={{ flexDirection:'row', justifyContent:'space-between', width:'100%'}} >
                    <TouchableAndroid onPress={() => setOpenTimeStart(!openTimeStart)} style={{width:'48%'}} >
                        <TextInput
                            label={t('common:create_workout_time_input_start')}
                            onChangeText={onChangeText}
                            style={style}
                            underlineColor={underlineColor}
                            autoCapitalize='none'
                            editable={false}
                            value={startTime}
                        />
                    </TouchableAndroid>
                    <TouchableAndroid onPress={() => setOpenTimeEnd(!openTimeEnd)} style={{width:'48%'}}>
                        <TextInput
                            label={t('common:create_workout_time_input_end')}
                            onChangeText={onChangeText}
                            style={style}
                            underlineColor={underlineColor}
                            autoCapitalize='none'
                            editable={false}
                            value={endTime}
                        />
                    </TouchableAndroid>
                </View>
            )}
          
        
            <DatePickerModal
                locale={locale}
                mode='single'
                visible={openFullDate}
                onDismiss={onDismissFullDate}
                date={date}
                onConfirm={onConfirmFullDate}
                validRange={{
                    startDate: today,
                    endDate: twoMonthAfter
                }} 
                label={t('common:create_workout_date_input')}
                animationType="slide" 
            />
            <TimePickerModal
                visible={openTimeStart}
                onDismiss={mode === 'complete' ? onDismissTimeStart : onDismissTimeStartSchedule}
                onConfirm={mode === 'complete' ? onConfirmTimeStart : onConfirmTimeStartSchedule}
                label={t('common:create_workout_time_input_start')}
                is24Hour={is24Hour} // default: false
                animationType="fade" // optional, default is 'none'
                locale={locale} // optional, default is automically detected by your system
            />
            <TimePickerModal
                visible={openTimeEnd}
                onDismiss={mode === 'complete' ? onDismissTimeEnd : onDismissTimeEndSchedule}
                onConfirm={mode === 'complete' ? onConfirmTimeEnd : onConfirmTimeEndSchedule}
                label={t('common:create_workout_time_input_end')}
                is24Hour={is24Hour} // default: false
                animationType="fade" // optional, default is 'none'
                locale={locale} // optional, default is automically detected by your system
            />
        </View>
    )
}

export default InputDate