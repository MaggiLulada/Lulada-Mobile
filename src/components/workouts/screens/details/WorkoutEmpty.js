import { View, Text } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { Headline, Subheading } from 'react-native-paper'
import { t } from 'i18next'

const WorkoutEmpty = () => {


  return (
    <View style={{flex:1, flexDirection:'column', alignItems:'center', marginTop:'3%'}}>
     <View>
        <FastImage
            source={require("../../../../assets/images/lulada_empty.png")}
            style={{ width: 180, height:180}}
        />
     </View>
     <View style={{alignItems:'center', margin:'5%', marginTop:0}}>
        <Headline style={{fontSize:22}}>{t('common:workout_details_empty_title')}</Headline>
        <Subheading style={{textAlign:'center', fontSize:15}}>{t('common:workout_details_empty_description')}</Subheading>
     </View>
    </View>
  )
}

export default WorkoutEmpty