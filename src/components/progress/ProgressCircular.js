import { View } from 'react-native'
import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import ChargingIcon from '../icons/ChargingIcon'
import { Headline, Subheading, Surface, useTheme } from 'react-native-paper'
import { styles } from '../../assets/styles/globalStyles'


const ProgressCircular = ({progress, title, subtitle, action}) => {

    const {colors} = useTheme()
    return (
        <>
            <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                <View style={{width:'80%', alignItems:'center'}}>
                    <AnimatedCircularProgress
                        size={250}
                        width={15}
                        fill={progress}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={`${colors.primary}87`}
                        tintColor={colors.primary}
                    >
                    {
                        (fill) => (
                            <ChargingIcon size='340'/>
                        )
                    }
                    </AnimatedCircularProgress>
                    <Headline style={{textAlign:'center', marginTop:'5%', fontSize:30}}>{title}</Headline>
                    <Subheading style={{textAlign:'center', marginTop:'5%'}}>{subtitle}</Subheading>
                </View>
               
            </View>
            <View style={{width:'80%', marginBottom:'10%'}}>
                {action}
            </View>
        </>
    )
}

export default ProgressCircular