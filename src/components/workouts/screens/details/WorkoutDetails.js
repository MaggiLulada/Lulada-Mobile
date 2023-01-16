import React, { useEffect, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, ScrollView, Alert, FlatList, Dimensions, ImageBackground } from 'react-native'
import { Button, Chip, Divider, Headline, IconButton, List, Menu, Provider, Subheading, Surface, Title, useTheme } from 'react-native-paper'
import { dateRelative } from '../../../../utils/date'
import { t } from 'i18next'
import firestore  from '@react-native-firebase/firestore'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { getUser } from '../../../../redux/User/UserSlice'
import { useNavigation } from '@react-navigation/native'
import ModalSimple from '../../../modals/ModalSimple';
import ButtonPrimary from '../../../buttons/ButtonPrimary';
import Input from '../../../inputs/Input';
import WorkoutEmpty from './WorkoutEmpty';

const WorkoutDetails = ({route}) => {

  const user = useSelector(getUser)
  const navigation = useNavigation()
  const {width, height} = Dimensions.get('screen')
  const {data} = route.params
  const {colors} = useTheme()
  const imageEmptyUsers = require('../../../../assets/images/background/background_details.png')
  const imageFullUsers = require('../../../../assets/images/background/background_details_2.png')

  const [usersPaid, setUsersPaid] = useState([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [typeDetails, setTypeDetails] = useState('')

  useEffect(() => {
    getUsersWhoPaid()
  }, [])

  const openMenu = () => {
    Alert.alert('Open')
    setVisible(!visible)
  };

  const closeMenu = () => {
    Alert.alert('Close')
    setVisible(!visible);
  } 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

        data.user.id == user.id ? (
          <IconButton
            icon='cancel'
            color={'#4f4f4f'}
            style={{marginLeft:'-2%'}}
            onPress={() => {
              setTypeDetails('cancel_instructor') 
              setModalVisible(!modalVisible)
            }}
          />
        ):(
          <>
            <IconButton
              icon={() => (
                <Icon 
                  name="megaphone-outline" 
                  color={'#4f4f4f'} 
                  size={22} 
                  onPress={() => {
                    setTypeDetails('report') 
                    setModalVisible(!modalVisible)
                  }}
                />
                
              )}
            />
            <IconButton
              icon='cancel'
              color={'#4f4f4f'}
              style={{marginLeft:'-7%'}}
              onPress={() => {
                setTypeDetails('cancel_participant') 
                setModalVisible(!modalVisible)
              }}
            />
          </>
        )
      )
    });
  }, [navigation])

  const getUsersWhoPaid = async() => {
    setLoading(true)
    try {
      firestore().collection('Payments')
      .where('workout_schedule', '==', data.id)
      .onSnapshot(querySnapshot => {
        const data = []
        querySnapshot.forEach(doc => {
          const {
            id
          } = doc.data();
          data.push({
            id:doc.id,
            ...doc.data()
          })
        })
        setUsersPaid(data)
        setLoading(false)
      })
    } catch (err) {
      Alert.alert(t('error'), err.message)
    }
  }

  const renderContentDetails = (type) => {
    switch (type) {
      case 'cancel_instructor':
        return (
          <View style={{justifyContent:'center', padding:'5%'}}>
            <Headline style={{textAlign:'center', fontSize:20, fontFamily:'Montserrat-SemiBold'}}>{t('common:workout_details_really_cancel')}</Headline>
            <Text style={{textAlign:'center', marginTop:'4%', marginBottom:'12%'}}>{t('common:workout_details_really_cancel_desc_instructor')}</Text>
            <ButtonPrimary
              title={t('common:cancel')}
            />
          </View>
        ) 
      case 'cancel_participant':
        return (
          <View style={{justifyContent:'center', padding:'5%'}}>
            <Headline style={{textAlign:'center', fontSize:20, fontFamily:'Montserrat-SemiBold'}}>{t('common:workout_details_really_cancel')}</Headline>
            <Subheading style={{textAlign:'center', marginTop:'8%', marginBottom:'8%'}}>{t('common:workout_details_really_cancel_desc_participant')}</Subheading>
            <ButtonPrimary
              title={t('common:cancel')}
            />
          </View>
        )     
      case 'report':
          return (
            <View style={{justifyContent:'center', padding:'5%'}}>
              <Headline style={{textAlign:'center', fontSize:20, fontFamily:'Montserrat-SemiBold'}}>{t('common:workout_details_report')}</Headline>
              <Subheading style={{textAlign:'center', marginTop:'8%', marginBottom:'8%'}}>{t('common:workout_details_report_desc')}</Subheading>
              <Input
                multiline={true}
                
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={{backgroundColor:'#FFF', width: '100%'}}
                underlineColor='#9B9B9B'
              />
              <ButtonPrimary
                title={t('common:send')}
              />
            </View>
          )                
      default:
        return null
    }
  }

  
  return (
    <View style={{flex:1, backgroundColor:'#FFFFFF', paddingTop:'20%', top:0}}>
      <List.Item
        style={{margin:'3%', marginBottom:0}}
        title={
          <LinearGradient
            start={{x: 1, y: 0}} end={{x: 0, y: 0}}
            colors={['rgba(255, 186, 0, 0.2)', 'rgba(255, 186, 0, 0.2)', 'rgba(255, 186, 0, 0.1)',  'rgba(255, 186, 0, 0.1)','rgba(255, 186, 0, 0.02)', 'rgba(255, 255, 250, 0 )']}
            style={{
              flex:Platform.OS == 'android' && 1,
              flexDirection:'column',
              borderTopRightRadius:50,
              borderBottomRightRadius:50
            }}
          >
            <View 
              style={{flexDirection:'row', width:width/1.5}}
            >
              <Headline style={{fontSize:20, }}>Trainer {data.user.name}</Headline>
            
            </View>
            <View  style={{flexDirection:'row'}}>
              <Subheading style={{color:colors.primary}}>Tel: {data.user.phoneInfo.completeNumber}</Subheading>
            </View>
          </LinearGradient>
        }
      
        left={props => (
          <FastImage 
            {...props} 
            style={{ width: 60, height:60, borderRadius:100, marginRight:'4%', marginTop:'2%'}}
            source={{
              uri:data.user.picture,
              priority:FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
      />
   
      <FlatList 
        style={{marginLeft:'3%'}}
        data={usersPaid}
        ListEmptyComponent={() => <WorkoutEmpty/>}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <List.Item
              key={index}
              title={<Headline style={{fontSize:20}}>{item.payer_info.name}</Headline>}
              left={props => (
                <FastImage 
                  {...props} 
                  style={{ width: 60, height:60, borderRadius:100, marginRight:'5%'}}
                  source={{
                    uri:item.payer_info.picture,
                    priority:FastImage.priority.high
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
            />
          )
        }}
      />
      
      <ImageBackground 
        source={usersPaid.length < 2 ? imageFullUsers : imageEmptyUsers} 
        resizeMethod='resize'
        resizeMode='stretch'
        style={{
          width:'100%', 
          height:height/4.6, 
          backgroundColor:colors.primary, 
          borderTopRightRadius:40,
          borderTopLeftRadius:40,
          alignItems:'center',
          justifyContent:'space-between',
        }}
      >
        <Title style={{fontWeight:'600', color:'#FFF', textAlign: 'center', fontSize:20, marginTop:'4%'}}>{`${dateRelative(`${data.date} ${data.start_time}:00`)}, ${data.start_time}`}</Title>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',  width:'93%'}}>
          <IconButton icon="map-marker" size={22} color="#FFF" />
          <Text style={{color:'#FFF', fontSize:16, margin: '5%', fontWeight:'370', textAlign:'center'}}>{data.location.address}</Text>
        </View>
        <View style={{alignItems:'center', width:'100%', height:'30%', marginBottom:'8%' }}>
          <Title style={{color:'#FFF', fontSize:16}}>{t('common:workout_details_bring')}</Title>
          <View>
            {data.instructions.map((tag, index) => (
              <View key={index} style={{ margin: 2}}>
                <Chip
                  key={index}
                    mode='flat'
                    //style={{ backgroundColor:colors.primary+'60' }}
                >
                    {tag}
                </Chip>
                {renderContentDetails(typeDetails)}
              </View>
            ))}
          
          </View>
        </View>
        <ModalSimple
          visible={modalVisible}
          size='large'
          close={() => setModalVisible(!modalVisible)}
        >
          {renderContentDetails(typeDetails)}
        </ModalSimple>
      </ImageBackground>
    </View>
  )
}

export default WorkoutDetails