import React from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/globalStyles'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';


const ButtonAddImages = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonAddImage}>
      <FontAwesomeIcons name="plus" size={50} color="#9B9B9B" />
    </TouchableOpacity>
  )
}

export default ButtonAddImages