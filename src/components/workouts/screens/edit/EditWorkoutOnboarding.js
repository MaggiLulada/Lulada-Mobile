import React, { useEffect } from 'react'
import { Surface } from 'react-native-paper'
import { styles } from '../../../../assets/styles/globalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { editWorkout } from '../../../../redux/Workouts/WorkoutsSlice'
import Onboarding from '../../../onboarding/Onboarding'
import WorkoutEditPictures from './WorkoutEditPictures'
import WorkoutEditLocation from './WorkoutEditLocation'
import WorkoutEditDescriptionPlace from './WorkoutEditDescriptionPlace'
import WorkoutEditSchedule from './WorkoutEditSchedule'
import WorkoutEditIndications from './WorkoutEditIndications'
import WorkoutEditSpeakLanguage from './WorkoutEditSpeakLanguage'
import WorkoutEditDescription from './WorkoutEditDescription'
import WorkoutEditPrice from './WorkoutEditPrice'

const EditWorkoutOnboarding = ({route}) => {

    const data = route.params.data
    const dispatch = useDispatch()

    
    const current = useSelector(editWorkout)
    const dotsState = true

    const pages = [
        <WorkoutEditPictures/>,
        <WorkoutEditLocation/>,
        <WorkoutEditDescriptionPlace/>,
        <WorkoutEditSchedule/>,
        <WorkoutEditIndications/>,
        <WorkoutEditDescription/>,
        <WorkoutEditSpeakLanguage/>,
        <WorkoutEditPrice/>
    ]


    return (
        <Surface style={styles.containerOnboarding}>
            <Onboarding
                length={pages.length}
                active={current.currentPage}
                pages={pages}
                typeOnboarding='edit'
                disabledDots={dotsState}
            />
        </Surface>
    )
}

export default EditWorkoutOnboarding