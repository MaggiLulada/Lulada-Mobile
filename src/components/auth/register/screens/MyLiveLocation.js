import React, { useState, useCallback} from 'react'
import { View, TouchableHighlight } from 'react-native'
import { useTranslation } from "react-i18next";
import { Caption, Headline, IconButton } from 'react-native-paper'
import ButtonPrimary from '../../../buttons/ButtonPrimary'
import { styles } from '../../../../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { checkPermissions } from '../../../../utils/checkPermissions';

const MyLiveLocation = (props) => {

  const {t, i18n} = useTranslation();
  const navigation = useNavigation();


  return (
    <>
      <View key={props.state.active} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:my_live_location')}</Headline>
        <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center', marginTop:'5%'}}>
          <TouchableHighlight style={[styles.buttonRoundLarge, {backgroundColor:'#f5f5f5'}]}>
            <IconButton
              style={{padding: 10}}
              icon="map-marker-radius"
              size={120}
              color="#4f4f4f"
            />
          </TouchableHighlight>
        </View>
      </View>
      <View style={{width:'80%', margin:'8%'}}>
        <Caption style={{margin:'2%', marginBottom:'2%', textAlign:'center'}}>{t('common:my_live_location_details')}</Caption>
        <ButtonPrimary
          title={t('common:my_live_location_button')}
          onPress={() => navigation.push('Ready')}
        />
      </View>
    </>
  )
}

export default MyLiveLocation