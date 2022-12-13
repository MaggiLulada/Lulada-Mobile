import React, { useEffect, useState } from 'react'
import { View, Dimensions, Platform } from 'react-native'
import { useTranslation } from "react-i18next";
import { styles } from '../../../../assets/styles/globalStyles'
import { Caption, Headline } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { editCurrentWorkout, editWorkout } from '../../../../redux/Workouts/WorkoutsSlice';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import InputTags from '../../../inputs/InputTags';
import { isoLangs } from '../../../../constansts/isoLangs';

const WorkoutEditSpeakLanguage = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const current = useSelector(editWorkout)

    const [mainLanguage, setMainLanguage] = useState(current.main_language != '' ? current.main_language : [])
    const [secondaryLanguage, setSecondaryLanguage] = useState(current.secondary_language != '' ? current.secondary_language : [])
    const [error, setError] = useState(false)


    const nextPage = () => {
        if(mainLanguage.length < 0){
            setError(true)
        } else {
            dispatch(editCurrentWorkout({
                currentPage: 7,
                main_language: mainLanguage,
                secondary_language: secondaryLanguage
            }))
        }
    }

    return (
        <>  
        <View key={current.currentPage} style={{width:'80%'}}>
            <Headline style={styles.headline}>{t('common:create_workout_speak_language')}</Headline>
            <View style={{width:'100%'}}>
            <InputTags
                label={t('common:create_workout_speak_language_input_main')}
                values={mainLanguage}
                setValues={setMainLanguage}
                style={{backgroundColor:'#FFF', width: '100%'}}
                underlineColor='#9B9B9B'
                error={error}
            />
            <InputTags
                label={t('common:create_workout_speak_language_input_secondary')}
                values={secondaryLanguage}
                setValues={setSecondaryLanguage}
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

export default WorkoutEditSpeakLanguage