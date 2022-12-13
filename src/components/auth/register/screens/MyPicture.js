import React, { useState, useCallback} from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { useTranslation } from "react-i18next";
import { Caption, Headline, IconButton, List, Text } from 'react-native-paper'
import ButtonPrimary from '../../../buttons/ButtonPrimary'
import { styles } from '../../../../assets/styles/globalStyles';
import ModalBottomSheet from '../../../modals/ModalBottomSheet';
import ListOptionsMultimedia from '../../../lists/ListOptionsMultimedia';
import { useNavigation } from '@react-navigation/native';
import { optionsList } from '../../../../utils/imagePicker';

const MyPicture = (props) => {

  const {t} = useTranslation();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);


  const pressModal = () => {
    setModalVisible(!modalVisible);
  }
  return (
    <>
      <View key={props.state.active} style={{width:'80%'}}>
        <Headline style={styles.headline}>{t('common:my_picture')}</Headline>
        <View style={{justifyContent:'center', alignItems:'center', marginTop:'5%'}}>
          <TouchableOpacity 
            style={[styles.buttonRoundLarge, {backgroundColor:'#f5f5f5'}]} 
            onPress={() => setModalVisible(!modalVisible)}
          >
            {data != '' ? (
              <Image
                style={styles.buttonRoundLarge}
                source={{uri: data[0].uri}}
              />
            ):(
              <IconButton
                style={{padding: 10}}
                icon="plus"
                size={100}
                color="#4f4f4f"
              />
            )} 
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width:'80%', margin:'8%'}}>
        <Caption style={{margin:'2%', marginBottom:'2%', textAlign:'center'}}>{t('common:my_picture_details')}</Caption>
        <ButtonPrimary
          title={t('common:next')}
          onPress={() => navigation.navigate('Ready', {
            phoneInfo:{
              completeNumber: props.state.completeNumber,
              countryCode: props.state.countryCode,
              callingCode: props.state.callingCode,
              number: props.state.number,
            },
            userId: props.state.userId,
            name: props.state.name,
            lastName: props.state.lastName,
            address: props.state.address,
            birthday: props.state.birthday,
            picture: data,
          })}
        />
      </View>
      <ModalBottomSheet
        visible={modalVisible}
        size='small'
        backgroundModal='#f5f5f5'
        onClose={() => console.log('close')}
      >
        <View style={{margin:'2%'}}>
          <ListOptionsMultimedia
            data={data}
            setData={setData}
            close={pressModal}
            t={t}
            limit={1}
          />
        </View>
      </ModalBottomSheet>
    </>
  )
}

export default MyPicture