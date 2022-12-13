import React from 'react'
import RegisterOnboarding from '../../components/auth/register/RegisterOnboarding'
import { Surface } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles'
import { SafeAreaView } from 'react-native'

export default function Register() {
  return (
    <Surface style={styles.containerOnboarding}>
      <RegisterOnboarding/>
    </Surface>
  )
}