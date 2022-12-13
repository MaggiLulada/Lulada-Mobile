import React from 'react'
import { Surface, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { styles } from '../../assets/styles/globalStyles'
import { totalWorkouts } from '../../redux/Workouts/WorkoutsSlice'
import CreateWorkoutOnboarding from './CreateWorkoutOnboarding'

const NewWorkout = () => {

  const allWorkouts = useSelector(totalWorkouts)

  return (
    <Surface style={styles.containerOnboarding}>
      {allWorkouts.length == 0 ? <CreateWorkoutOnboarding/> : <Text>You have already created a workout</Text>}
    </Surface>
  )
}

export default NewWorkout