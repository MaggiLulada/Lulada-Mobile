import React from 'react'
import { TouchableOpacity } from 'react-native'
import Svg, { Path, Text } from 'react-native-svg'

const Button = ({
  onPress, 
  label, 
  labelTwo, 
  positionLabel, 
  positionLabelTwo,
  styles,
  size
}) => {
  return (
    <TouchableOpacity onPress={onPress} 
      style={[Platform.select({
        ios: {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 5,
          shadowOpacity: 0.3,
          elevation: 9,
        },
        android: {
          elevation: 3,
        }
      }
    ), styles]}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" strokeOpacity={10}>
          <Path d="M16.9044 10.0844C0.671818 25.7196 7.36877 88.3675 7.36877 88.3675C7.36877 88.3675 68.4391 95.5194 84.6752 79.8842C100.911 64.249 95.4171 49.2032 72.3027 25.8283C49.1882 2.45335 33.137 -5.55085 16.9044 10.0844Z" fill="#FFBA00" stroke="#FFBA00" stroke-width="4" stroke-linejoin="round" />
          {labelTwo ? (
            <>
              <Text x={positionLabel.x} y={positionLabel.y} text-anchor="middle" alignmentBaseline="middle" fontFamily='Montserrat-SemiBold' fontSize='17' fontWeight="bold" letter-spacing="0.2" fill="#FFFFFF">{label}</Text>
              <Text x={positionLabelTwo.x} y={positionLabelTwo.y} text-anchor="middle" alignmentBaseline="middle" fontFamily='Montserrat-SemiBold' fontSize='17' fontWeight="bold" letter-spacing="20" fill="#FFFFFF">{labelTwo}</Text>
            </>
          ):(
            <Text x="22%" y="55%" text-anchor="middle" alignmentBaseline="middle" fontSize='22' fontWeight="bold" fontFamily='Montserrat-SemiBold' letter-spacing="0.2" fill="#FFFFFF">{label}</Text>
          )}

      </Svg>
    </TouchableOpacity>
  )
}

export default Button