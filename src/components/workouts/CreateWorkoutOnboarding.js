import React from 'react'
import { Surface } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from '../../assets/styles/globalStyles'
import { currentWorkout, disabledDots} from '../../redux/Workouts/WorkoutsSlice'
import Onboarding from '../onboarding/Onboarding'
import WorkoutDescriptionPlace from './screens/create/WorkoutDescriptionPlace'
import WorkoutDescription from './screens/create/WorkoutDescription'
import WorkoutDate from './screens/create/WorkoutDate'
import WorkoutLocation from './screens/create/WorkoutLocation'
import WorkoutName from './screens/create/WorkoutName'
import WorkoutPictures from './screens/create/WorkoutPictures'
import WorkoutPrice from './screens/create/WorkoutPrice'
import WorkoutIndications from './screens/create/WorkoutIndications'
import WorkoutSpeakLanguage from './screens/create/WorkoutSpeakLanguage'

const CreateWorkoutOnboarding = () => {

    const current = useSelector(currentWorkout)
    const dotsState = useSelector(disabledDots)

    const pages = [
        <WorkoutName/>,
        <WorkoutPictures/>,
        <WorkoutLocation/>,
        <WorkoutDescriptionPlace/>,
        <WorkoutDate/>,
        <WorkoutIndications/>,
        <WorkoutDescription/>,
        <WorkoutSpeakLanguage/>,
        <WorkoutPrice/>,
    ]

    return (
        <Surface style={styles.containerOnboarding}>
            <Onboarding
                length={pages.length}
                active={current.currentPage}
                pages={pages}
                typeOnboarding='workout'
                disabledDots={dotsState}
            />
        </Surface>
    )
}

export default CreateWorkoutOnboarding