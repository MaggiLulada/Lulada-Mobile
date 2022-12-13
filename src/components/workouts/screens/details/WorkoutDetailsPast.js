import React, { useEffect, useState } from 'react'
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
import ModalBottomSheet from '../../../modals/ModalBottomSheet';
import Rating from '../../../others/Rating';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';

const WorkoutDetailsPast = ({route}) => {

  const imageFullUsers = require('../../../../assets/images/background/background_details_2.png')
  const user = useSelector(getUser)
  const navigation = useNavigation()
  const {width, height} = Dimensions.get('screen')
  const {data} = route.params
  const {colors} = useTheme()

  const [usersReview, setUsersReview] = useState([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [sizeModal, setSizeModal] = useState('medium')
  const [visible, setVisible] = useState(false)
  const [typeDetails, setTypeDetails] = useState('')

  useEffect(() => {
    getUsersWhoRated()
  }, [])
  

  const getUsersWhoRated = async() => {
    try {
      setLoading(true)
      firestore().collection('Rating')
      .where('workout_schedule', '==', data.workout_id)
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
        console.log(data)
        setUsersReview(data)
        setLoading(false)
      })
    } catch (err) {
      console.log(err)
      //Alert.alert(t('error'), err.message)
    }
  }

  
  return (
    <View style={{flex:1, backgroundColor:'#FFFFFF', paddingTop:'20%', top:0}}>
      <FlatList 
        style={{marginLeft:'3%'}}
        data={usersReview}
        ListEmptyComponent={() => (
          <View style={{flex:1, flexDirection:'column', alignItems:'center', marginTop:'60%', margin:"5%"}}>
            <Text style={{fontSize:20, color: '#B2B2B2', fontFamily:'Montserrat-Bold', textAlign:'center' }}>{t('common:workout_past_empty_review')}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={{margin:"3%"}}>
              <List.Item
                title={<Headline style={{fontSize:20}}>{item.user.name}</Headline>}
                description={<StarRatingDisplay rating={item.rate} starSize={25}/>}
                left={props => (
                  <FastImage 
                    {...props} 
                    style={{ width: 70, height:70, borderRadius:100, marginRight:'5%'}}
                    source={{
                      uri:item.user.picture,
                      priority:FastImage.priority.high
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                )}
              />
              <Subheading style={{margin:"3%"}}>{item.experience}</Subheading>
            </View>
          )
        }}
      />
      
      <ImageBackground
        source={imageFullUsers} 
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
        <Title style={{fontWeight:'600', color:'#FFF', fontSize:21, marginTop:'4%'}}>{`${dateRelative(`${data.date} ${data.start_time}:00`)}, ${data.start_time}`}</Title>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center',  width:'90%'}}>
          <IconButton icon="map-marker" size={25} color="#FFF" />
          <Subheading style={{color:'#FFF', fontSize:16, fontWeight:'500', textAlign:'center',  textDecorationLine:'underline'}}>{data.location.address}</Subheading>
        </View>
        {user.id != data.user.id ? (
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', height:'60%', justifyContent:'space-around' }}>
            <Subheading style={{color:'#FFF', fontSize:16, fontWeight:'500', textDecorationLine:'underline' }}>{t('common:receipt')}</Subheading>
          </View>
        ):(
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', height:'60%', justifyContent:'space-around' }}>
            <Subheading style={{color:'#FFF', fontSize:16, fontWeight:'500', textDecorationLine:'underline'}} onPress={() => setModalVisible(!modalVisible)}>{t('common:rate')}</Subheading>
            <Subheading style={{color:'#FFF', fontSize:16, fontWeight:'500', textDecorationLine:'underline' }}>{t('common:receipt')}</Subheading>
            <Subheading style={{color:'#FFF', fontSize:16, fontWeight:'500', textDecorationLine:'underline' }}>{t('common:report')}</Subheading>
          </View>
        )}
      </ImageBackground>
      <ModalBottomSheet
        visible={modalVisible}
        backgroundModal='#ffffff'
        size='large'
        backDrop={true}
        onClose={() => setModalVisible(false)}
      >
        <Rating
          title={`${t('common:workout_past_rating_title')} ${data.name}?`}
          image={data.pictures[0]}
          experience={true}
          experienceTitle={t('common:workout_past_rating_write_experience')}
          notExperienceTitle={t('common:workout_past_rating_not_write_experience')}
          extraData={data}
          onClose={() => setModalVisible(false)}
        />
      </ModalBottomSheet>
    </View>
  )
}

export default WorkoutDetailsPast