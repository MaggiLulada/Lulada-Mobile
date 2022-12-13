import React, {useEffect, useState} from 'react'
import { View, Text, Alert, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import { getUser } from '../../../redux/User/UserSlice'
import dayjs from 'dayjs'
import { Caption, Headline, List, Subheading } from 'react-native-paper'
import { styles } from '../../../assets/styles/globalStyles'
import FastImage from 'react-native-fast-image'
import { dateRelative } from '../../../utils/date'

const Notifications = () => {

  const user = useSelector(getUser)
  const [notificationsUser, setNotificationsUser] = useState([])

  useEffect(() => {
    getNotifications()
  }, [])
  
  const getNotifications = async() => {
    try{
      firestore().collection('Notifications')
      .where('user', '==', user.id)
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
        setNotificationsUser(data)
      })
    }catch(err){
      Alert.alert(err.message)
    }    
  }

  return (
    <View 
      style={{
        flex:1,
        backgroundColor:'#FFFFFF', 
        padding:'4%',
      }}
    >
      <FlatList
        data={notificationsUser.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())}
        renderItem={({item, index}) => {
          return (
            <List.Item
              title={item.title}
              
              description={
                <View style={{flex:1, flexDirection:'column', }}>
                  <Subheading style={{fontSize:12}}>{item.body}</Subheading>
                  <Caption>{dateRelative(new Date(item.date.toDate()).toString())}</Caption>

                </View>
              }
              titleStyle={{color:'#000', fontSize:18}}
              descriptionStyle={{color:'#000'}}
              descriptionNumberOfLines={3}
              left={props => (
                <FastImage
                  {...props}
                  source={{
                    uri: item.extra.user.picture
                  }}
                  style={{width:60, height:60, borderRadius:50, marginRight:'2%', marginTop:'3%'}}
                />
              )}
            />
          )
        }}
      />
    </View>
  )
}

export default Notifications