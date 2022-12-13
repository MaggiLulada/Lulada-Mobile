import { View, Text } from 'react-native'
import React from 'react'
import { currentWorkout } from '../../redux/Workouts/WorkoutsSlice'
import { useSelector } from 'react-redux'
import { Surface } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { useTranslation } from 'react-i18next'

const ReadyWorkout = () => {
  const { t } = useTranslation()
  const current = useSelector(currentWorkout)
  return (
    <Surface style={styles.container}>
      <View>
        <Text style={styles.headline}>Ilustration</Text>
      </View>
      <View style={{width:'80%'}}>
        <ButtonPrimary
          title={t('common:details')}
        />
      </View>
    </Surface>
  )
}

export default ReadyWorkout